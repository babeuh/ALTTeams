import { NextApiRequest, NextApiResponse } from "next";
import { decodeRefreshToken } from "../../../modules/jwt";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      const creds = decodeRefreshToken(req.cookies["refreshToken"])
      const response = await fetch(`http://${req.headers.host}/api/v1/auth`, {
        method: "POST",
        body: JSON.stringify(creds),
      });

      const json = await response.json()
      
      res.status(200).send(json);
      resolve();
      return;
    } catch (error) {
      console.log(error)
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;