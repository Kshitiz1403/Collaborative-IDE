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
      throw new Error(e);
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
      throw new Error(e);
    }
  };

  public addSlug = async (id: number | undefined, username: string, projectName: string): Promise<string> => {
    try {
      this.logger.silly('Adding slug to project');
      const slug = await this.getSlug();

      let updatedResult: string;
      if (id) {
        updatedResult = await this.projectRepositoryInstance.addSlugByProjectId(id, slug);
      } else {
        updatedResult = await this.projectRepositoryInstance.addSlugByProjectName(projectName, username, slug);
      }

      return updatedResult;
    } catch (e) {
      throw new Error(e);
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
      throw new Error(e);
    }
  };

  private getSlug = async () => {
    const checkSlugUnique = async () => {
      const slug = generateSlug(5);
      try {
        const existingSlug = await this.projectRepositoryInstance.findProjectBySlug(slug);
        if (existingSlug) return { status: 'error', slug: null, message: 'slug exists' };
        return { status: 'ok', slug: slug, message: 'slug generated' };
      } catch (e) {
        return { status: 'ok', slug: slug, message: 'slug generated' };
      }
    };

    let slugStatus = await checkSlugUnique();
    while (slugStatus.status == 'error') {
      slugStatus = await checkSlugUnique();
    }

    return slugStatus.slug;
  };
}
