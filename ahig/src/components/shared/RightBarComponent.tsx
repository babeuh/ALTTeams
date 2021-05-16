import React from "react";
import { useQueryClient } from "react-query";
import { useStore } from "../../modules/hooks/stores/useStore";
import { AvatarComponent, UserCardComponent } from ".";

export let RightBarComponent: React.FC = () => {
  let store = useStore();
  let client = useQueryClient();
  let user = client.getQueryData("me");

  let changeCenterMax = () => {
    store.setState({
      ...store.state,
      ui: { centerMaximized: !store.state.ui.centerMaximized },
    });
  };
  if (user === undefined) {
    return null;
  }

  return (
    <div className="flex pt-5 flex-col flex-1 sticky top-0 h-screen overflow-x-hidden">
      <div className="flex mb-7 h-6 items-center">
        <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
          <button
            className="flex focus:outline-no-chrome"
            onClick={() => changeCenterMax()}
          >
            <div
              className="relative inline-block focus:outline-no-chrome"
              style={{ width: "40px", height: "40px" }}
            >
              <AvatarComponent src={user["pfp"]} />
            </div>
          </button>
        </div>
      </div>
      <UserCardComponent />
    </div>
  );
};
