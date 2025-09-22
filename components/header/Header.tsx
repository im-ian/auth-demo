import { HeaderProps } from "./types";
import Button from "../buttons/Button";

export default function Header({ user, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Auth Demo</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  안녕하세요, {user.username}님!
                </span>
                <Button variant="secondary" size="sm" onClick={onLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={onLogin}>
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
