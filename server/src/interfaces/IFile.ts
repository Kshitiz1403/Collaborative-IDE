import { IProject } from "./IProject";
import { IUser } from "./IUser";

export interface IFileInputDTO {
    relativePath: string;
    username: IUser['username'];
    project_name_from_request: IProject['name'];
    project_name_authenticatedWithSlug: IProject['name'];
  }
  