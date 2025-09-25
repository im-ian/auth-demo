"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/header";
import { Heading, Text } from "../components/texts";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("User data parsing error:", error);
        localStorage.removeItem("user");
        setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-8 p-8">
          <Heading className="mb-2 text-blue-700" level="h1">
            메인 페이지
          </Heading>
          <div className="text-md md:text-lg text-gray-600">
            {user ? (
              <Text>로그인에 성공했습니다!</Text>
            ) : (
              <Text>로그인하여 더 많은 기능을 이용해보세요.</Text>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
