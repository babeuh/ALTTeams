export let jsonFetcher = async (url: string, headers: {}) => {
  const res = await fetch(url, { headers });
  return res.json();
};
export let imageFetcher = async (url: string, headers: {}) => {
  const res = await fetch(url, { headers });
  const ab = await res.arrayBuffer();
  return "data:image/jpeg;base64," + Buffer.from(ab).toString("base64");
};

export let apiVersion = "v1";
