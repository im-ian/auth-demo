"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../components/buttons/Button";
import { Heading, Text } from "../../../components/texts";
import { NaverIcon, KakaoIcon, CheckIcon } from "../../../components/icons";
import { FadeIn } from "../../../components/animations";
import { Spacer } from "../../../components/layouts";

export default function SignupCompletePage() {
  const router = useRouter();
  const [connectedSns, setConnectedSns] = useState({
    naver: false,
    kakao: false,
  });

  const handleSnsConnect = (sns: "naver" | "kakao") => {
    setConnectedSns((prev) => ({
      ...prev,
      [sns]: !prev[sns],
    }));
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const handleComplete = () => {
    console.log("SNS 연결 상태:", connectedSns);
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
              나중에 마이페이지에서도 연동할 수 있어요.
            </Text>
          </div>
        </FadeIn>

        <FadeIn condition={true} delay={600}>
          <Spacer size="md" />

          <div className="space-y-4">
            <Button
              className="w-full"
              variant="outline"
              size="sm"
              onClick={() => handleSnsConnect("naver")}
            >
              <div className="flex items-center gap-3 p-2">
                <NaverIcon name="naver" size="sm" />
                네이버 계정 연결
              </div>
            </Button>

            <Button
              className="w-full"
              variant="outline"
              size="sm"
              onClick={() => handleSnsConnect("kakao")}
            >
              <div className="flex items-center gap-3 p-2">
                <KakaoIcon name="kakao" size="sm" />
                카카오 계정 연결
              </div>
            </Button>
          </div>
        </FadeIn>

        <FadeIn condition={true} delay={900}>
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
