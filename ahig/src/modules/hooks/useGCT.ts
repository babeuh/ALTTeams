import { useQuery } from "react-query";
import { apiVersion } from "../lib/fetcher";

export let useGCT = () => {
  let { data: GCT } = useQuery("GCT", fetchGCT);
  return GCT;
};

export let fetchGCT = async () => {
  let r = await fetch(`/api/${apiVersion}/gct`);
  let json = await r.json();
  return json;
};
