import { NextRequest, NextResponse } from "next/server";
import { apiVersion } from "../../../modules/lib/fetcher";

const urlWhitelist = [
  `/api/${apiVersion}/refreshST`,
  `/api/${apiVersion}/auth`,
];

const validateTokens = async (bearerToken: string, skypeToken: string) => {
  if (
    bearerToken.startsWith("Bearer ") &&
    skypeToken.startsWith("skypetoken=")
  ) {
    return true;
  } else {
    return false;
  }
};

export const middleware = async (req: NextRequest) => {
  try {
    if (urlWhitelist.includes(req.url)) {
      return NextResponse.next();
    }

    const bearerToken = req.cookies["bearerToken"];
    const skypeToken = req.cookies["accessToken"];
    const isLoggedIn = await validateTokens(bearerToken, skypeToken);

    if (isLoggedIn) {
      return NextResponse.next();
    } else {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
  } catch (error) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }
};
