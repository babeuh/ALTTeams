import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useStore } from "../../modules/hooks/stores/useStore";

interface User {
  email: string;
  id: string;
  name: string;
  pfp: string;
}

export const MessageInputComponent: React.FC = () => {
  const [text, changeText] = useState("");
  const queryClient = useQueryClient();
  const store = useStore();
  const user: User = queryClient.getQueryData("me");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    changeText("");
    fetch(`/api/v1/sendMessage?teamId=${store.state.copnd.id}`, {
      method: "POST",
      body: JSON.stringify({
        content: text,
        imdisplayname: user.name,
        messagetype: "Text",
        contenttype: "text",
      }),
    }).then(() => {
      setTimeout(() => {
        queryClient.refetchQueries(["messages", store.state.copnd.id]);
      }, 1000);
    });
    e.preventDefault();
  };

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <div className="flex mb-3 items-center">
        <div className="flex flex-1 justify-center w-full">
          <div className="relative w-full z-10 flex flex-col">
            <div className="items-center w-full flex bg-primary-700 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg">
              <form className="w-full" onSubmit={handleSubmit}>
                <input
                  className="py-2 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none bg-primary-700"
                  style={{
                    marginLeft: "20px",
                    width: "calc(100% - 20px)",
                  }}
                  placeholder="Send a message"
                  onChange={handleTextChange}
                  value={text}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
