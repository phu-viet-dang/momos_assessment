import * as jsonwebtoken from "jsonwebtoken";
import UserModel from "../sequelize/models/user.model";

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const data: any = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({
      where: { username: data.username },
    });
    if (user) {
      req.user = user.transformToResponse();
      next();
      return;
    }
    return res.status(403).json({ error: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
