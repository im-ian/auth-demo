"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import { NaverIcon } from "../../components/icons";
import { Heading, Text } from "../../components/texts";

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

  const handleLogin = (e: React.FormEvent) => {
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

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <Heading className="mb-2" level="h1">
            로그인
          </Heading>
          <Text className="mb-8">계정에 로그인하세요</Text>
        </div>

        <div>
          <NaverIcon name="naver" color="brand" />
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <Text className="text-sm text-red-600">{error}</Text>
            </div>
          )}

          <Input
            label="아이디"
            name="username"
            type="text"
            value={formData.username}
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

          <div className="space-y-4">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full"
            >
              로그인
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={handleBackToHome}
              className="w-full"
            >
              뒤로가기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
