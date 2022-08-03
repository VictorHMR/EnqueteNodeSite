import sequelize, { Sequelize } from "sequelize";
import {connection} from "./database.js";
import Enquete from '../data/enquetes.js'

const Resposta = connection.define('resposta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    votos:{
        type: sequelize.INTEGER,
        defaultValue: 0
    }
})
Enquete.Enquete.hasMany(Resposta)
Resposta.sync({force:false})

export default {Resposta}