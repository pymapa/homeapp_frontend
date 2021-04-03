import cuid from "cuid";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import { confirmRegistration, signIn, signup } from "../../utils/auth";
import EmailVerification from "./EmailVerification";
import "./login.scss";
import SignUpForm from "./SignUpForm";

interface Props {}

type Credentials = {
  Username: string;
  Password: string;
};

enum SignupState {
  USER_INFO,
  EMAIL_VERIFICATION,
}

const SignUp = (props: Props) => {
  const [formState, setFormState] = useState<SignupState>(
    SignupState.USER_INFO
  );
  const [credentials, setCredentials] = useState<Credentials>({
    Username: "",
    Password: "",
  });
  const { user, setUser, setUserSession } = useContext(AuthContext);
  const { addToast } = useContext(NotificationContext);

  const onSignupSubmit = async (data: {
    firstName: string;
    familyName: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await signup(
        data.firstName,
        data.familyName,
        data.email,
        data.password
      );
      setUser(res.user);
      setCredentials({ Username: data.email, Password: data.password });
      setFormState(SignupState.EMAIL_VERIFICATION);
    } catch (err) {
      addToast({
        text: err.message,
        id: cuid(),
        type: "error",
        timer: 5000,
      });
    }
  };

  const history = useHistory();
  const onVerificationSubmit = async (data: { verificationCode: string }) => {
    try {
      user && (await confirmRegistration(data.verificationCode, user));
      const { Username, Password } = credentials;
      const session = await signIn(Username, Password);
      setUserSession(session);
      history.replace("/");
      addToast({
        text: "Welcome!",
        id: cuid(),
        type: "success",
        timer: 5000,
      });
    } catch (err) {
      addToast({
        text: err.message,
        id: cuid(),
        type: "error",
        timer: 5000,
      });
    }
  };

  return (
    <div className="authentication layout__content">
      {formState === SignupState.USER_INFO ? (
        <SignUpForm onSubmit={onSignupSubmit} />
      ) : (
        <EmailVerification onSubmit={onVerificationSubmit} />
      )}
    </div>
  );
};

export default SignUp;
