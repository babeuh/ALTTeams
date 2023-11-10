import { NextApiRequest, NextApiResponse } from "next";
import request from "request";
import { generateJWT, generateRefreshToken } from "../../../modules/jwt";

interface UserCredentials {
  email: string;
  password: string;
}

interface LoginObject {
  email: string;
  password: string;
  ctx: any;
  flowToken: any;
}

interface CookieObject {
  name: string;
  value: string;
}

interface AccessTokenObject {
  skypeToken: string;
  expirationTime: number;
  expiresIn: number;
}

interface BearerTokenObject {
  bearerToken: string;
  expirationTime: number;
  expiresIn: number;
}

const fetchLoginObject = (userCredentials: UserCredentials) => {
  return new Promise<LoginObject>(async (resolve, reject) => {
    const response = await fetch("https://login.microsoftonline.com");
    if (response.status !== 200) {
      reject(new Error("Unauthorized"));
      return;
    }
    const body = await response.text();
    const json = JSON.parse(
      body.split("//<![CDATA[")[1].split("//]]")[0].slice(9).trim().slice(0, -1)
    );

    const loginObject: LoginObject = {
      email: userCredentials.email,
      password: userCredentials.password,
      ctx: json.sCtx,
      flowToken: json.sFT,
    };

    resolve(loginObject);
  });
};

const fetchLoginReq = (loginObject: LoginObject) => {
  return new Promise<CookieObject[]>((resolve, reject) => {
    const form = {
      login: loginObject.email,
      loginfmt: loginObject.email,
      passwd: loginObject.password,
      ctx: loginObject.ctx,
      flowToken: loginObject.flowToken,
    };
    const loginReq = request({
      method: "POST",
      url: "https://login.microsoftonline.com/common/login",
      headers: {
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
        "content-type": "application/x-www-form-urlencoded",
        Referer:
          "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        Cookie: "AADSSO=NA|NoExtension;",
      },
      form: form,
    });
    loginReq.on("response", (response) => {
      if (response.statusCode !== 200) {
        reject(new Error("Unexpected Error"));
      }
      const cookies: CookieObject[] = [];
      response.headers["set-cookie"].forEach((cookie) => {
        if (!cookie.startsWith("ESTS")) {
          return;
        } else {
          const raw = cookie.split(";")[0];
          const split = raw.split("=");
          cookies.push({ name: split[0], value: split[1] });
        }
      });
      if (cookies.length < 1) {
        reject(new Error("Unauthorized"));
      }
      resolve(cookies);
    });
  });
};

const fetchBearerTokenObject = (estsauthCookie: CookieObject) => {
  return new Promise<BearerTokenObject>((resolve, reject) => {
    var options: request.RequiredUriUrl & request.CoreOptions = {
      method: "GET",
      url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=token&scope=https%3A%2F%2Fteams.microsoft.com%2F.default%20openid%20profile&client_id=5e3ce6c0-2b1f-4285-8d4b-75ee78787346",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
        Cookie: "AADSSO=NA|NoExtension; ESTSAUTH=" + estsauthCookie.value,
      },
      followRedirect: false,
    };
    request(options, (error: string, response: request.Response) => {
      if (error) reject(new Error(error));
      if (response.statusCode !== 302 || !response.headers.location) {
        reject(new Error("Unauthorized"));
      }

      resolve({
        bearerToken: response.headers.location.split("=")[1].split("&")[0],
        expirationTime:
          Math.floor(Date.now() / 1000) +
          Number(response.headers.location.split("=")[3].split("&")[0]) *
            (10 ^ 6),
        expiresIn:
          Number(response.headers.location.split("=")[3].split("&")[0]) *
          (10 ^ 6),
      });
    });
  });
};

const fetchSkypeTokenObject = (bearerToken: string) => {
  return new Promise<AccessTokenObject>(async (resolve, reject) => {
    const response = await fetch(
      "https://teams.microsoft.com/api/authsvc/v1.0/authz",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          authorization: "Bearer " + bearerToken,
          "ms-teams-authz-type": "TokenRefresh",
        },
        body: null,
        method: "POST",
      }
    );
    if (response.status !== 200) {
      reject(new Error("Unauthorized"));
    } else {
      let obj = (await response.json())["tokens"];
      delete obj.tokenType;
      obj.expirationTime = Math.floor(Date.now() / 1000) + obj.expiresIn;
      resolve(obj);
    }
  });
};

// Main Function
const main = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>(async (resolve) => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("");
        resolve();
        return;
      }
      //Define user credentials
      let userCredentials: UserCredentials;

      try {
        //Parse Body
        const json = JSON.parse(req.body);
        if (!json.email || !json.password) {
          throw new Error("Unauthorized");
        } else {
          userCredentials = { email: json.email, password: json.password };
        }
      } catch (error) {
        res.status(401).send("");
        resolve();
        return;
      }

      //Fetch loginObject
      const loginObject = await fetchLoginObject(userCredentials);

      //Fetch cookies
      const cookies = await fetchLoginReq(loginObject);

      //Fetch bearerToken
      const bearerTokenObject = await fetchBearerTokenObject(
        cookies.find((c) => c.name === "ESTSAUTH")
      );

      //Fetch skypetoken / accessToken
      const accessTokenObject = await fetchSkypeTokenObject(
        bearerTokenObject.bearerToken
      );

      const jwt = generateJWT(bearerTokenObject, accessTokenObject);
      const refreshToken = generateRefreshToken(userCredentials, bearerTokenObject, accessTokenObject);

      //Return Tokens
      res.status(200).send({jwt,refreshToken});
      resolve();
    } catch (error) {
      console.log(error)
      const parsed = error.toString().split("Error: ")[1];

      if (parsed === "Unauthorized") {
        res.status(401).send("");
        resolve();
      } else {
        res.status(500).send("");
        resolve();
      }
    }
  });
};

export default main;
