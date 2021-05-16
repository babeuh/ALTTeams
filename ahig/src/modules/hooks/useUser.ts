import { useQuery } from "react-query";
import { apiVersion } from "../lib/fetcher";

export let useUser = () => {
  const { data: me } = useQuery("me", fetchUser, {
    refetchOnWindowFocus: false,
  });
  return me;
};

export let fetchUser = async () => {
  let r = await fetch(`/api/${apiVersion}/me`);
  let me = await r.json();
  let pfp = `/api/${apiVersion}/pfp?id=${me["id"]}`;

  return { ...me, pfp };
};
