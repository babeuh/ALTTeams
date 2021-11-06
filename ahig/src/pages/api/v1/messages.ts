import { NextApiRequest, NextApiResponse } from "next";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      if (!req.query["teamId"]){
        res.status(400).send("");
        return;
      }
      const teamId = req.query["teamId"]
      const authorization = req.cookies["bearerToken"];
      const response = await fetch(
        `https://teams.microsoft.com/api/csa/api/v2/teams/${teamId}/channels/${teamId}?filterSystemMessage=true&pageSize=20`,
        {
          headers: {
            accept: "json",
            authorization: authorization,
          },
          method: "GET",
        }
      );
      const json = await response.json();
      res.status(200).send(json);
      resolve();
    } catch (err) {
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;