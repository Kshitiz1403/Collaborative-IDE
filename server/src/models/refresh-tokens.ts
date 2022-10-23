import { IRefreshToken } from '@/interfaces/IRefreshToken';
import sequelize from '@/loaders/mysql';
import { DataTypes, Model } from 'sequelize';

const RefreshToken = sequelize.define<Model & IRefreshToken>(
  'refresh-token',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'username',
      },
    },
    token: {
      type: DataTypes.STRING,
    },
    expiry: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  },
);

export default RefreshToken;