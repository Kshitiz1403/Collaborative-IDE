import { IProject } from './IProject';
import { IUser } from './IUser';

export interface IFileInputDTO {
  relativePath: string;
  username: IUser['username'];
  project_name: IProject['name'];
}
