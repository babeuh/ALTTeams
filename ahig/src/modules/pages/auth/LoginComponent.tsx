import { LoginButtonComponent } from "./LoginButtonComponent";
import { UserCredentials } from "../../../types";
import React, { useState } from "react";

interface LoginComponentProps {
  handleSubmit: (userCredentials: UserCredentials) => void;
}

export const LoginComponent: React.FC<LoginComponentProps> = ({
  handleSubmit,
}) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmitLocal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({email: emailValue, password: passwordValue});
  };

  return (
    <>
      <form onSubmit={handleSubmitLocal}>
        <div className="flex flex-col gap-3">
          <>
            <input
              type="text"
              name="Email"
              className="flex outline-none px-4 rounded-lg text-white bg-primary-700 flex items-center justify-center justify-center text-base py-3"
              placeholder="name@example.com"
              value={emailValue}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              name="Password"
              className="flex outline-none px-4 rounded-lg text-white bg-primary-700 flex items-center justify-center justify-center text-base py-3"
              placeholder="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </>
          <LoginButtonComponent type="submit" />
        </div>
      </form>
    </>
  );
};
