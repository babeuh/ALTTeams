import React from "react";
import { useEffect, useState } from "react";
import { useStore } from "../../modules/hooks/stores/useStore";
import { useGCT } from "../../modules/hooks/useGCT";
import { TeamCardComponent } from "./TeamCardComponent";

interface TeamsListComponentProps {
  id: string;
}

export const TeamsListComponent: React.FC<TeamsListComponentProps> = ({ id }) => {
  const [teamsArray, setTeamsArray] = useState([]);
  const GCT = useGCT();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (GCT === undefined) return;
      let array = [];
      GCT["teams"].forEach((team: any) => {
        array.push(team);
      });
      if (id !== "") {
        store.setState({
          ...store.state,
          copnd: { title: array.find((x) => x.id === id).displayName, id: id },
        });
      } else {
        store.setState({
          ...store.state,
          copnd: { title: array[0].displayName, id: array[0].id },
        });
      }
      setTeamsArray(array);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GCT, id]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col space-y-4">
        {teamsArray.map((team) => {
          return (
            <TeamCardComponent
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
