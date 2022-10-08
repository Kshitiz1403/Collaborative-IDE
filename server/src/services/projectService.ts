import { IProject, IProjectInputDTO } from '@/interfaces/IProject';
import { ProjectRepository } from '@/repositories/projectRepository';
import { inject, injectable } from 'inversify';
import { generateSlug } from 'random-word-slugs';
import { Inject } from 'typedi';
import { Logger } from 'winston';

@injectable()
export default class ProjectService {
  protected projectRepositoryInstance: ProjectRepository;
  constructor(
    @Inject('logger') private logger: Logger,
    @inject(ProjectRepository) projectRepository: ProjectRepository,
  ) {
    this.projectRepositoryInstance = projectRepository;
  }

  public createProject = async (projectInputDTO: IProjectInputDTO): Promise<IProject> => {
    try {
      this.logger.silly('Creating project db record');
      const projectRecord = await this.projectRepositoryInstance.createProject(projectInputDTO);

      const project = projectRecord;
      Reflect.deleteProperty(project, 'createdAt');
      Reflect.deleteProperty(project, 'updatedAt');
      Reflect.deleteProperty(project, 'username');

      return project;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  };

  public getAllProjectsForUser = async (username: string): Promise<IProject[]> => {
    try {
      this.logger.silly('Getting project for user');
      const projectsRecord = await this.projectRepositoryInstance.findAllProjectsForUser(username);

      const projects = [];
      projectsRecord.map(project => {
        const obj = {};
        obj['name'] = project.name;
        obj['language'] = project.language;
        obj['updatedAt'] = project.updatedAt;
        projects.push(obj);
      });

      return projects;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  };

  public addSlug = async (id: number | undefined, username: string, projectName: string): Promise<IProject> => {
    try {
      this.logger.silly('Adding slug to project');
      const slug = this.getSlug();

      let updatedResult: IProject;
      if (id) {
        updatedResult = await this.projectRepositoryInstance.addSlugByProjectId(id, slug);
      } else {
        updatedResult = await this.projectRepositoryInstance.addSlugByProjectName(projectName, username, slug);
      }

      return updatedResult;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  };

  public getProjectBySlug = async (slug: string): Promise<IProject> => {
    try {
      this.logger.silly('Getting project by slug');
      const projectRecord = await this.projectRepositoryInstance.findProjectBySlug(slug);

      const project = projectRecord;
      Reflect.deleteProperty(project, 'createdAt');
      Reflect.deleteProperty(project, 'updatedAt');

      return project;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  };

  private getSlug = () => {
    return generateSlug(5);
  };
}
