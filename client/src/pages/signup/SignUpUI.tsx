import { Button, Input } from "antd";
import { ISignUpValues } from "../../services/auth-user/auth-user.type";
import styles from "./SignUp.module.scss";

interface SignUpUIProps {
  values: ISignUpValues;
  onSetValues: (e: ISignUpValues) => void;
  onNavigate: (e: string) => void;
  onSignUp: () => void;
}

const SignUpUI = (props: SignUpUIProps) => {
  const { values, onSetValues, onNavigate, onSignUp } = props;
  return (
    <div className={styles.sign_up}>
      <div className={styles.modal}>
        <div className={styles.logo}>Sign Up</div>
        <Input
          required
          placeholder="Usernam"
          onChange={(e) => onSetValues({ ...values, username: e.target.value })}
        />
        <Input
          required
          placeholder="Password"
          onChange={(e) => onSetValues({ ...values, password: e.target.value })}
        />
        <Input
          required
          placeholder="Confirm password"
          onChange={(e) =>
            onSetValues({ ...values, confirmPassword: e.target.value })
          }
        />
        <Button type="primary" onClick={onSignUp}>
          Sign up
        </Button>
        <Button
          className="w-full font-semibold"
          id="sign-in-btn"
          onClick={() => onNavigate("/sign-in")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignUpUI;
