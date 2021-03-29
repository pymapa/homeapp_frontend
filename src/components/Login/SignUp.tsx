import React from "react";
import { signup } from "../../utils/auth";
import "./login.scss";
import SignUpForm from "./SignUpForm";

interface Props {}

const SignUp = (props: Props) => {
  const onSubmit = async (data: { firstName: string, familyName: string, email: string; password: string }) => {
    const res = await signup(data.firstName, data.familyName, data.email, data.password)
    console.log(res)
  };

  return (
    <div className="signup">
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignUp;
