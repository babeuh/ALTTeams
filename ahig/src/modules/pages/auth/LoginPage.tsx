import { useRouter } from "next/router";
import React, { useState } from "react";
import { HeadComponent } from "../../../components/shared/HeadComponent";
import { GridComponent } from "../../../components/shared/GridComponent";
import { LinkComponent } from "../../../components/shared/LinkComponent";
import { FooterComponent } from "../../../components/shared/FooterComponent";
import { useTokenStore } from "../../hooks/stores/useTokenStore";
import { useStore } from "../../hooks/stores/useStore";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { LoginButtonComponent } from "./LoginButtonComponent";
import { LoginComponent } from "./LoginComponent";
import { authenticate } from "./authenticate";
import { TitlebarComponent } from "../../../components/shared/TitlebarComponent";
import { useTauri } from "../../hooks/useTauri";
import { useTauriStore } from "../../hooks/stores/useTauriStore";

export const LoginPage: React.FC = () => {
  const loggedIn = useLoggedIn({ redirect: true, loggedInLink: "/dash" });
  useTauri()
  const [loginPressed, setLoginPressed] = useState(false);
  const router = useRouter();
  const store = useStore();
  const tauriStore = useTauriStore()
  const token_store = useTokenStore();

  const handleLoginClick = async () => {
    if (!loggedIn) {
      setLoginPressed(true);
    }
  };

  return (
    <>
      <HeadComponent title="Login" />
      <GridComponent
        className={tauriStore.state.is ? "grid-3-tauri" : "grid-3"}
      >
        <TitlebarComponent/>
        <div className="hidden sm:flex" />
        <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
          <div className="flex gap-2 flex-col">
            <span className="text-3xl text-primary-100 font-bold">Welcome</span>
            <div className="text-primary-100 flex-wrap">
              By logging in you accept our&nbsp;
              <LinkComponent href="/privacy-policy">
                Privacy Policy
              </LinkComponent>
              &nbsp;and&nbsp;
              <LinkComponent href="/tos">Terms of Service</LinkComponent>.
            </div>
          </div>
          {loginPressed ? (
            <LoginComponent
              handleSubmit={async (userCredentials) => {
                if (
                  (await authenticate(userCredentials, store, token_store)).bool
                ) {
                  router.push("/dash");
                }
              }}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <LoginButtonComponent onClick={handleLoginClick} />
            </div>
          )}
        </div>
        <FooterComponent />
      </GridComponent>
    </>
  );
};
