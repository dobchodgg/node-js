import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { RIGHTS } from '../constants';

/**
 * @typedef User
 * @property {string} id
 * @property {string} email
 * @property {string} password
 * @property {RIGHTS} rights
 * @property {string} created
 * @property {string} updated
 * @property {string} deleted
 * @typedef {Omit<User, 'id' | 'created' | 'updated' | 'deleted'>} CreateUser
 * @typedef {import('sequelize').ModelStatic<import('sequelize').Model<User, CreateUser>> & { validPassword?(password: string): boolean }} UserModel
 */

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @returns {UserModel}
 */
export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rights: {
        type: DataTypes.ENUM,
        values: [RIGHTS.READ, RIGHTS.WRITE, RIGHTS.ADMIN],
        defaultValue: RIGHTS.READ,
        allowNull: false
      }
    },
    {
      tableName: 'User',
      createdAt: 'created',
      updatedAt: 'updated',
      deletedAt: 'deleted',
      paranoid: true,
      freezeTableName: true,
      timestamps: true
    }
  );

  User.beforeCreate(async (user) => {
    if (user.dataValues.password) {
      const salt = bcrypt.genSaltSync(10, 'a');
      user.dataValues.password = bcrypt.hashSync(user.dataValues.password, salt);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.dataValues.password) {
      const salt = bcrypt.genSaltSync(10, 'a');
      user.dataValues.password = bcrypt.hashSync(user.dataValues.password, salt);
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
