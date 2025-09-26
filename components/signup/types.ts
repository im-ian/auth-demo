export type Step1Data = {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
};

export type Step2Data = {
  birthDate: string;
  gender: string;
  address: string;
};

export type SignupFormData = Step1Data & Step2Data;

export interface Step1Props {
  formData: Step1Data;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Partial<Record<keyof Step1Data, string>>;
}

export interface Step2Props {
  formData: Step2Data;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors?: Partial<Record<keyof Step2Data, string>>;
}
