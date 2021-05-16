import { AvatarComponent } from "./AvatarComponent";
import { useQueryClient } from "react-query";
import { useStore } from "../../modules/hooks/stores/useStore";

export let UserCardComponent: React.FC = () => {
  let queryClient = useQueryClient();
  let store = useStore();
  let user = queryClient.getQueryData("me");

  if (store.state.ui.centerMaximized || user === undefined) {
    return null;
  }

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto"
      style={{ marginTop: "68px" }}
    >
      <div className="flex justify-between items-end mb-5 max-w-md">
        <div
          className="flex flex-col rounded-8 bg-primary-800 w-full"
          style={{ padding: "16px" }}
        >
          <div className="flex">
            <div className="flex">
              <div
                className="relative inline-block"
                style={{ width: "80px", height: "80px" }}
              >
                <AvatarComponent src={queryClient.getQueryData("me")["pfp"]} />
              </div>
            </div>
            <div className="flex mt-2">
              <div className="flex flex-col ml-3">
                <span className="text-primary-100 font-bold overflow-hidden break-all text-left">
                  {user["name"].split(" (")[0]}
                </span>
                <span className="text-primary-300 text-left break-all">
                  {"@" + user["email"].split("@")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
