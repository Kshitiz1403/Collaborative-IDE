import { ContainerService } from '@/services/containerService';
import { NextFunction, Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { IProjectRequest } from '../types/express';
import { Result } from '../util/result';

@Service()
export class ContainerController {
  protected containerServiceInstance: ContainerService;
  protected logger: Logger;

  constructor(containerService: ContainerService, @Inject('logger') logger: Logger) {
    this.containerServiceInstance = containerService;
    this.logger = logger;
  }

  public compile = async (req: IProjectRequest, res: Response, next: NextFunction) => {
    this.logger.debug('Calling Compile endpoint with query: %o', req.query);

    try {
      const project_name = req.project.name;
      const username = req.username;
      const language = req.project.language;

      const result = await this.containerServiceInstance.compile(username, project_name, language);
      return res.status(200).json(Result.success(result));
    } catch (err) {
      return next(err);
    }
  };
}
