import { IProject } from '@/interfaces/IProject';
import { IUser } from '@/interfaces/IUser';
import docker from '@/loaders/docker';
import { ContainerRepository } from '@/repositories/containerRepository';
import { ProjectRepository } from '@/repositories/projectRepository';
import path from 'path';
import { Service } from 'typedi';
import ContainerUtilService from './containerUtilService';

@Service()
export class ContainerService {
  protected containerRepositoryInstance: ContainerRepository;
  protected containerUtilInstance: ContainerUtilService;
  protected projectRepositoryInstance: ProjectRepository;
  constructor(
    containerRepository: ContainerRepository,
    containerUtil: ContainerUtilService,
    projectRepository: ProjectRepository,
  ) {
    this.containerRepositoryInstance = containerRepository;
    this.containerUtilInstance = containerUtil;
    this.projectRepositoryInstance = projectRepository;
  }

  public compile = async (
    username: IUser['username'],
    projectName: IProject['name'],
    language: IProject['language'],
  ) => {
    try {
      const command = this.containerUtilInstance.getLanguageCompile(language);
      await this.createContainer(username, projectName);
      const result = await this.executeInContainer(username, projectName, command);
      this.stopAndDeleteContainer(username, projectName);
      this.projectRepositoryInstance.updateLastUpdated(username, projectName);
      return result;
    } catch (err) {
      throw err;
    }
  };

  private createContainer = async (username: IUser['username'], projectName: IProject['name']): Promise<String> => {
    try {
      const _container = await docker.container.create({
        Image: process.env.DOCKER_IMAGE,
        WorkingDir: `/${username}/${projectName}`,
        HostConfig: {
          Binds: [
            `${path.join(__dirname, '..', '..', '..', 'projects', username, projectName)}:/${username}/${projectName}`,
          ],
        },
        Memory: 2e8,
      });
      _container.start();
      await this.containerRepositoryInstance.createContainerRecord(username, projectName, _container.data['Id']);
      return _container.data['Id'];
    } catch (err) {
      throw err;
    }
  };

  private stopAndDeleteContainer = async (
    username: IUser['username'],
    projectName: IProject['name'],
  ): Promise<String> => {
    try {
      const container = await this.containerRepositoryInstance.getContainer(username, projectName);
      await container.stop();
      await container.delete({ force: true });
      await this.containerRepositoryInstance.removeContainerRecord(username, projectName);
      return container.data['Id'];
    } catch (err) {
      throw err;
    }
  };

  private executeInContainer = async (username, projectName, command) => {
    try {
      const _container = await this.containerRepositoryInstance.getContainer(username, projectName);
      const exec = await _container.exec.create({
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['bash', '-c', `${command}`],
      });
      const stream = await exec.start({ Detach: false });
      const result = await this.promisifyStream(stream);
      return result;
    } catch (err) {
      throw err;
    }
  };

  private promisifyStream = async stream => {
    let result = '';
    return new Promise((resolve, reject) => {
      stream.on('data', data => (result += data.toString()));
      stream.on('end', () => {
        return resolve(result);
      });
      stream.on('error', err => {
        return reject(err);
      });
    });
  };
}
