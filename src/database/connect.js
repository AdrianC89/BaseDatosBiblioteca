import { Sequelize } from 'sequelize';

const sequelize = new Sequelize( 'proyecto-biblioteca', 'root', 'root',{
    dialect: "mysql",
    port: 3306
})

export default sequelize