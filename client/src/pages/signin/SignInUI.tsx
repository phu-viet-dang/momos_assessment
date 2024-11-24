import { Button, Input } from "antd";
import styles from "./Signin.module.scss";
import { ISignInValues } from "../../services/auth-user/auth-user.type";

interface SignInUIProps {
  values: ISignInValues;
  onSetValues: (e: ISignInValues) => void;
  onNavigate: (e: string) => void;
  onSignIn: () => void;
}

const SignInUI = (props: SignInUIProps) => {
  const { values, onSetValues, onNavigate, onSignIn } = props;
  return (
    <div className={styles.sign_in}>
      <div className={styles.modal}>
        <div className={styles.logo}>Sign in</div>
        <Input
          placeholder="Username"
          onChange={(e) => onSetValues({ ...values, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => onSetValues({ ...values, password: e.target.value })}
        />
        <Button type="primary" onClick={onSignIn}>
          Login
        </Button>
        <Button
          className="w-full font-semibold"
          id="sign-in-btn"
          onClick={() => onNavigate("/sign-up")}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default SignInUI;
