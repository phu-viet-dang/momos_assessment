import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/user.model";
import MediaModel from "../models/media.model";
import { development } from "./database";

const sequelize = new Sequelize({
  username: development.username,
  password: development.password,
  database: "postgres",
  host: development.host,
  port: +development.port,
  dialect: "postgres",
});

sequelize.addModels([UserModel, MediaModel]);

export default sequelize;
