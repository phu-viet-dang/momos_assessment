import Api from "../api";
import { ISignInValues, ISignUpValues, IUser } from "./auth-user.type";

const signIn = async (data: ISignInValues) => {
  try {
    const res: { data: IUser; token: string } = await Api.post(
      "/api/auth/sign-in",
      data
    );
    return res;
  } catch (error) {
    throw error;
  }
};

const signUp = async (data: ISignUpValues) => {
  try {
    const res = await Api.post("/api/auth/sign-up", {
      username: data.username,
      password: data.password,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const AuthUserApi = { signIn, signUp };

export default AuthUserApi;
