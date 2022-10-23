import { IProjectInputDTO } from '@/interfaces/IProject';
import ProjectService from '@/services/projectService';
import { NextFunction, Request } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import { IRequest, IResponse } from '../types/express';
import { Result } from '../util/result';

export class ProjectController {
  protected projectServiceInstance: ProjectService;
  protected logger: Logger;
  constructor() {
    this.projectServiceInstance = Container.get(ProjectService);
    this.logger = Container.get('logger');
  }

  public create = async (req: IRequest, res: IResponse, next: NextFunction) => {
    this.logger.debug('Calling Create Project endpoint with body: %o', req.body);
    try {
      const username = req.currentUser.username;
      const project = await this.projectServiceInstance.createProject({ ...(req.body as IProjectInputDTO), username });

      return res.status(200).json(Result.success<Object>(project));
    } catch (e) {
      return next(e);
    }
  };

  public getByName = async (req: IRequest, res: IResponse, next: NextFunction) => {
    this.logger.debug('Calling Get Project By Name endpoint with params: %o', req.params);
    try {
      const username = req.currentUser.username;
      const name = req.params.name as string;
      const project = await this.projectServiceInstance.getProjectForUserByName(username, name);

      return res.status(200).json(Result.success(project));
    } catch (e) {
      return next(e);
    }
  };

  public addSlug = async (req: IRequest, res: IResponse, next: NextFunction) => {
    this.logger.debug('Calling Add Slug endpoint with body: %o', req.body);
    try {
      const username = req.currentUser.username;
      const result = await this.projectServiceInstance.addSlug(username, req.body.name, req.body.id);

      return res.status(200).json(Result.success<Object>(result));
    } catch (e) {
      this.logger.error('🔥 error: %o', e);
      return next(e);
    }
  };

  public addOrGetSlug = async (req: IRequest, res: IResponse, next: NextFunction) => {
    this.logger.debug('Calling Get Or Add Slug endpoint with query: %o', req.query);
    try {
      const username = req.currentUser.username;
      const name = req.body.name;
      const slug = await this.projectServiceInstance.getOrAddSlug(username, name);
      return res.status(200).json(Result.success(slug));
    } catch (err) {
      return next(err);
    }
  };

  public getBySlug = async (req: Request, res: IResponse, next: NextFunction) => {
    this.logger.debug('Calling Get Project by Slug endpoint with query: %o', req.query);
    try {
      const project = await this.projectServiceInstance.getProjectBySlug(req.query.slug as string);

      return res.status(200).json(Result.success<Object>(project));
    } catch (e) {
      return next(e);
    }
  };

  public getAllProjects = async (req: IRequest, res: IResponse, next: NextFunction) => {
    this.logger.debug('Calling Get all projects endpoint with body: %o', req.body);
    try {
      const username = req.currentUser.username;
      const projects = await this.projectServiceInstance.getAllProjectsForUser(username);
      return res.status(200).json(Result.success<Object>(projects));
    } catch (e) {
      return next(e);
    }
  };
}
