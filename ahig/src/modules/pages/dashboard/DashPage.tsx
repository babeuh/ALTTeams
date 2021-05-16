import React, { useEffect } from "react";
import {
  HeadComponent,
  SearchBarComponent,
  LeftBarComponent,
  RightBarComponent,
} from "../../../components/shared";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { useUser } from "../../hooks/useUser";
import { useStore } from "../../hooks/stores/useStore";
import { TeamsListComponent } from "./TeamsListComponent";

export let DashPage: React.FC = () => {
  const loggedIn = useLoggedIn({ redirect: true, loggedOutLink: "/" });
  const user = useUser();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (!loggedIn || user === undefined) return;
    })();
  }, [loggedIn, user]);
  if (!loggedIn) return <HeadComponent title="Dashboard" />;

  return (
    <>
      <HeadComponent title="Dashboard" />
      <div className="flex flex-col items-center w-full box-border scrollbar-thin scrollbar-thumb-primary-700">
        <div
          style={(() => {
            let d = { display: "grid", columnGap: "60px" };
            if (store.state.ui.centerMaximized) {
              return { ...d, gridTemplateColumns: "40px 1120px 40px" };
            } else {
              //old 235px 640px 325px
              //new 300px 600px 300px
              return { ...d, gridTemplateColumns: "300px 600px 300px" };
            }
          })()}
        >
          <LeftBarComponent />
          <div className="flex flex-col flex-1 w-full">
            <div
              className="flex sticky w-full flex-col z-50 bg-primary-900 pt-5"
              style={{ top: "0px" }}
            >
              <SearchBarComponent />
              <div
                className="flex justify-between items-end mb-5 ml-4"
                style={{ height: "38px" }}
              >
                <h4 className="text-primary-100">Your Teams</h4>
              </div>
            </div>
            <TeamsListComponent />
          </div>
          <RightBarComponent />
        </div>
      </div>
    </>
  );
};
