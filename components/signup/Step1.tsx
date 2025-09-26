import Input from "../inputs/Input";
import { FadeIn } from "../animations";
import type { Step1Props } from "./types";

const Step1 = ({ formData, onInputChange, errors }: Step1Props) => {
  return (
    <div className="space-y-6">
      <FadeIn condition={true}>
        <Input
          label="아이디"
          name="id"
          type="text"
          value={formData.id}
          onChange={onInputChange}
          placeholder="아이디를 입력하세요"
          error={errors?.id}
          required
        />
      </FadeIn>

      <FadeIn condition={formData.id.length >= 3}>
        <Input
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={onInputChange}
          placeholder="비밀번호를 입력하세요 (6자 이상)"
          error={errors?.password}
          required
        />
      </FadeIn>

      <FadeIn condition={formData.password.length >= 6}>
        <Input
          label="비밀번호 재확인"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={onInputChange}
          placeholder="비밀번호를 다시 입력하세요"
          error={errors?.confirmPassword}
          required
        />
      </FadeIn>

      <FadeIn
        condition={
          formData.password === formData.confirmPassword &&
          formData.confirmPassword.length >= 6
        }
      >
        <Input
          label="이메일"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="이메일을 입력하세요"
          error={errors?.email}
          required
        />
      </FadeIn>

      <FadeIn condition={formData.email.includes("@")}>
        <Input
          label="전화번호"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
          error={errors?.phone}
          required
        />
      </FadeIn>
    </div>
  );
};

export default Step1;
