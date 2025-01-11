"use client";

import { SelectBox } from "@/src/components/common/SelectBox";
import { SearchInput } from "@/src/components/common/SearchInput";
import styles from "@/src/styles/ProductList.module.css";

interface FilterData {
  towns1: Array<{ sigunguName: string }>;
  towns2: Array<{ townIdx: number; townName: string }>;
  categories: Array<{ categorySeq: number; categoryName: string }>;
}

interface ProductFiltersProps {
  filterData: FilterData;
  selectedTown1: string;
  selectedTown2: number | null;
  selectedCategory: string | null;
  searchKeyword: string;
  onTown1Change: (value: string) => void;
  onTown2Change: (value: number | 0) => void;
  onCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filterData,
  selectedTown1,
  selectedTown2,
  selectedCategory,
  searchKeyword,
  onTown1Change,
  onTown2Change,
  onCategoryChange,
  onSearchChange,
}) => {
  const town1Options = Array.isArray(filterData.towns1)
    ? filterData.towns1.map((town) => ({
        value: town.sigunguName,
        label: town.sigunguName,
      }))
    : [];

  const town2Options = Array.isArray(filterData.towns2)
    ? filterData.towns2.map((town) => ({
        value: town.townIdx.toString(),
        label: town.townName,
      }))
    : [];

  const categoryOptions = Array.isArray(filterData.categories)
    ? filterData.categories.map((category) => ({
        value: category.categorySeq,
        label: category.categoryName,
      }))
    : [];

  return (
    <div className={styles["select-input-container"]}>
      <div className={styles["select-box-container"]}>
        <SelectBox
          options={town1Options}
          value={selectedTown1}
          onChange={onTown1Change}
          placeholder="지역 선택"
        />
        <SelectBox
          options={town2Options}
          value={selectedTown2}
          onChange={(value) => onTown2Change(Number(value))}
          placeholder="동네 선택"
          disabled={!selectedTown1}
        />
        <SelectBox
          options={categoryOptions}
          value={selectedCategory || ""}
          onChange={onCategoryChange}
          placeholder="카테고리 선택"
        />
      </div>
      <SearchInput value={searchKeyword} onChange={onSearchChange} />
    </div>
  );
};
