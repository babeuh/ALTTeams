import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      let r = await fetch(
        "https://teams.microsoft.com/api/authsvc/v1.0/authz",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            authorization: req.headers.authorization,
            "ms-teams-authz-type": "TokenRefresh",
          },
          referrer: "https://teams.microsoft.com/_",
          body: null,
          method: "POST",
        }
      );
      if (!r.ok) {
        res.status(401).send("");
        return;
      }
      res.status(200).send((await r.json())["tokens"]);
      resolve();
      return;
    } catch (error) {
      res.status(500).send("");
      resolve();
    }
  });
};
