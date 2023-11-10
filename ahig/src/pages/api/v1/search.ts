import { NextApiRequest, NextApiResponse } from "next";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      res.status(401).send("");
      resolve();
      return;
      const bearerToken = req.cookies["bearerToken"];
      const text = req.query["text"];

      const body = JSON.stringify({
        EntityRequests: [
          {
            Query: { QueryString: text, DisplayQueryString: text },
            EntityType: "People",
            Provenances: ["Mailbox", "Directory"],
            From: 0,
            Size: 5,
            Filter: {
              And: [
                {
                  Or: [
                    { Term: { PeopleType: "Person" } },
                    { Term: { PeopleType: "Other" } },
                  ],
                },
                {
                  Or: [
                    { Term: { PeopleSubtype: "OrganizationUser" } },
                    { Term: { PeopleSubtype: "Guest" } },
                  ],
                },
              ],
            },
            Fields: [
              "Id",
              "DisplayName",
              "EmailAddresses",
              "CompanyName",
              "JobTitle",
              "ImAddress",
              "UserPrincipalName",
              "ExternalDirectoryObjectId",
              "PeopleType",
              "PeopleSubtype",
              "ConcatenatedId",
              "Phones",
              "MRI",
            ],
          },
          { Query: { QueryString: text }, EntityType: "File", Size: 3 },
        ],
        Cvid: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        AppName: "Microsoft Teams",
        Scenario: { Name: "powerbar" },
      });

      let response = await fetch(
        "https://substrate.office.com/search/api/v1/suggestions?scenario=powerbar",
        {
          headers: {
            accept: "application/json; odata.metadata=none",
            "accept-language": "en-US,en;q=0.9",
            authorization: bearerToken, //not working
            "content-type": "application/json",
          },
          body: body,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      console.log(response.status)
      await response.json()
      delete response.body["Instrumentation"]
      res.status(200).send(response.body)
    } catch (error) {
      console.log(error)
      res.status(500).send("");
      resolve();
    }
  });
};

export default main;
