import { NextApiRequest, NextApiResponse } from "next";
import { getTokensFromJWT } from "../../../modules/jwt";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      const bearerToken = getTokensFromJWT(req.cookies["token"]).bearerToken;
      const id = req.query["id"];

      const url = `https://teams.microsoft.com/api/mt/part/emea-02/beta/users/${id}/profilepicturev2`;
      const cookie = `authtoken=Bearer=${
        bearerToken.split("Bearer ")[1]
      }&Origin=https://teams.microsoft.com;`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          referer: "https://teams.microsoft.com/_",
          "cache-control": "no-cache, no-store",
          Cookie: cookie,
        },
      });

      if (!response.ok) {
        res.status(401).send("");
        return;
      }
      const buffer = Buffer.from(await (await response.blob()).arrayBuffer());
      res.setHeader("Content-Type", "image/jpeg");
      res.write(buffer);
      res.end();
      resolve();
    } catch (error) {
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;