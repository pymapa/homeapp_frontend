import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: any) => void;
}

type Inputs = {
  email: string;
  password: string;
};

function LoginForm({ onSubmit }: Props) {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  return (
    <div className="loginform">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__title">
          <h1>Sign in</h1>
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
              LOG IN
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
