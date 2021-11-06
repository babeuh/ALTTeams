import React from "react";
import _ from "lodash";
import { useEffect, useState, useRef } from "react";
import { useMessages } from "../../modules/hooks/useMessages";
import { MessageComponent } from "./MessageComponent";

interface MessageListComponentProps {
  teamId: string;
}

export const MessageListComponent: React.FC<MessageListComponentProps> = ({
  teamId,
}) => {
  const [messagesArray, setMessagesArray] = useState([]);
  const messages = useMessages(teamId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (messages === undefined) return;
      let array = [];
      messages["replyChains"].forEach((replyChain: any) => {
        replyChain.messages.forEach((message: any) => {
          if (message.content === null || message.content === "") return;
          array.push(message);
        });
      });

      const sorterFunc = (item) => item.sequenceId;
      array = _.sortBy(array, [sorterFunc]).sort();
      setMessagesArray(array);
    })();
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messagesArray]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col space-y-4">
        {messagesArray.map((message) => {
          return (
            <MessageComponent
              key={messagesArray.indexOf(message)}
              username={message.imDisplayName}
              content={message.content}
              type={message.messageType}
            />
          );
        })}
        <div
          style={{ height: 0, width: 0, marginTop: 0 }}
          ref={messagesEndRef}
        />
      </div>
    </div>
  );
};
