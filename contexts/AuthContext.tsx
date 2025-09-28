"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SnsProvider = "naver" | "kakao";

const SNS_KEY = {
  naver: "naverId",
  kakao: "kakaoId",
};

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  naverId: string | null;
  kakaoId: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateSnsConnection: (provider: SnsProvider, id: string) => void;
  removeSnsConnection: (provider: SnsProvider) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // 로컬 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // 사용자 정보를 로컬 스토리지에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateSnsConnection = (provider: SnsProvider, id: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      [SNS_KEY[provider]]: id,
    };

    setUser(updatedUser);
  };

  const removeSnsConnection = (provider: SnsProvider) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      [SNS_KEY[provider]]: undefined,
    };

    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateSnsConnection,
    removeSnsConnection,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
