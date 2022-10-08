import { IUser } from '@/interfaces/IUser';
import sequelize from '../loaders/mysql';
import { DataTypes, Model } from 'sequelize';
import Project from './project';

const User = sequelize.define<Model & IUser>(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
  },
  {
    timestamps: true,
  },
);

User.hasMany(Project, { foreignKey: 'username', foreignKeyConstraint: true });

export default User;

// export default mongoose.model<IUser & mongoose.Document>('User', User);
