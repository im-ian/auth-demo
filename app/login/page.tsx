"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { NaverIcon, KakaoIcon } from "../../components/icons";
import { Heading, Link, Text } from "../../components/texts";
import Separator from "../../components/layouts/Separator";
import IconButton from "@/components/buttons/IconButton";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    id: "",
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

    if (!formData.id || !formData.password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ id: formData.id }));
      setLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="text-center space-y-2">
          <Heading className="text-blue-700" level="h1">
            로그인
          </Heading>
          <Text className="text-gray-400" size="sm">
            로그인하여 더 많은 기능을 이용해보세요.
          </Text>
        </div>

        <form onSubmit={handleClickLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <Text className="text-sm text-red-600">{error}</Text>
            </div>
          )}

          <Input
            label="아이디"
            name="id"
            type="text"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="아이디를 입력하세요"
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

          <div className="flex justify-center">
            <Link
              href="/signup"
              size="xs"
              className="w-full text-center text-gray-400"
            >
              아직 회원이 아니신가요?
            </Link>
          </div>
        </form>

        <Separator className="my-4" size="sm" text="또는" />

        <div className="flex flex-col justify-center gap-4 py-4">
          <Text className="text-gray-400 text-center" size="xs">
            소셜 계정으로 로그인으로 간편하게 시작해보세요.
          </Text>
          <div className="flex justify-center gap-4">
            <IconButton icon={<NaverIcon name="naver" size="sm" />} />
            <IconButton icon={<KakaoIcon name="kakao" size="sm" />} />
          </div>
        </div>
      </div>
    </div>
  );
}
