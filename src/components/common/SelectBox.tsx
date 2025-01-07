"use client";
import styles from "@/src/styles/Product.module.css";

interface SelectOption {
  value: string | number;
  label: string | number;
}

interface SelectBoxProps {
  options: SelectOption[];
  value: string | number | null;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export const SelectBox = ({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}: SelectBoxProps) => {
  return (
    <select
      className={styles["select-box"]}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
