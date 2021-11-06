import React from "react";
import { UserCardComponent } from "./UserCardComponent";

export const RightBarComponent: React.FC = () => {
  return (
    <div
      className="pt-5 sticky top-0 h-screen overflow-x-hidden"
      style={{
        display: "grid",
        gridTemplateRows: "1fr 173px",
        gap: "25px 00px",
      }}
    >
      <div className="w-full flex flex-col overflow-y-auto mb-3">
        <h4 className="text-primary-100">People</h4>
        <h6 className="text-primary-200 mt-3 text-sm font-bold uppercase">
          ONLINE
        </h6>
      </div>
      <UserCardComponent />
    </div>
  );
};
