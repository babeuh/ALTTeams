import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      if (!req.cookies["accessToken"]) {
        res.status(401).send("");
        return;
      }
      let authentication = req.cookies["accessToken"];
      let r = await fetch(
        "https://emea.ng.msg.teams.microsoft.com/v1/users/ME/properties",
        {
          headers: {
            accept: "json",
            "accept-language": "en-US,en;q=0.9",
            authentication: authentication,
          },
          method: "GET",
        }
      );
      let json = await r.json();
      let userDetails = JSON.parse(json["userDetails"]);
      res.status(200).send({
        name: userDetails["name"],
        email: userDetails["upn"],
        id: "8:" + json["skypeName"],
      });
      resolve();
    } catch (err) {
      res.status(500).send("");
      resolve();
    }
  });
};
