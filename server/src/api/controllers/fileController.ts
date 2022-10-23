import FileService from '@/services/fileService';
import { NextFunction,  Response } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import { IFileRequest } from '../types/express';
import { Result } from '../util/result';

export class FileController {
  protected fileServiceInstance: FileService;
  protected logger: Logger;
  constructor() {
    this.fileServiceInstance = Container.get(FileService);
    this.logger = Container.get('logger');
  }

  public get = async (req: IFileRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Get File endpoint with query: %o', req.query);

    try {
      const project_name_authenticatedWithSlug = req.project_name;
      const project_name_from_request = req.query.project as string;
      const parent: string = req.query.parent as string;
      const file_name: string = req.query.name as string;
      const result = await this.fileServiceInstance.getFile({
        file_name,
        project_name_authenticatedWithSlug,
        project_name_from_request,
        relativePath: parent,
        username: req['username'],
      });

      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };

  public save = async (req: IFileRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Save File endpoint with body: %o', req.body);
    try {
      const project_name_authenticatedWithSlug = req.project_name;
      const project_name_from_request = req.query.project as string;
      const parent: string = req.query.parent as string;
      const file_name = req.body['name'];
      const data = req.body['data'];

      const result = await this.fileServiceInstance.createFile({
        file_name,
        project_name_from_request,
        project_name_authenticatedWithSlug,
        data,
        relativePath: parent,
        username: req['username'],
      });

      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };

  public createFolder = async (req: IFileRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Create File/Folder endpoint with body: %o', req.body);
    try {
      const project_name_authenticatedWithSlug = req.project_name;
      const project_name_from_request = req.query.project as string;
      const parent: string = req.query.parent as string;
      const folder_name = req.body['name'];

      const result = await this.fileServiceInstance.createFolder({
        project_name_authenticatedWithSlug,
        project_name_from_request,
        folder_name,
        username: req['username'],
        relativePath: parent,
      });
      return res.status(200).json(Result.success<Object>(result));
    } catch (err) {
      return next(err);
    }
  };

  public rename = async (req: IFileRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Rename File/Folder endpoint with body: %o', req.body);
    try {
      const project_name_authenticatedWithSlug = req.project_name;
      const project_name_from_request = req.query.project as string;
      const parent: string = req.query.parent as string;
      const newName = req.body['new_name'];
      const oldName = req.body['old_name'];

      const result = await this.fileServiceInstance.rename({
        project_name_authenticatedWithSlug,
        project_name_from_request,
        relativePath: parent,
        newName,
        oldName,
        username: req['username'],
      });
      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };

  public delete = async (req: IFileRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Delete File endpoint with query: %o', req.query);
    try {
      const project_name_authenticatedWithSlug = req.project_name;
      const project_name_from_request = req.query.project as string;
      const parent: string = req.query.parent as string;
      const file_name: string = req.query.name as string;

      const result = await this.fileServiceInstance.delete({
        project_name_authenticatedWithSlug,
        project_name_from_request,
        username: req['username'],
        relativePath: parent,
        file_name,
      });

      return res.status(200).json(Result.success<Object>(result));
    } catch (err) {
      return next(err);
    }
  };

  public getTree = async (req: IFileRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Get File Tree endpoint with query: %o', req.query);
    try {
      const project_name_authenticatedWithSlug = req.project_name;
      const project_name_from_request = req.query.project as string;
      const parent: string = req.query.parent as string;

      const result = await this.fileServiceInstance.getTree({
        project_name_authenticatedWithSlug,
        project_name_from_request,
        relativePath: parent,
        username: req['username'],
      });

      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };
}
