import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { HeadComponent } from "../../../components/shared/HeadComponent";
import { SearchBarComponent } from "../../../components/shared/SearchBarComponent";
import { LeftBarComponent } from "../../../components/shared/LeftBarComponent";
import { RightBarComponent } from "../../../components/shared/RightBarComponent";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { useUser } from "../../hooks/useUser";
import { useStore } from "../../hooks/stores/useStore";
import { MessageListComponent } from "../../../components/teams/MessageListComponent";
import { MessageInputComponent } from "../../../components/shared/MessageInputComponent";
import { isServer } from "../../lib/isServer";
import { TitlebarComponent } from "../../../components/shared/TitlebarComponent";
import { useTauri } from "../../hooks/useTauri";

export const DashPage: React.FC = () => {
  const loggedIn = useLoggedIn({ redirect: true, loggedOutLink: "/" });
  useTauri()
  const user = useUser();
  const store = useStore();
  const router = useRouter();

  const routerId = router.query.id;
  const routerTitle = router.query.title;

  useEffect(() => {
    if (!loggedIn || user === undefined || isServer) return;
  }, [loggedIn, user]);

  useEffect(() => {
    if (store.state.copnd.id === "" || store.state.copnd.title === "Dashboard")
      return;
    router.query.id = store.state.copnd.id;
    router.query.title = store.state.copnd.title;
    router.push(
      {
        pathname: "/dash",
        query: router.query,
      },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.state.copnd.id, store.state.copnd.title]);

  useEffect(() => {
    if (routerId === undefined || routerTitle === undefined) return;
    const id = routerId.toString();
    const title = routerTitle.toString();
    if (store.state.copnd.id !== id) {
      store.setState({
        ...store.state,
        copnd: { title: title, id: id },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerId]);

  if (!loggedIn) return <HeadComponent title="Dashboard" />;

  return (
    <>
      <HeadComponent title={store.state.copnd.title} />
      <div className="w-full">
        <TitlebarComponent/>
        <div
          className="flex flex-col items-center w-full box-border scrollbar-thin scrollbar-thumb-primary-700 sticky"
          style={{
            height: "calc(100% - 30px)",
          }}
        >
          <div
            style={{
              display: "grid",
              columnGap: "60px",
              gridTemplateColumns: "300px 1fr 300px",
              width: "calc(100% - 120px)",
              overflowX: "clip",
            }}
          >
            {(() => {
              let id: string;
              if (routerId === undefined) {
                id = "";
              } else {
                id = routerId.toString();
              }
              return <LeftBarComponent id={id} />;
            })()}
            <div className="flex flex-col flex-1 w-full">
              <div
                className="flex sticky w-full flex-col bg-primary-900 pt-5"
                style={{ top: "0px" }}
              >
                <SearchBarComponent />
              </div>
              {(() => {
                if (store.state.copnd.id !== "") {
                  return (
                    <>
                      <MessageListComponent teamId={store.state.copnd.id} />
                      <div
                        className="flex sticky w-full flex-col bg-primary-900 pt-3"
                        style={{ bottom: "0" }}
                      >
                        <MessageInputComponent />
                      </div>
                    </>
                  );
                }
              })()}
            </div>
            <RightBarComponent />
          </div>
        </div>
      </div>
    </>
  );
};
