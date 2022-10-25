import ProjectModel from '@/models/project';
import { IProject, IProjectInputDTO } from '@/interfaces/IProject';
import { Service } from 'typedi';

@Service()
export class ProjectRepository {
  constructor() {}

  public findProjectById = async (projectId: IProject['id']): Promise<IProject> => {
    return ProjectModel.findOne({ where: { id: projectId } }).then(project => {
      if (project) {
        return project.toJSON();
      }
    });
  };

  public findProjectBySlug = async (slug: IProject['slug']): Promise<IProject> => {
    return ProjectModel.findOne({ where: { slug } }).then(project => {
      if (project) {
        return project.toJSON();
      }
    });
  };

  public findProjectByNameForUser = async (
    username: IProject['username'],
    name: IProject['name'],
  ): Promise<IProject> => {
    return ProjectModel.findOne({ where: { username, name } }).then(project => {
      if (project) {
        return project.toJSON();
      }
    });
  };

  public findAllProjectsForUser = async (username: IProjectInputDTO['username']): Promise<IProject[]> => {
    return ProjectModel.findAll({ where: { username } }).then(projects => {
      if (projects) {
        return projects;
      }
    });
  };

  public createProject = async (projectInputDTO: IProjectInputDTO): Promise<IProject> => {
    return ProjectModel.create({ ...projectInputDTO }, { raw: true }).then(project => project.toJSON());
  };

  public addSlugByProjectId = async (
    projectId: IProject['id'],
    slug: IProject['slug'],
    slug_expiry: IProject['slug_expiry'],
  ): Promise<IProject['slug']> => {
    return ProjectModel.update({ slug, slug_expiry }, { where: { id: projectId }, returning: true }).then(
      updatedResult => {
        const affectedId = updatedResult[1];
        if (affectedId) return slug;
      },
    );
  };

  public addSlugByProjectName = async (
    projectName: IProject['name'],
    username: IProject['username'],
    slug: IProject['slug'],
    slug_expiry: IProject['slug_expiry'],
  ): Promise<IProject['slug']> => {
    return ProjectModel.update({ slug, slug_expiry }, { where: { username, name: projectName }, returning: true }).then(
      updatedResult => {
        const affectedRows = updatedResult[1];
        if (affectedRows) return slug;
        throw 'Slug not added to project';
      },
    );
  };
}
