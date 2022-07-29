import Sequelize from "sequelize";

export const connection = new Sequelize('teste_signo_VictorHugo','root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
} ) 