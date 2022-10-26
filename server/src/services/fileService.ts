import { ProjectRepository } from '@/repositories/projectRepository';
import fs from 'fs-extra';
import path from 'path';
import { IFileInputDTO } from '@/interfaces/IFile';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import dirTree from 'directory-tree';

@Service()
export default class FileService {
  protected projectRepositoryInstance: ProjectRepository;
  protected loggerInstance: Logger;
  constructor(@Inject('logger') private logger, projectRepository: ProjectRepository) {
    this.loggerInstance = logger;
    this.projectRepositoryInstance = projectRepository;
  }

  private getAbsolutePath = (...args) => {
    return path.join(__dirname, '..', '..', '..', 'projects', ...args);
  };

  public createFolder = async (inputDTO: IFileInputDTO & { folder_name: string }) => {
    const { username, folder_name, relativePath, project_name } = inputDTO;

    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, project_name, relativePath);
    const folder_path = path.join(absolutePath, folder_name);

    this.loggerInstance.silly('Creating folder at ' + folder_path);

    try {
      await fs.ensureDir(folder_path);
      this.projectRepositoryInstance.updateLastUpdated(username, project_name)
      return 'Folder has been created';
    } catch (err) {
      throw 'Folder could not be created';
    }
  };

  public createFile = async (inputDTO: IFileInputDTO & { file_name: string; data: string }) => {
    const { username, relativePath, file_name, data, project_name } = inputDTO;

    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, project_name, relativePath);
    const file_path = path.join(absolutePath, file_name);

    this.loggerInstance.silly('Saving file  at ' + file_path);

    try {
      await fs.outputFile(file_path, data);
      this.projectRepositoryInstance.updateLastUpdated(username, project_name)
      return 'File has been saved';
    } catch (err) {
      throw 'File could not be saved';
    }
  };

  public getFile = async (inputDTO: IFileInputDTO & { file_name: string }) => {
    const { username, relativePath, file_name, project_name } = inputDTO;

    const parentFolder = username;
    const absolutePath = this.getAbsolutePath(parentFolder, project_name, relativePath);
    const file_path = path.join(absolutePath, file_name);

    this.loggerInstance.silly('Getting file  from ' + file_path);

    try {
      const data = await fs.readFile(file_path, { encoding: 'utf8' });
      return data;
    } catch (err) {
      throw 'File could not be accessed';
    }
  };

  public rename = async (inputDTO: IFileInputDTO & { oldName: string; newName: string }) => {
    const { username, relativePath, oldName, newName, project_name } = inputDTO;

    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, project_name, relativePath);
    const old_file_path = path.join(absolutePath, oldName);
    const new_file_path = path.join(absolutePath, newName);

    this.loggerInstance.silly('Renaming from  ' + old_file_path + ' to ' + new_file_path);

    try {
      await fs.rename(old_file_path, new_file_path);
      this.projectRepositoryInstance.updateLastUpdated(username, project_name)
      return 'File has been renamed';
    } catch (err) {
      throw 'File could not be renamed';
    }
  };

  public delete = async (inputDTO: IFileInputDTO & { file_name: string }) => {
    const { username, relativePath, file_name, project_name } = inputDTO;

    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, project_name, relativePath);
    const file_path = path.join(absolutePath, file_name);

    this.loggerInstance.silly('Deleting resource from ' + file_path);

    try {
      await fs.remove(file_path);
      this.projectRepositoryInstance.updateLastUpdated(username, project_name)
      return 'Removed';
    } catch (err) {
      throw 'Could not remove';
    }
  };

  public getTree = async (inputDTO: IFileInputDTO) => {
    const { username, project_name } = inputDTO;

    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, project_name);

    const tree = dirTree(absolutePath, { attributes: ['type'] });
    this.treeWalker(tree);

    return tree;
  };

  private treeWalker = (treeObject: any) => {
    if (treeObject.type == 'directory') {
      treeObject.type = 'folder';
    }
    delete treeObject.path;
    if (treeObject.hasOwnProperty('children')) {
      treeObject['files'] = treeObject['children'];
      delete treeObject['children'];
      treeObject['files'].forEach(child => {
        this.treeWalker(child);
      });
    }
  };
}
