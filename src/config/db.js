//import dotenv from "dotenv"; // isso faz precisar do dotenv.config(); 
import "dotenv/config";
import { Sequelize } from "sequelize";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
});


/*
const sequelize = new Sequelize(
  process.env.DB_NAME, // nome do banco
  process.env.DB_USER, // usuário (root)
  process.env.DB_PASSWORD, // senha
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);
*/

export default sequelize;
