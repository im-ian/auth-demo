// 데모용 사용자 관리 유틸리티입니다.

import { User, UserWithPassword } from "../types/user";

interface LoginResult {
  success: boolean;
  user?: User;
  message?: string;
}

interface RegisterResult {
  success: boolean;
  message?: string;
}

const USER_LIST_STORAGE_KEY = "userList";

// 사용자 목록 가져오기
export const getUserList = (): UserWithPassword[] => {
  try {
    const userList = localStorage.getItem(USER_LIST_STORAGE_KEY);
    return userList ? JSON.parse(userList) : [];
  } catch (error) {
    console.error("Failed to get user list:", error);
    return [];
  }
};

// 사용자 목록 저장하기
export const saveUserList = (userList: UserWithPassword[]): void => {
  try {
    localStorage.setItem(USER_LIST_STORAGE_KEY, JSON.stringify(userList));
  } catch (error) {
    console.error("Failed to save user list:", error);
  }
};

// 로그인 검증
export const validateLogin = (id: string, password: string): LoginResult => {
  try {
    const userList = getUserList();
    const foundUser = userList.find((user: UserWithPassword) => user.id === id);

    if (!foundUser) {
      return { success: false, message: "일치하는 사용자를 찾을 수 없습니다." };
    }

    if (foundUser.password !== password) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = foundUser;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error("Login validation error:", error);
    return { success: false, message: "로그인 중 오류가 발생했습니다." };
  }
};

// 사용자 등록
export const registerUser = (
  userData: Omit<User, "naverId" | "kakaoId"> & { password: string }
): RegisterResult => {
  try {
    const userList = getUserList();

    // 중복 ID 체크
    const existingUser = userList.find(
      (user: UserWithPassword) => user.id === userData.id
    );
    if (existingUser) {
      return { success: false, message: "이미 존재하는 사용자 ID입니다." };
    }

    // 새 사용자 추가
    const newUser: UserWithPassword = {
      ...userData,
      naverId: null,
      kakaoId: null,
    };

    const updatedUserList = [...userList, newUser];
    saveUserList(updatedUserList);

    return { success: true, message: "회원가입이 완료되었습니다." };
  } catch (error) {
    console.error("User registration error:", error);
    return { success: false, message: "회원가입 중 오류가 발생했습니다." };
  }
};

// 사용자 정보 업데이트 (SNS 연결 등)
export const updateUser = (userId: string, updates: Partial<User>): boolean => {
  try {
    const userList = getUserList();
    const userIndex = userList.findIndex(
      (user: UserWithPassword) => user.id === userId
    );

    if (userIndex === -1) {
      console.error("User not found:", userId);
      return false;
    }

    userList[userIndex] = { ...userList[userIndex], ...updates };
    saveUserList(userList);

    return true;
  } catch (error) {
    console.error("Failed to update user:", error);
    return false;
  }
};

// 사용자 삭제
export const deleteUser = (userId: string): boolean => {
  try {
    const userList = getUserList();
    const filteredList = userList.filter(
      (user: UserWithPassword) => user.id !== userId
    );

    if (filteredList.length === userList.length) {
      console.error("User not found:", userId);
      return false;
    }

    saveUserList(filteredList);
    return true;
  } catch (error) {
    console.error("Failed to delete user:", error);
    return false;
  }
};

// 데모용 초기 사용자 데이터 생성
export const createDemoUsers = (): void => {
  const existingUsers = getUserList();
  if (existingUsers.length > 0) {
    return; // 이미 사용자가 있으면 생성하지 않음
  }

  const demoUsers: UserWithPassword[] = [
    {
      id: "demo",
      name: "데모 사용자",
      email: "demo@example.com",
      password: "1234",
      naverId: null,
      kakaoId: null,
    },
    {
      id: "test",
      name: "테스트 사용자",
      email: "test@example.com",
      password: "test123",
      naverId: null,
      kakaoId: null,
    },
  ];

  saveUserList(demoUsers);
  console.log("Demo users created:", demoUsers);
};
