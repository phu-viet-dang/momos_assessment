import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUserApi from "../../services/auth-user/auth-user.api";
import { ISignInValues } from "../../services/auth-user/auth-user.type";
import SignInUI from "./SignInUI";

const SignIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<ISignInValues>();

  const onSignin = async () => {
    if (!values?.username || !values?.password) {
      return message.warning("Username and password are required!");
    }

    try {
      const res = await AuthUserApi.signIn(values);
      message.success("Sign in successfully!");
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <SignInUI
      values={values}
      onSetValues={(e) => setValues(e)}
      onNavigate={(e) => navigate(e)}
      onSignIn={onSignin}
    />
  );
};

export default SignIn;
