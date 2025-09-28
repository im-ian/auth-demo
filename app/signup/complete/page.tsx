"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../components/buttons/Button";
import { Heading, Text } from "../../../components/texts";
import { NaverIcon, KakaoIcon, CheckIcon } from "../../../components/icons";
import { FadeIn } from "../../../components/animations";
import { Spacer } from "../../../components/layouts";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignupCompletePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [connectedSns, setConnectedSns] = useState({
    naver: false,
    kakao: false,
  });

  // receive message from OAuth popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (
        event.data.type === "NAVER_OAUTH_SUCCESS" &&
        event.data.status === "success"
      ) {
        setConnectedSns((prev) => ({ ...prev, naver: true }));
        if (event.data.profile?.response?.id) {
          updateSnsConnection("naver", event.data.profile.response.id);
        }
      }

      if (
        event.data.type === "KAKAO_OAUTH_SUCCESS" &&
        event.data.status === "success"
      ) {
        setConnectedSns((prev) => ({ ...prev, kakao: true }));
        if (event.data.profile?.id) {
          updateSnsConnection("kakao", event.data.profile.id.toString());
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleNaverConnect = () => {
    window.open("/api/auth/naver/login", "_blank");
  };

  const handleKakaoConnect = () => {
    window.open("/api/auth/kakao/login", "_blank");
  };

  const handleComplete = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-8">
        <FadeIn condition={true}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckIcon className="text-green-600" name="complete" size="lg" />
            </div>
            <Heading className="text-green-600" level="h1">
              회원가입 완료!
            </Heading>
            <Text className="text-gray-600" size="md">
              환영합니다! 회원가입이 성공적으로 완료되었습니다.
            </Text>
          </div>
        </FadeIn>

        <FadeIn condition={true} delay={300}>
          <div className="text-center space-y-4">
            <Text className="text-gray-600" size="md">
              SNS 계정을 연결하여 더 편리하게 이용할 수 있어요.
            </Text>
            <Text className="text-gray-400" size="sm">
              나중에 마이페이지에서도 연동할 수 있어요. (미구현)
            </Text>
          </div>
        </FadeIn>

        <FadeIn condition={true} delay={600}>
          <Spacer size="md" />

          <div className="space-y-4">
            <Button
              className="w-full"
              variant={connectedSns.naver ? "secondary" : "outline"}
              size="sm"
              onClick={connectedSns.naver ? undefined : handleNaverConnect}
              disabled={connectedSns.naver}
            >
              <div className="flex items-center gap-3 p-2">
                <NaverIcon name="naver" size="sm" />
                {connectedSns.naver ? "네이버 계정 연결됨" : "네이버 계정 연결"}
              </div>
            </Button>

            <Button
              className="w-full"
              variant={connectedSns.kakao ? "secondary" : "outline"}
              size="sm"
              onClick={connectedSns.kakao ? undefined : handleKakaoConnect}
              disabled={connectedSns.kakao}
            >
              <div className="flex items-center gap-3 p-2">
                <KakaoIcon name="kakao" size="sm" />
                {connectedSns.kakao ? "카카오 계정 연결됨" : "카카오 계정 연결"}
              </div>
            </Button>
          </div>
        </FadeIn>

        <FadeIn condition={true} delay={connectedSns.naver ? 1200 : 900}>
          <Spacer size="md" />

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleComplete}
            className="w-full"
          >
            회원가입 완료
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
