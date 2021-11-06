import { useQuery } from "react-query";
import { apiVersion } from "../lib/fetcher";

export const useMessages = (teamId: string) => {
  const { data: messages } = useQuery(["messages", teamId], () =>
    fetchMessages(teamId)
  );
  return messages;
};

const fetchMessages = async (teamId: string) => {
  const response = await fetch(`/api/${apiVersion}/messages?teamId=${teamId}`);
  const json = await response.json();
  return json;
};
