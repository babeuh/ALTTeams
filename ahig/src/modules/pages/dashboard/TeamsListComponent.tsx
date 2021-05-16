import React from "react";
import { useEffect, useState } from "react";
import { useGCT } from "../../hooks/useGCT";
import { TeamsButtonComponent } from "./TeamsButtonComponent";

export let TeamsListComponent: React.FC = () => {
  let [teamsArray, setTeamsArray] = useState([]);
  let GCT = useGCT();

  useEffect(() => {
    (async () => {
      if (GCT === undefined) return;
      let array = [];
      GCT["teams"].forEach((team: any) => {
        array.push(team);
      });
      setTeamsArray(array);
    })();
  }, [GCT]);

  return (
    <div className="flex flex-1 flex-col mb-7">
      <div className="flex flex-col space-y-4">
        {teamsArray.map((team) => {
          if (team.displayName.includes("S1")) {
            return;
          }
          return (
            <TeamsButtonComponent
              key={teamsArray.indexOf(team)}
              name={team.displayName}
              description={team.description}
              members={
                team.membershipSummary.totalMemberCount -
                team.membershipSummary.botCount
              }
              id={team.id}
            />
          );
        })}
      </div>
    </div>
  );
};
