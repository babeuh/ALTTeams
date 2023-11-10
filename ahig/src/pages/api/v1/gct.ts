import { NextApiRequest, NextApiResponse } from "next";
import { getTokensFromJWT } from "../../../modules/jwt";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      const bearerToken = getTokensFromJWT(req.cookies["token"]).bearerToken;
      const response = await fetch(
        "https://teams.microsoft.com/api/csa/api/v1/teams/users/me?isPrefetch=false&enableMembershipSummary=true",
        {
          headers: {
            accept: "json",
            authorization: bearerToken,
          },
          method: "GET",
        }
      );
      const text = await response.text();
      if (text === "User is not authorized.") {
        res.status(401).send("");
        resolve()
        return;
      }
      res.status(200).send(text);
      resolve();
    } catch (err) {
      console.log(err)
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;
