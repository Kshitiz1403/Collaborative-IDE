import { IProject } from '@/interfaces/IProject';
import { IUser } from '@/interfaces/IUser';
import docker from '@/loaders/docker';
import { ContainerRepository } from '@/repositories/containerRepository';
import { ProjectRepository } from '@/repositories/projectRepository';
import path from 'path';
import { Service } from 'typedi';
import ContainerUtilService from './containerUtilService';
import config from '@/config';

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
      const prevContainer = await this.containerRepositoryInstance.getContainerRecord(username, projectName);
      if (prevContainer) throw 'Please wait for ongoing compile request to finish before you can start a new one.';
      const command = this.containerUtilInstance.getLanguageCompile(language);
      await this.createContainer(username, projectName);
      try {
        const result = await this.executeInContainer(username, projectName, command);
        return result;
      } finally {
        this.stopAndDeleteContainer(username, projectName);
        this.projectRepositoryInstance.updateLastUpdated(username, projectName);
      }
    } catch (err) {
      throw err;
    }
  };

  private createContainer = async (username: IUser['username'], projectName: IProject['name']): Promise<String> => {
    try {
      const _container = await docker.container.create({
        Image: config.dockerImage,
        WorkingDir: `/${username}/${projectName}`,
        HostConfig: {
          Binds: [
            `${path.join(__dirname, '..', '..', '..', 'projects', username, projectName)}:/${username}/${projectName}`,
          ],
          Memory: 2e8,
          CpuQuota: 100 * 1000, // 100%
        },
      });
      await this.containerRepositoryInstance.createContainerRecord(username, projectName, _container.data['Id']);
      await _container.start();
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
      await this.containerRepositoryInstance.removeContainerRecord(username, projectName);
      await container.stop();
      await container.delete({ force: true });
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
    let MAX_STRING_LENGTH = Math.pow(2, 27);
    let result = '';
    return new Promise((resolve, reject) => {
      stream.on('data', data => {
        if (result.length + data.toString().length > MAX_STRING_LENGTH) {
          return reject('Maximum output length reached');
        }
        result += data.toString();
      });
      stream.on('end', () => {
        return resolve(result);
      });
      stream.on('error', err => {
        return reject(err);
      });
    });
  };
}
