import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: any) => void;
}

type Inputs = {
  verificationCode: string;
};

const EmailVerification = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  return (
    <div className="loginform">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__title">
          <h1>Email verification</h1>
          <p>Copy the verification code you received in email</p>
        </div>
        <div className="form__row">
          <input
            placeholder="Verification code"
            className="form__input"
            type="text"
            name="verificationCode"
            ref={register({ required: true })}
          />
        </div>
        <div className="form__row">
          {errors && (
            <button className="form__button form__button--submit" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
