import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authMiddleware from "./middlewares/authMiddleware";
import loggerMiddleware from "./middlewares/loggerMiddileware";
import authRoute from "./modules/auth/auth.route";
import mediaRoute from "./modules/media/media.route";
import "./sequelize/config/connection";

dotenv.config();
const app = express();

const main = async () => {
  app.use(loggerMiddleware.requestLogger);

  app.use(cors());

  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  app.get("/", async function (req, res) {
    res.send("Hello world!");
  });

  app.use("/api/auth", authRoute);
  app.use(authMiddleware);
  app.use("/api/medias", mediaRoute);

  app.use(loggerMiddleware.errorLogger);

  app.listen(3001, () => {
    console.log("Server is listening on port 3001");
  });
};

main();
export default app;
