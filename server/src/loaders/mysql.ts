import config from '@/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.databaseName, config.databaseUser, config.databasePassword, {
  host: config.databaseHost,
  dialect: 'mysql',
  port:3306
});

export default sequelize;
