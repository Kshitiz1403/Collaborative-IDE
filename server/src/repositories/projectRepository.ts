import { injectable } from 'inversify';
import ProjectModel from '@/models/project';
import { IProject, IProjectInputDTO } from '@/interfaces/IProject';

@injectable()
export class ProjectRepository {
  constructor() {}

  public findProjectById = async (projectId: number): Promise<IProject> => {
    return ProjectModel.findOne({ where: { id: projectId } }).then(project => {
      if (project) {
        return project.toJSON();
      }
    });
  };

  public findProjectBySlug = async (slug: string): Promise<IProject> => {
    return ProjectModel.findOne({ where: { slug } }).then(project => {
      if (project) {
        return project.toJSON();
      }
    });
  };

  public findProjectByNameForUser = async (username: string, name: string): Promise<IProject> => {
    return ProjectModel.findOne({ where: { username, name } }).then(project => {
      if (project) {
        return project.toJSON();
      }
    });
  };

  public findAllProjectsForUser = async (username: string): Promise<IProject[]> => {
    return ProjectModel.findAll({ where: { username } }).then(projects => {
      if (projects) {
        return projects;
      }
    });
  };

  public createProject = async (projectInputDTO: IProjectInputDTO): Promise<IProject> => {
    return ProjectModel.create({ ...projectInputDTO }, { raw: true }).then(project => project.toJSON());
  };

  public addSlugByProjectId = async (projectId: number, slug: string, slug_expiry: Date): Promise<string> => {
    return ProjectModel.update({ slug, slug_expiry }, { where: { id: projectId }, returning: true })
      .then(updatedResult => {
        const affectedId = updatedResult[1];
        if (affectedId) return slug;
      })
  };

  public addSlugByProjectName = async (projectName: string, username: string, slug: string, slug_expiry:Date): Promise<string> => {
    return ProjectModel.update({ slug, slug_expiry }, { where: { username, name: projectName }, returning: true })
      .then(updatedResult => {
        const affectedRows = updatedResult[1];
        if (affectedRows) return slug;
        throw ('Slug not added to project');
      })
  };
}
