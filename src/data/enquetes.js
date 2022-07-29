import sequelize, { Sequelize } from "sequelize";
import {connection} from "./database.js";

const Enquete = connection.define('enquete', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    dt_inicio:{
        type: sequelize.DATE,
        allowNull:false
    },
    dt_fim:{
        type: sequelize.DATE,
        allowNull:false
    }
})

Enquete.sync({force:false})

export default {Enquete}