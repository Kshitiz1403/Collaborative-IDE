import { ProjectRepository } from '@/repositories/projectRepository';
import { injectable } from 'inversify';
import fs from 'fs-extra';
import path from 'path';
import { IUser } from '@/interfaces/IUser';
import { Inject } from 'typedi';
import { Logger } from 'winston';

@injectable()
export default class FileService {
  protected projectRepositoryInstance: ProjectRepository;
  protected loggerInstance: Logger;
  constructor(@Inject('logger') private logger) {
    this.loggerInstance = logger;
  }

  private getAbsolutePath = (...args) => {
    return path.join(__dirname, '..', '..', '..', 'projects', ...args);
  };

  public createFolder = async (relativePath: string = '', username: IUser['username'], folder_name: string) => {
    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, relativePath);
    const folder_path = path.join(absolutePath, folder_name);

    this.loggerInstance.silly('Creating folder at ' + folder_path);

    try {
      await fs.ensureDir(folder_path);
      return 'Folder has been created';
    } catch (err) {
      throw 'Folder could not be created';
    }
  };

  public createFile = async (
    relativePath: string = '',
    username: IUser['username'],
    file_name: string,
    data: string = '',
  ) => {
    const parentFolder = username;
    const absolutePath = this.getAbsolutePath(parentFolder, relativePath);
    const file_path = path.join(absolutePath, file_name);

    this.loggerInstance.silly('Saving file  at ' + file_path);

    try {
      await fs.outputFile(file_path, data);
      return 'File has been saved';
    } catch (err) {
      throw 'File could not be saved';
    }
  };

  public getFile = async (relativePath: string = '', username: IUser['username'], file_name: string) => {
    const parentFolder = username;
    const absolutePath = this.getAbsolutePath(parentFolder, relativePath);
    const file_path = path.join(absolutePath, file_name);

    this.loggerInstance.silly('Getting file  from ' + file_path);

    try {
      const data = await fs.readFile(file_path, { encoding: 'utf8' });
      return data;
    } catch (err) {
      throw 'File could not be accessed';
    }
  };

  public rename = async (relativePath: string = '', username: IUser['username'], oldName: string, newName: string) => {
    const parentFolder = username;
    const absolutePath = this.getAbsolutePath(parentFolder, relativePath);
    const old_file_path = path.join(absolutePath, oldName);
    const new_file_path = path.join(absolutePath, newName);

    this.loggerInstance.silly('Renaming from  ' + old_file_path + ' to ' + new_file_path);

    try {
      await fs.rename(old_file_path, new_file_path);
      return 'File has been renamed';
    } catch (err) {
      throw 'File could not be renamed';
    }
  };

  public delete = async (relativePath: string = '', username: IUser['username'], file_name: string) => {
    const parentFolder = username;

    const absolutePath = this.getAbsolutePath(parentFolder, relativePath);
    const file_path = path.join(absolutePath, file_name);

    this.loggerInstance.silly('Deleting resource from ' + file_path);

    try {
      await fs.remove(file_path);
      return 'Removed';
    } catch (err) {
      throw 'Could not remove';
    }
  };
}
