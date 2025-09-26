"use client";

import { useRouter } from "next/navigation";
import { Header } from "../components/header";
import { Heading, Text } from "../components/texts";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogin={handleLogin} onLogout={handleLogout} />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-8 p-8">
          <Heading className="mb-2 text-blue-700" level="h1">
            메인 페이지
          </Heading>
          <div className="text-md md:text-lg text-gray-600">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Text>안녕하세요, {user?.name || user?.email}님!</Text>
                {(user?.naverId || user?.kakaoId) && (
                  <div className="text-sm text-gray-500">
                    연결된 계정:{" "}
                    {[user.naverId && "네이버", user.kakaoId && "카카오"]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}
              </div>
            ) : (
              <Text>로그인하여 더 많은 기능을 이용해보세요.</Text>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
