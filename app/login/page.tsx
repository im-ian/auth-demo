"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { NaverIcon, KakaoIcon } from "../../components/icons";
import { Heading, Text } from "../../components/texts";
import Separator from "../../components/layouts/Separator";
import IconButton from "@/components/buttons/IconButton";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username || !formData.password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: formData.username })
      );
      setLoading(false);
      router.push("/");
    }, 1000);
  };

  const handleClickSignUp = () => {
    router.push("/signup");
  };

  const handleClickBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="text-center space-y-2">
          <Heading className="text-blue-700" level="h1">
            로그인
          </Heading>
          <Text className="text-gray-400" size="sm">
            계정에 로그인해 더 많은 기능을 이용해보세요.
          </Text>
        </div>

        <div className="flex justify-center gap-4 py-4">
          <IconButton icon={<NaverIcon name="naver" size="sm" />} />
          <IconButton icon={<KakaoIcon name="kakao" size="sm" />} />
        </div>

        <form onSubmit={handleClickLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <Text className="text-sm text-red-600">{error}</Text>
            </div>
          )}

          <Input
            label="이메일"
            name="email"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="이메일을 입력하세요"
            required
          />

          <Input
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력하세요"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full"
          >
            로그인
          </Button>
        </form>

        <Separator className="my-4" size="sm" />

        <div className="space-y-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleClickSignUp}
            className="w-full"
          >
            회원가입
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClickBackToHome}
            className="w-full"
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </div>
  );
}
