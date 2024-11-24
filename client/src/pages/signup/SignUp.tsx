import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUserApi from "../../services/auth-user/auth-user.api";
import { ISignUpValues } from "../../services/auth-user/auth-user.type";
import SignUpUI from "./SignUpUI";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<ISignUpValues>();

  const onSignUp = async () => {
    if (!values?.username || !values?.password || !values?.confirmPassword) {
      return message.warning("Require information");
    }

    if (values?.password !== values?.confirmPassword) {
      return message.error("Confirm password not match");
    }

    try {
      await AuthUserApi.signUp(values);
      message.success("Sign up successfully! Please sign in");
      navigate("/sign-in");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <SignUpUI
      values={values}
      onSetValues={(e) => setValues(e)}
      onNavigate={(e) => navigate(e)}
      onSignUp={onSignUp}
    />
  );
};

export default SignUp;
