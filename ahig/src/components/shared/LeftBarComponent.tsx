import React from "react";
import { LinkComponent } from ".";
import { useStore } from "../../modules/hooks/stores/useStore";

export let LeftBarComponent: React.FC = () => {
  let store = useStore();

  if (store.state.ui.centerMaximized) {
    return (
      <div className="flex pt-5 flex-col flex-1 sticky top-0 h-screen overflow-x-hidden">
        <div className="flex mb-7 h-6 items-center">
          <LinkComponent href="/dash" className="text-accent">
            <h4>BT</h4>
          </LinkComponent>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex pt-5 flex-col flex-1 sticky top-0 h-screen">
        <div className="flex mb-7 h-6 items-center">
          <LinkComponent href="/dash" className="text-accent">
            <h4>BetterTeams</h4>
          </LinkComponent>
        </div>
        <div className="pb-5 w-full flex flex-col flex-1 overflow-y-auto">
          <h4 className="text-primary-100">People</h4>
          <h6 className="text-primary-300 mt-3 text-sm font-bold uppercase">
            ONLINE
          </h6>
        </div>
      </div>
    );
  }
};
