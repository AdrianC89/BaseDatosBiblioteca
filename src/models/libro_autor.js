import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';
import Libro from './libros.js';
import Autor from './autor.js';

const LibroAutor = sequelize.define('LibroAutor', {
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Libro,
        key: 'libro_id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Autor,
        key: 'autor_id'
      }
    }
  }, {
    tableName: 'LibrosAutor',
    timestamps: false
  });
  
    Libro.belongsToMany(Autor, { through: LibroAutor, foreignKey: 'libro_id' });
    Autor.belongsToMany(Libro, { through: LibroAutor, foreignKey: 'autor_id' });

    export default LibroAutor;