import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { getWixServerClient } from "@/lib/wix-client.server";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");
  const error_description = req.nextUrl.searchParams.get("error_description");

  if (error) {
    return new Response(error_description, { status: 400 });
  }

  const oAuthData: OauthData = JSON.parse(
    cookies().get(WIX_OAUTH_DATA_COOKIE)?.value || "{}",
  );

  if (!code || !state || !oAuthData) {
    return new Response("Invalid request", { status: 400 });
  }

  const wixClient = getWixServerClient();

  const memberTokens = await wixClient.auth.getMemberTokens(
    code,
    state,
    oAuthData,
  );

  // After 14 days without accessing the app, user will be automatically kicked out and will have to log in again
  // If user accesses the app within 14 days, the token will be renew.
  cookies().delete(WIX_OAUTH_DATA_COOKIE);
  cookies().set(WIX_SESSION_COOKIE, JSON.stringify(memberTokens), {
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: oAuthData.originalUri || "/",
    },
  });
}
