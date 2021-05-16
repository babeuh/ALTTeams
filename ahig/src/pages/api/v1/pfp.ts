import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      if (!req.cookies["bearerToken"]) {
        res.status(401).send("");
        return;
      }
      let bearer = req.cookies["bearerToken"];
      let id = req.query["id"];

      let url = `https://teams.microsoft.com/api/mt/part/emea-02/beta/users/${id}/profilepicturev2`;
      let cookie = `authtoken=Bearer=${
        bearer.split("Bearer ")[1]
      }&Origin=https://teams.microsoft.com;`;

      let r = await fetch(url, {
        method: "GET",
        headers: {
          referer: "https://teams.microsoft.com/_",
          "cache-control": "no-cache, no-store",
          Cookie: cookie,
        },
      });

      if (!r.ok) {
        res.status(401).send("");
        return;
      }
      /*let b64 = Buffer.from(await (await r.blob()).arrayBuffer()).toString(
        "base64"
      );
      res.status(200).send({ data: "data:image/jpeg;base64," + b64 });*/
      let buffer = Buffer.from(await (await r.blob()).arrayBuffer());
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
