import React from "react";
import { signup } from "../../utils/auth";
import "./login.scss";
import LoginForm from "./LoginForm";

interface Props {}

const SignUp = (props: Props) => {
  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signup(data.email, data.password)
    console.log(res)
  };

  return (
    <div className="signup">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignUp;
