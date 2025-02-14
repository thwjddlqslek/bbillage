"use client";
import styles from "@/src/styles/ProductList.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "검색어를 입력해 주세요.",
  className = styles.search,
}: SearchInputProps) => {
  return (
    <>
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
