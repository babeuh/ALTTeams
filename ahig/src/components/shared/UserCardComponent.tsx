import { AvatarComponent } from "./AvatarComponent";
import { useQueryClient } from "react-query";

export const UserCardComponent: React.FC = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("me");

  if (user === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-y-auto mb-3">
      <h4 className="text-primary-100 mb-3">You</h4>
      <div className="flex justify-between items-end max-w-md">
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
                <span className="text-primary-200 text-left break-all">
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
