import { NextRequest, NextResponse } from "next/server";
import jsonwebtoken from "@tsndr/cloudflare-worker-jwt";
import { apiVersion } from "../../../modules/lib/fetcher";

const urlWhitelist = [
  `/api/${apiVersion}/refreshJWT`,
  `/api/${apiVersion}/auth`,
];

export const middleware = async (req: NextRequest) => {
  if (urlWhitelist.includes(req.url)) {
    return NextResponse.next();
  }

  const jsonwtoken = req.cookies["token"];
  let authed = false;

  try {
    while (true) {
      if (jsonwtoken.length < 1) {
        authed = false;
        break;
      }
      jsonwebtoken.verify(jsonwtoken, process.env.JWT_SECRET);
      authed = true;
      break;
    }
  } catch (error) {
    authed = false;
  }

  if (authed) {
    return NextResponse.next();
  } else {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }
};
