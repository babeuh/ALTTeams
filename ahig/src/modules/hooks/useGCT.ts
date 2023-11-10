import { useQuery } from "react-query";
import { apiVersion } from "../lib/fetcher";

export const useGCT = () => {
  const { data: GCT } = useQuery("GCT", fetchGCT, {refetchInterval: 30000, staleTime: 30000});
  return GCT;
};

const fetchGCT = async () => {
  const response = await fetch(`/api/${apiVersion}/gct`);
  const json = await response.json();
  return json;
};
