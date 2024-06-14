import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Libro = sequelize.define('Libro', {
    libro_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    publication_year: {
      type: DataTypes.INTEGER
    },
    copies_available: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'Libros',
    timestamps: false
  });
  
  export default Libro;