import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mysqlLoader from './mysql';
import Logger from './logger';

export default async ({ expressApp }) => {

  await mysqlLoader.authenticate();
  await mysqlLoader.sync();
  
  Logger.info('✌️ DB loaded and connected!');

  await dependencyInjectorLoader();
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
