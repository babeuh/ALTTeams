import React from "react";

interface MessageComponentProps {
  username: string;
  content: string;
  type: string;
}

export const MessageComponent: React.FC<MessageComponentProps> = ({
  username,
  content,
  type,
}) => {
  return (
    <div style={{maxWidth: "calc(100vw - 840px)"}} className="flex flex-col w-full p-4 rounded-lg bg-primary-800 hover:bg-primary-700">
      <div className="flex justify-between w-full space-x-4">
        <div className="flex text-primary-100 font-bold leading-5 truncate w-full">
          <span className="inline truncate">{username}</span>
        </div>
      </div>
      <div className="w-full mt-2 flex text-primary-100">
        {(() => {
          if (type === "RichText/Html") {
            content = content.replaceAll(".asm.skype.com/v1/objects/", "")
            return <div dangerouslySetInnerHTML={{ __html: content }} />;
          } else {
            return content;
          }
        })()}
      </div>
    </div>
  );
};
