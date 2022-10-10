import { IProject } from '@/interfaces/IProject';
import sequelize from '@/loaders/mysql';
import { DataTypes, Model } from 'sequelize';

const Project = sequelize.define<Model & IProject>(
  'project',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.ENUM,
      values: ['python', 'c++', 'java', 'nodejs'],
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'username',
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug_expiry:{
      type:DataTypes.DATE,    
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['name', 'username'],
      },
    ],
  },
);

export default Project;
