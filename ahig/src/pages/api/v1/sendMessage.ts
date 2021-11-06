import { NextApiRequest, NextApiResponse } from "next";

interface jsonBody {
  content: string;
  messagetype: string;
  contenttype: string;
  imdisplayname: string;
}

const jsonBodyProperties = [
  "content",
  "messagetype",
  "contenttype",
  "imdisplayname",
];

const checkBody = (jsonBody: jsonBody) => {
  let ok = true;
  jsonBodyProperties.forEach((property) => {
    if (jsonBody[property] === undefined) {
      ok = false;
    }
  });
  return ok;
};

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("");
        resolve();
        return;
      }
      if (!req.query["teamId"]){
        res.status(400).send("");
        return;
      }

      const authentication = req.cookies["accessToken"];

      let jsonBody: jsonBody;
      try {
        jsonBody = JSON.parse(req.body);
        if (checkBody(jsonBody) === false) {
          throw new Error("Expected Error");
        }
      } catch (error) {
        res.status(400).send("");
        resolve();
        return;
      }

      const response = await fetch(
        `https://emea.ng.msg.teams.microsoft.com/v1/users/ME/conversations/${req.query["teamId"]}/messages`,
        {
          headers: {
            accept: "json",
            "accept-language": "en-US,en;q=0.9",
            authentication: authentication,
            "content-type": "application/json",
          },
          body: JSON.stringify(jsonBody),
          method: "POST",
          mode: "cors",
        }
      );

      res.status(response.status).send("");
      resolve();

    } catch (error) {
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;