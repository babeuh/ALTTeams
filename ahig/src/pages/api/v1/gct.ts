import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      if (!req.cookies["bearerToken"]) {
        res.status(401).send("");
        return;
      }
      let authorization = req.cookies["bearerToken"];
      let r = await fetch(
        "https://teams.microsoft.com/api/csa/api/v1/teams/users/me?isPrefetch=false&enableMembershipSummary=true",
        {
          headers: {
            accept: "json",
            authorization: authorization,
          },
          referrer: "https://teams.microsoft.com/_",
          method: "GET",
          mode: "cors",
        }
      );
      let json = await r.json();
      res.status(200).send(json);
      resolve();
    } catch (err) {
      res.status(500).send("");
      resolve();
    }
  });
};
