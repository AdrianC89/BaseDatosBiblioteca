import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';
import User from './user.js';
import Libro from './libros.js';


const Prestamo = sequelize.define('Prestamo', {
    prestamo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id'
      }
    },
    libro_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Libro,
        key: 'libro_id'
      }
    },
    prestamo_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    due_date: {
      type: DataTypes.DATE
    },
    return_date: {
      type: DataTypes.DATE
    },
    is_late: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'Prestamos',
    timestamps: false
  });
  
  Prestamo.belongsTo(User, { foreignKey: 'user_id' });
  Prestamo.belongsTo(Libro, { foreignKey: 'libro_id' });

  export default Prestamo;
  