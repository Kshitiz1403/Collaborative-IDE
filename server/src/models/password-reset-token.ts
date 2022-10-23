import { IPasswordResetToken } from '@/interfaces/IPasswordResetToken';
import sequelize from '@/loaders/mysql';
import { DataTypes, Model } from 'sequelize';

const PasswordResetToken = sequelize.define<Model & IPasswordResetToken>(
  'password-reset-token',
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
      allowNull: false,
    },
    token_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['username', 'token'],
      },
    ],
  },
);

export default PasswordResetToken;
