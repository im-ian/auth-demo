import Input from "../inputs/Input";
import Select from "../inputs/Select";
import { FadeIn } from "../animations";
import type { Step2Props } from "./types";

const genderOptions = [
  { value: "", label: "성별을 선택하세요", disabled: true },
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
  { value: "other", label: "기타" },
];

const MAX_DATE = new Date().toISOString().split("T")[0];

const Step2 = ({ formData, onInputChange, errors }: Step2Props) => {
  return (
    <div className="space-y-6">
      <FadeIn condition={true}>
        <Input
          label="생년월일"
          name="birthDate"
          type="date"
          max={MAX_DATE}
          value={formData.birthDate}
          onChange={onInputChange}
          error={errors?.birthDate}
          required
        />
      </FadeIn>

      <FadeIn condition={!!formData.birthDate}>
        <Select
          label="성별"
          name="gender"
          value={formData.gender}
          onChange={onInputChange}
          options={genderOptions}
          error={errors?.gender}
          required
        />
      </FadeIn>

      <FadeIn condition={!!formData.gender}>
        <Input
          label="주소"
          name="address"
          type="text"
          value={formData.address}
          onChange={onInputChange}
          placeholder="주소를 입력하세요"
          error={errors?.address}
        />
      </FadeIn>
    </div>
  );
};

export default Step2;
