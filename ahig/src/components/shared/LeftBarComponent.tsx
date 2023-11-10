import React from "react";
import { useTauriStore } from "../../modules/hooks/stores/useTauriStore";
import { TeamsListComponent } from "../teams/TeamsListComponent";

interface LeftBarComponentProps {
  id: string;
}

export const LeftBarComponent: React.FC<LeftBarComponentProps> = ({ id }) => {
  const tauriStore = useTauriStore();
  return (
    <div
      className="flex pt-5 flex-col flex-1 sticky top-0"
      style={tauriStore.state.is ? {height: "calc(100vh - 30px)"} : {height: "100vh"}}
    >
      <div
        className="flex justify-between items-end mb-5"
        style={{ height: "38px" }}
      >
        <h4 className="text-primary-100">Your Teams</h4>
      </div>

      <div className="pb-3 w-full flex flex-col flex-1 overflow-y-auto">
        <TeamsListComponent id={id} />
      </div>
    </div>
  );
};
