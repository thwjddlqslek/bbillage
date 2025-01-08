"use client";

import { useState, useEffect } from "react";
import { ProductFilters } from "@/src/components/product/ProductFilters";
import { ProductList } from "@/src/components/product/ProductList";
import { Product, Category, Town1, Town2 } from "@/src/types/lend";
import { productService } from "@/src/services/lend";

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
        productService.getTowns1(),
        productService.getCategories(),
      ]);

      setFilterData((prev) => ({
        ...prev,
        towns1: towns1Response || [],
        categories: categoriesResponse || [],
      }));
    };
    fetchInitialData();
  }, []);

  // town2 데이터 로딩
  useEffect(() => {
    if (selectedTown1) {
      const fetchTowns2Data = async () => {
        try {
          const towns2Response = await productService.getTowns2(selectedTown1);
          setFilterData((prev) => ({
            ...prev,
            towns2: towns2Response || [],
          }));
        } catch (error) {
          console.log("fetchTowns2Data error:", error);
          setFilterData((prev) => ({
            ...prev,
            towns2: [],
          }));
        }
      };
      fetchTowns2Data();
    } else {
    }
  }, [selectedTown1]);

  // 상품 데이터 로딩
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        // productService의 getProducts 메서드 활용
        const productsData = await productService.getProducts({
          categories: selectedCategory,
          keyword: searchKeyword,
          towns: selectedTown2?.toString(),
        });
        setProducts(productsData);
      } catch (error) {
        console.error("fetchFilteredProducts error:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilteredProducts();
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
