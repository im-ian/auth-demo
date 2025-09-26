import { z } from "zod";

export const step1Schema = z
  .object({
    id: z
      .string()
      .min(1, "아이디를 입력해주세요.")
      .min(3, "아이디는 3자 이상이어야 합니다.")
      .max(20, "아이디는 20자 이하여야 합니다.")
      .regex(/^[a-zA-Z0-9_]+$/, "아이디는 영문, 숫자, _만 사용 가능합니다."),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .max(50, "비밀번호는 50자 이하여야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호 재확인을 입력해주세요."),
    email: z.email("올바른 이메일 형식을 입력해주세요."),
    phone: z
      .string()
      .min(1, "전화번호를 입력해주세요.")
      .regex(
        /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
        "올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const step2Schema = z.object({
  birthDate: z
    .string()
    .min(1, "생년월일을 선택해주세요.")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 14;
    }, "14세 이상만 가입 가능합니다."),
  gender: z.string().min(1, "성별을 선택해주세요."),
  address: z.string().optional(),
});

export const signupSchema = step1Schema.safeExtend(step2Schema.shape);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type SignupFormData = z.infer<typeof signupSchema>;
