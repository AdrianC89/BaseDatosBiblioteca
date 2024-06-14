import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Autor = sequelize.define('Autor', {
    autor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'Autores',
    timestamps: false
  });
  
  export default Autor;