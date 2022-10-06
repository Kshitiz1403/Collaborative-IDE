import config from '@/config';
import { createConnection } from 'mysql2';

// export default async (): Promise<Db> => {
//   const connection = await mongoose.connect(config.databaseURL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   });
//   return connection.connection.db;
// };

export default async () => {
  const connection = createConnection({
    user: config.databaseUser,
    host: config.databaseHost,
    password: config.databasePassword,
    database: config.databaseName,
  });
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        return reject(err);
      }
      return resolve(connection);
    });
  });
};
