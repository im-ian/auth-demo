import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state") ?? "";

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const clientId = process.env.KAKAO_OAUTH_CLIENT_ID;
  const clientSecret = process.env.KAKAO_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.KAKAO_OAUTH_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return new Response("KAKAO OAuth env not configured", { status: 500 });
  }

  try {
    // get access token
    const tokenParams = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    });

    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("Token exchange failed:", errorText);
      return new Response(`Token exchange failed: ${errorText}`, {
        status: 502,
      });
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return new Response("No access token received", { status: 502 });
    }

    // get user profile
    const profileRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!profileRes.ok) {
      const errorText = await profileRes.text();
      console.error("Profile fetch failed:", errorText);
      return new Response(`Profile fetch failed: ${errorText}`, {
        status: 502,
      });
    }

    const profileData = await profileRes.json();

    // return response
    return new Response(
      JSON.stringify({
        success: true,
        accessToken,
        profile: profileData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("OAuth callback error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
