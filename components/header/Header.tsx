import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../buttons/Button";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Auth Demo</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Button variant="secondary" size="sm" onClick={logout}>
                로그아웃
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
