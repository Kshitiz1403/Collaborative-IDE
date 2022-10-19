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
      throw e;
    }
  };

  public getAllProjectsForUser = async (username: IProjectInputDTO['username']): Promise<IProject[]> => {
    try {
      this.logger.silly('Getting project for user');
      const projectsRecord = await this.projectRepositoryInstance.findAllProjectsForUser(username);

      const projects = [];
      projectsRecord.map(project => {
        const obj = {};
        obj['id'] = project.id;
        obj['name'] = project.name;
        obj['language'] = project.language;
        obj['updatedAt'] = project.updatedAt;
        projects.push(obj);
      });

      return projects;
    } catch (e) {
      throw e;
    }
  };

  public getProjectForUserByName = async (
    username: IProjectInputDTO['username'],
    name: IProjectInputDTO['name'],
  ): Promise<IProject> => {
    try {
      this.logger.silly('Getting project by name for user');
      const projectRecord = await this.projectRepositoryInstance.findProjectByNameForUser(username, name);

      if (!projectRecord) throw "Project does not exist."

      const project = projectRecord;

      Reflect.deleteProperty(project, 'slug_expiry');
      Reflect.deleteProperty(project, 'createdAt');
      Reflect.deleteProperty(project, 'updatedAt');

      return project;
    } catch (err) {
      throw err;
    }
  };

  public addSlug = async (
    username: IProjectInputDTO['username'],
    projectName: IProjectInputDTO['name'],
    id?: IProject['id'],
  ): Promise<IProject['slug']> => {
    try {
      this.logger.silly('Adding slug to project');
      const slug = await this.getSlug();
      const slug_expiry = new Date();
      slug_expiry.setTime(slug_expiry.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 days

      let updatedResult: string;
      if (id) {
        updatedResult = await this.projectRepositoryInstance.addSlugByProjectId(id, slug, slug_expiry);
      } else {
        updatedResult = await this.projectRepositoryInstance.addSlugByProjectName(
          projectName,
          username,
          slug,
          slug_expiry,
        );
      }
      return updatedResult;
    } catch (e) {
      throw e;
    }
  };

  public getProjectBySlug = async (slug: IProject['slug']): Promise<IProject> => {
    try {
      this.logger.silly('Getting project by slug');
      const projectRecord = await this.projectRepositoryInstance.findProjectBySlug(slug);
      if (!projectRecord) throw 'Invalid link';

      const { slug_expiry } = projectRecord;
      const now = new Date();
      if (slug_expiry < now) throw 'The project link has expired, kindly request the project owner for a new link';

      const project = projectRecord;
      Reflect.deleteProperty(project, 'createdAt');
      Reflect.deleteProperty(project, 'updatedAt');
      Reflect.deleteProperty(project, 'slug_expiry');

      return project;
    } catch (e) {
      throw e;
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
