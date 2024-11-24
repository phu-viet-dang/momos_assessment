import * as bcrypt from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";

const hashingPassword = async (password: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateJwtToken = async (tokenPayload: any) => {
  return jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET);
};

const AuthService = { generateJwtToken, hashingPassword };

export default AuthService