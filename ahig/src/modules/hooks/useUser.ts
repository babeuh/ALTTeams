import { useQuery } from "react-query";
import { apiVersion } from "../lib/fetcher";

export const useUser = () => {
  const { data: me } = useQuery("me", fetchUser, {
    refetchOnWindowFocus: false,
  });
  return me;
};

const fetchUser = async () => {
  const response = await fetch(`/api/${apiVersion}/me`);
  const me = await response.json();
  const pfp = `/api/${apiVersion}/pfp?id=${me["id"]}`;

  return { ...me, pfp };
};
