import cache from '@/loaders/cache';
import docker from '@/loaders/docker';
import { Service } from 'typedi';

@Service()
export class ContainerRepository {
  public createContainerRecord = async (username, projectName, containerId) => {
    return await cache.hSet(username, projectName, containerId);
  };

  public getContainer = async (username, projectName) => {
    const containerId = await this.getContainerRecord(username, projectName);
    return this.getContainerById(containerId);
  };

  public getContainerById = async containerId => {
    const _container = docker.container.get(containerId);
    return _container;
  };

  public getContainerRecord = async (username, projectName) => {
    const containerId = await cache.hGet(username, projectName);
    return containerId;
  };

  public removeContainerRecord = async (username, projectName) => {
    return await cache.del(username, projectName);
  };
}
