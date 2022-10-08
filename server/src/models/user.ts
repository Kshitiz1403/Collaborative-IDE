import { IUser } from '@/interfaces/IUser';
import sequelize from '../loaders/mysql';
import { DataTypes, Model } from 'sequelize';

const User = sequelize.define<Model & IUser>(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      values:['user', 'admin'],
      defaultValue: 'user'
    },
  },
  {
    timestamps: true,
  },
);

export default User;


// export default mongoose.model<IUser & mongoose.Document>('User', User);
