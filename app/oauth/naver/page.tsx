"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heading, Text } from "../../../components/texts";
import { CheckIcon } from "../../../components/icons";
import { FadeIn } from "../../../components/animations";
import Button from "../../../components/buttons/Button";
import { Spacer } from "../../../components/layouts";
import { useAuth } from "../../../contexts/AuthContext";
import { findUserBySnsId } from "../../../lib/demo";
import { useTimer } from "../../../hooks";

export default function NaverOAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateSnsConnection, login } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      // if opened in new tab, redirect to main page
      router.push("/");
    }
  };

  const { timeLeft, start: startTimer } = useTimer({
    initialTime: 5,
    onComplete: handleClose,
  });

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setMessage("네이버 로그인에 실패했습니다.");
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("인증 코드를 받지 못했습니다.");
          return;
        }

        // get access token and user profile
        const response = await fetch(
          `/api/auth/naver/callback?code=${encodeURIComponent(
            code
          )}&state=${encodeURIComponent(state || "")}`,
          { method: "GET" }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("OAuth callback failed:", errorText);
          setStatus("error");
          setMessage("네이버 계정 연결에 실패했습니다.");
          return;
        }

        const result = await response.json();

        if (result.success) {
          console.log("네이버 프로필 정보:", result.profile);

          if (result.profile?.response?.id) {
            const snsId = result.profile.response.id;

            const existingUser = findUserBySnsId("naver", snsId);

            if (existingUser) {
              login(existingUser);
              handleClose();
            } else {
              updateSnsConnection("naver", snsId);
              setStatus("success");
              setMessage("네이버 계정이 연결되었습니다!");

              startTimer();
            }
          }
        } else {
          setStatus("error");
          setMessage("네이버 계정 연결에 실패했습니다.");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("error");
        setMessage("연결 중 오류가 발생했습니다.");
      }
    };

    handleOAuthCallback();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-spin">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <Heading className="text-blue-600" level="h2">
              네이버 계정 연결 중...
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckIcon
                  className="text-green-600"
                  name="success"
                  size="lg"
                />
              </div>
              <Heading className="text-green-600" level="h2">
                연결 완료!
              </Heading>
              <Text className="text-gray-600" size="md">
                {message}
              </Text>
              <Text className="text-gray-500" size="sm">
                이 화면은 {timeLeft}초 후 자동으로 닫힙니다.
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
