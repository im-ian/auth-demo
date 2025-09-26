import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const clientId = process.env.NAVER_OAUTH_CLIENT_ID;
  const redirectUri = process.env.NAVER_OAUTH_REDIRECT_URI;

  console.log({ clientId, redirectUri });

  if (!clientId || !redirectUri) {
    return new Response("NAVER OAuth env not configured", { status: 500 });
  }

  const state = Math.random().toString(36).substring(2, 15);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  });

  const authUrl = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;

  return Response.redirect(authUrl, 302);
}
