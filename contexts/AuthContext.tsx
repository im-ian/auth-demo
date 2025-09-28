"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createDemoUsers, updateUser } from "../lib/demo";
import { User, SnsProvider } from "../types/user";

const SNS_PROVIDER_KEY = {
  naver: "naverId",
  kakao: "kakaoId",
};

const USER_UPDATE_EVENT = "user_update_event";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateSnsConnection: (provider: SnsProvider, id: string | number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // 데모용 초기 사용자 생성
  useEffect(() => {
    createDemoUsers();
  }, []);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse saved user data:", error);
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }
    };

    loadUserFromStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        loadUserFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleCustomStorageChange = () => {
      loadUserFromStorage();
    };

    window.addEventListener(USER_UPDATE_EVENT, handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(USER_UPDATE_EVENT, handleCustomStorageChange);
    };
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

    window.dispatchEvent(new Event(USER_UPDATE_EVENT));
  };

  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);

    window.dispatchEvent(new Event(USER_UPDATE_EVENT));
  };

  const updateSnsConnection = (provider: SnsProvider, id: string | number) => {
    // SNS 연결은 새로운 창이나 팝업에서 진행되기 때문에 context가 업데이트 되어 있지 않고,
    // context와 localStorage를 sync해주고 있기 때문에 localStorage에서 사용자 정보를 가져옴.
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      console.error("No user found in localStorage");
      return;
    }

    try {
      const currentUser = JSON.parse(savedUser);
      const updatedUser = {
        ...currentUser,
        [SNS_PROVIDER_KEY[provider]]: id,
      };

      // localStorage의 user 키 업데이트
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // userList에서도 해당 사용자 정보 업데이트
      const updateSuccess = updateUser(currentUser.id, {
        [SNS_PROVIDER_KEY[provider]]: id,
      });

      if (!updateSuccess) {
        console.error("Failed to update user in userList");
      }

      if (user) {
        setUser(updatedUser);
      }

      window.dispatchEvent(new Event(USER_UPDATE_EVENT));
    } catch (error) {
      console.error(error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateSnsConnection,
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
