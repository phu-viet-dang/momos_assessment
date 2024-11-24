import UserModel from "./src/sequelize/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
