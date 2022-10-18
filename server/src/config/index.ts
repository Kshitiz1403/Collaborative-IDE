import dotenv from 'dotenv';
import { Region } from 'oci-common';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */

  host: process.env.HOST,

  port: parseInt(process.env.PORT, 10),

  databaseHost: process.env.DB_HOST,

  databasePassword: process.env.DB_PASSWORD,

  databaseUser: process.env.DB_USER,

  databaseName: process.env.DB_NAME,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  objectStorage: {
    tenancy: process.env.OCI_TENANCY,
    user: process.env.OCI_USER,
    fingerprint: process.env.OCI_FINGERPRINT,
    privateKey: Buffer.from(process.env.OCI_PRIVATE_KEY, 'base64').toString('ascii'),
    passphrase: null,
    region: Region.AP_MUMBAI_1,
    compartmentId: process.env.OCI_COMPARTMENT_ID,
    bucketName: process.env.OCI_BUCKET_NAME,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  emails: {
    username: process.env.ORACLE_EMAIL_USERNAME,
    password: process.env.ORACLE_EMAIL_PASSWORD,
    port: process.env.ORACLE_EMAIL_PORT,
    host: process.env.ORACLE_EMAIL_HOST,
  },
};
