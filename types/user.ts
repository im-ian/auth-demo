export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  naverId: string | null;
  kakaoId: number | null;
}

export interface UserWithPassword extends User {
  password: string;
}

export type SnsProvider = "naver" | "kakao";
