import FileService from '@/services/fileService';
import { Request } from 'express';
import Container, { Inject } from 'typedi';
import { Logger } from 'winston';
import { Result } from '../util/result';

export class FileController {
  protected fileServiceInstance: FileService;
  protected logger: Logger;
  constructor() {
    this.fileServiceInstance = Container.get(FileService);
    this.logger = Container.get('logger');
  }

  public get = async (req: Request & { username: string }, res, next) => {
    this.logger.debug('Calling Get File endpoint with query: %o', req.query);
    try {
      const fileServiceInstance = Container.get(FileService);
      const parent: string = req.query.parent as string;
      const name: string = req.query.name as string;
      const result = await fileServiceInstance.getFile(parent, req['username'], name);

      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };

  public save = async (req: Request & { username: string }, res, next) => {
    this.logger.debug('Calling Save File endpoint with body: %o', req.body);
    try {
      const fileServiceInstance = Container.get(FileService);
      const result = await fileServiceInstance.createFile(
        req.body['parent'],
        req['username'],
        req.body['name'],
        req.body['data'],
      );
      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };

  public create = async (req: Request & { username: string }, res, next) => {
    this.logger.debug('Calling Create File/Folder endpoint with body: %o', req.body);
    try {
      const fileServiceInstance = Container.get(FileService);
      const result = await fileServiceInstance.createFolder(req.body['parent'], req['username'], req.body['name']);
      return res.status(200).json(Result.success<Object>(result));
    } catch (err) {
      return next(err);
    }
  };

  public rename = async (req, res, next) => {
    this.logger.debug('Calling Rename File/Folder endpoint with body: %o', req.body);
    try {
      const result = await this.fileServiceInstance.rename(
        req.body['parent'],
        req['username'],
        req.body['old_name'],
        req.body['new_name'],
      );
      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };

  public delete = async (req: Request & { username: string }, res, next) => {
    this.logger.debug('Calling Delete File endpoint with query: %o', req.query);
    try {
      const parent: string = req.query.parent as string;
      const name: string = req.query.name as string;
      const result = await this.fileServiceInstance.delete(parent, req['username'], name);

      return res.status(200).json(Result.success<Object>(result));
    } catch (err) {
      return next(err);
    }
  };
}
