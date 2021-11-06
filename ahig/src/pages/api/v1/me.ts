import { NextApiRequest, NextApiResponse } from "next";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      const authentication = req.cookies["accessToken"];
      const response = await fetch(
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
      const json = await response.json();
      const userDetails = JSON.parse(json["userDetails"]);
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

export default main;