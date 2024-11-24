import * as jsonwebtoken from "jsonwebtoken";
import UserModel from "../sequelize/models/user.model";

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!!!token || token == "null") {
      return res.status(403).json({ error: "Unauthorized request!" });
    }

    const data: any = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({
      where: { username: data.username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.user = user.transformToResponse();
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
