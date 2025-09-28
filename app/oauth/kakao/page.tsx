"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heading, Text } from "../../../components/texts";
import { CheckIcon } from "../../../components/icons";
import { FadeIn } from "../../../components/animations";
import Button from "../../../components/buttons/Button";
import { Spacer } from "../../../components/layouts";
import { useAuth } from "../../../contexts/AuthContext";

export default function KakaoOAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateSnsConnection } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setMessage("카카오 로그인에 실패했습니다.");
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("인증 코드를 받지 못했습니다.");
          return;
        }

        // get access token and user profile
        const response = await fetch(
          `/api/auth/kakao/callback?code=${encodeURIComponent(
            code
          )}&state=${encodeURIComponent(state || "")}`,
          { method: "GET" }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("OAuth callback failed:", errorText);
          setStatus("error");
          setMessage("카카오 계정 연결에 실패했습니다.");
          return;
        }

        const result = await response.json();

        if (result.success) {
          console.log("카카오 프로필 정보:", result.profile);
          setStatus("success");
          setMessage("카카오 계정이 연결되었습니다!");

          // AuthContext를 통해 SNS 연결 업데이트
          if (result.profile?.id) {
            updateSnsConnection("kakao", result.profile.id);
          }
        } else {
          setStatus("error");
          setMessage("카카오 계정 연결에 실패했습니다.");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("error");
        setMessage("연결 중 오류가 발생했습니다.");
      }
    };

    handleOAuthCallback();
  }, [searchParams]);

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      // if opened in new tab, redirect to main page
      router.push("/");
    }
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto animate-spin">
              <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full"></div>
            </div>
            <Heading className="text-yellow-600" level="h2">
              카카오 계정 연결 중...
            </Heading>
            <Text className="text-gray-600" size="md">
              잠시만 기다려주세요.
            </Text>
          </div>
        );

      case "success":
        return (
          <div className="space-y-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <CheckIcon
                  className="text-yellow-600"
                  name="success"
                  size="lg"
                />
              </div>
              <Heading className="text-yellow-600" level="h2">
                연결 완료!
              </Heading>
              <Text className="text-gray-600" size="md">
                {message}
              </Text>
            </div>

            <Spacer size="md" />
            <Button
              variant="primary"
              size="md"
              onClick={handleClose}
              className="w-full"
            >
              완료
            </Button>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 text-red-600 text-2xl">✕</div>
            </div>
            <Heading className="text-red-600" level="h2">
              연결 실패
            </Heading>
            <Text className="text-gray-600" size="md">
              {message}
            </Text>
            <Spacer size="md" />
            <Button
              variant="outline"
              size="md"
              onClick={handleClose}
              className="w-full"
            >
              닫기
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-8">
        <FadeIn condition={true}>{renderContent()}</FadeIn>
      </div>
    </div>
  );
}
