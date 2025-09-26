"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/buttons/Button";
import { Heading, Text } from "../../components/texts";
import { Step1, Step2 } from "../../components/signup";
import type { SignupFormData } from "../../components/signup";
import { step1Schema, step2Schema } from "../../components/signup/schemas";
import { Stepper } from "../../components/disclosures";
import { useAuth } from "../../contexts/AuthContext";

const MAX_STEP = 2;

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();

  const [formData, setFormData] = useState<SignupFormData>({
    // Step 1
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    // Step 2
    birthDate: "",
    gender: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  const validateStep1 = () => {
    try {
      step1Schema.parse({
        id: formData.id,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        email: formData.email,
        phone: formData.phone,
      });
      setErrors({});
      return true;
    } catch (error: any) {
      console.log("Zod validation error:", error);
      console.log("Error issues:", error.issues);

      const fieldErrors: Record<string, string> = {};
      if (error.issues && error.issues.length > 0) {
        error.issues.forEach((issue: any) => {
          const fieldName = issue.path[0];
          fieldErrors[fieldName] = issue.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const validateStep2 = () => {
    try {
      step2Schema.parse({
        birthDate: formData.birthDate,
        gender: formData.gender,
        address: formData.address,
      });
      setErrors({});
      return true;
    } catch (error: any) {
      console.log("Zod validation error:", error);
      console.log("Error issues:", error.issues);

      const fieldErrors: Record<string, string> = {};
      if (error.issues && error.issues.length > 0) {
        error.issues.forEach((issue: any) => {
          const fieldName = issue.path[0];
          fieldErrors[fieldName] = issue.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleNext = () => {
    setErrors({});

    if (currentStep === 1 && !validateStep1()) {
      return;
    }

    if (currentStep === 2 && !validateStep2()) {
      return;
    }

    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    setErrors({});

    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("회원가입 데이터:", formData);

      login({
        id: formData.id,
        name: formData.id,
        email: formData.email,
      });
      setLoading(false);

      router.push("/signup/complete");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="text-center space-y-2">
          <Heading className="text-blue-700" level="h1">
            회원가입
          </Heading>
          <Text className="text-gray-400" size="sm">
            {currentStep === 1 && "회원가입에 필요한 기본 정보를 입력해주세요."}
            {currentStep === 2 && "추가 정보를 입력해주세요"}
          </Text>
        </div>

        <Stepper currentStep={currentStep} totalSteps={2} />

        <div className="min-h-[400px]">
          {(() => {
            switch (currentStep) {
              case 1:
                return (
                  <Step1
                    formData={{
                      id: formData.id,
                      password: formData.password,
                      confirmPassword: formData.confirmPassword,
                      email: formData.email,
                      phone: formData.phone,
                    }}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
                );
              case 2:
                return (
                  <Step2
                    formData={{
                      birthDate: formData.birthDate,
                      gender: formData.gender,
                      address: formData.address,
                    }}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>

        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handlePrevious}
              className="flex-1"
            >
              이전
            </Button>
          )}

          {currentStep < MAX_STEP ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              className="flex-1"
            >
              다음
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              loading={loading}
              onClick={handleSubmit}
              className="flex-1"
            >
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
