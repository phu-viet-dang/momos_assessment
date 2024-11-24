import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/user.model";
import MediaModel from "../models/media.model";
require("dotenv").config();

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: "postgres",
});

sequelize.addModels([UserModel, MediaModel]);

export default sequelize;
