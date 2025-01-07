"use client";

import { useState, useEffect } from "react";
import { ProductFilters } from "@/src/components/product/ProductFilters";
import { ProductList } from "@/src/components/product/ProductList";
import { Product, Category, Town1, Town2 } from "@/src/types/lend";

export const ProductListContainer: React.FC = () => {
  interface FilterData {
    towns1: Town1[];
    towns2: Town2[];
    categories: Category[];
  }

  const [filterData, setFilterData] = useState<FilterData>({
    towns1: [],
    towns2: [],
    categories: [],
  });
  const [selectedTown1, setSelectedTown1] = useState("");
  const [selectedTown2, setSelectedTown2] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchInitialData = async () => {
      const [towns1Response, categoriesResponse] = await Promise.all([
        fetch("/api/noauth/getTowns1"),
        fetch("/api/getCategory"),
      ]);

      const towns1Data = await towns1Response.json();
      const categoriesData = await categoriesResponse.json();

      setFilterData((prev) => ({
        ...prev,
        towns1: towns1Data.data.list || [],
        categories: categoriesData.data.categoryList || [],
      }));
    };
    fetchInitialData();
  }, []);

  // town2 데이터 로딩
  useEffect(() => {
    if (selectedTown1) {
      const fetchTowns2Data = async () => {
        const data = await Promise.all([
          fetch(`/api/noauth/getTowns2?sigunguName=${selectedTown1}`),
        ]);
        const towns2Data = await data[0].json();
        setFilterData((prev) => ({
          ...prev,
          towns2: towns2Data.data.list || [],
        }));
      };
      fetchTowns2Data();
    } else {
      setFilterData((prev) => ({
        ...prev,
        towns2: [],
      }));
    }
  }, [selectedTown1]);

  // 상품 데이터 로딩
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          status: "0",
          filter: "0",
          page: "0",
          size: "20",
          signIn: "0",
        });

        if (searchKeyword) params.append("keyword", searchKeyword);
        if (selectedTown2) params.append("towns", selectedTown2.toString());
        if (selectedCategory) params.append("categories", selectedCategory);

        const response = await fetch(`/api/noauth/getMainList?${params}`);
        const result = await response.json();
        setProducts(result.data?.rentals || []);
      } catch (error) {
        console.error("getMainList error:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchKeyword, selectedTown2, selectedCategory]);

  return (
    <div>
      <ProductFilters
        filterData={filterData}
        selectedTown1={selectedTown1}
        selectedTown2={selectedTown2}
        selectedCategory={selectedCategory}
        searchKeyword={searchKeyword}
        onTown1Change={setSelectedTown1}
        onTown2Change={setSelectedTown2}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchKeyword}
      />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};
