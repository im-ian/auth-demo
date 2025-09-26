import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const clientId = process.env.KAKAO_OAUTH_CLIENT_ID;
  const redirectUri = process.env.KAKAO_OAUTH_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return new Response("KAKAO OAuth env not configured", { status: 500 });
  }

  const state = Math.random().toString(36).substring(2, 15);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  });

  const authUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

  return Response.redirect(authUrl, 302);
}
