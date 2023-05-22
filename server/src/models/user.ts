import { IUser } from '@/interfaces/IUser';
import sequelize from '../loaders/mysql';
import { DataTypes, Model } from 'sequelize';
import Project from './project';
import PasswordResetToken from './password-reset-token';
import RefreshToken from './refresh-tokens';

const User = sequelize.define<Model & IUser>(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    signedUpIP: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

User.hasMany(Project, { foreignKey: 'username', foreignKeyConstraint: true });
User.hasMany(PasswordResetToken, { foreignKey: 'username', foreignKeyConstraint: true });
User.hasOne(RefreshToken, { foreignKey: 'username' });

export default User;

// export default mongoose.model<IUser & mongoose.Document>('User', User);
