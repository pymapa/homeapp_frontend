import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: any) => void;
}

type Inputs = {
  email: string;
  password: string;
};

const SignUpForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  return (
    <div className="loginform loginform--signup">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__title">
          <h1>Sign up</h1>
        </div>
        <div className="form__row">
          <input
            placeholder="First name"
            className="form__input"
            type="text"
            name="firstName"
            ref={register({ required: true })}
          />
          <input
            placeholder="Last name"
            className="form__input"
            type="text"
            name="familyName"
            ref={register({ required: true })}
          />
        </div>
        <div className="form__row">
          <input
            placeholder="Email"
            className="form__input"
            type="text"
            name="email"
            ref={register({ required: true })}
          />
        </div>
        <div className="form__row">
          <input
            placeholder="Password"
            className="form__input"
            type="password"
            name="password"
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

export default SignUpForm;
