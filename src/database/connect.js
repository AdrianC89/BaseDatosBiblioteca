import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('proyecto-biblioteca', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false, // Deshabilitar el logging para limpiar la salida de la consola
});

export default sequelize;