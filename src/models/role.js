import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Roles',
  timestamps: false
});

export default Role;
