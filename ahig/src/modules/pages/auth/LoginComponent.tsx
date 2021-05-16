import { LoginButtonComponent } from "./LoginButtonComponent";
import React, { useState } from "react";

interface LoginComponentProps {
  handleSubmit: (token: string) => void;
}
export let LoginComponent: React.FC<LoginComponentProps> = ({
  handleSubmit,
}) => {
  let token = true;
  let [emailValue, setEmailValue] = useState("");
  let [passwordValue, setPasswordValue] = useState("");
  let [tokenValue, setTokenValue] = useState("");

  let handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  let handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };
  let handleTokenChange = (event) => {
    setTokenValue(event.target.value);
  };

  let handleSubmitLocal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(tokenValue);
  };

  return (
    <>
      <form onSubmit={handleSubmitLocal}>
        <div className="flex flex-col gap-4">
          {token ? (
            <input
              type="password"
              name="Token"
              className="flex outline-none px-4 rounded-lg text-white bg-primary-700 flex items-center justify-center justify-center text-base py-3 mt-2"
              placeholder="Bearer ey..."
              value={tokenValue}
              onChange={handleTokenChange}
            />
          ) : (
            <>
              <input
                type="text"
                name="Email"
                className="flex outline-none px-4 rounded-lg text-white bg-primary-700 flex items-center justify-center justify-center text-base py-3 mt-2"
                placeholder="name@example.com"
                value={emailValue}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                name="Password"
                className="flex outline-none px-4 rounded-lg text-white bg-primary-700 flex items-center justify-center justify-center text-base py-3 mt-2"
                placeholder="Password"
                value={passwordValue}
                onChange={handlePasswordChange}
              />
            </>
          )}
          <LoginButtonComponent type="submit" />
        </div>
      </form>
    </>
  );
};
