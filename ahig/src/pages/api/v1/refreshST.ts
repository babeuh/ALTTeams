import { NextApiRequest, NextApiResponse } from "next";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      const response = await fetch(
        "https://teams.microsoft.com/api/authsvc/v1.0/authz",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            authorization: req.headers.authorization,
            "ms-teams-authz-type": "TokenRefresh",
          },
          body: null,
          method: "POST",
        }
      );
      if (!response.ok) {
        res.status(401).send("");
        return;
      }
      res.status(200).send((await response.json())["tokens"]);
      resolve();
      return;
    } catch (error) {
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;