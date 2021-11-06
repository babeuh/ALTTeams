import { NextApiRequest, NextApiResponse } from "next";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      const authorization = req.cookies["bearerToken"];
      const response = await fetch(
        "https://teams.microsoft.com/api/csa/api/v1/teams/users/me?isPrefetch=false&enableMembershipSummary=true",
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