import { Sequelize } from "sequelize-typescript";
import UserModel from "./user.model";
import MediaModel from "./media.model";

const env = process.env.NODE_ENV || "development";
const config = require("../config/database.ts")[env];

const sequelize = new Sequelize(config);

sequelize.addModels([UserModel, MediaModel]);

export { Sequelize, sequelize };
