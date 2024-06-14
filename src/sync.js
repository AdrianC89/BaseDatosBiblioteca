//IMPORTANTE! SOLO INICIAR "node .\src\sync.js" SI SE NECESITA ACTUALIZAR ALGUNA TABLA, SINO NO HACE FALTA.

import sequelize from './database/connect.js';
import './models/user.js';
import './models/role.js';
import './models/autor.js';
import './models/libros.js';
import './models/libro_autor.js';
import './models/prestamo.js';

sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
  });