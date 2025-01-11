"use client";

import { useState, useEffect } from "react";
import { ProductFilters } from "@/src/components/product/ProductFilters";
import { ProductList } from "@/src/components/product/ProductList";
import { Product, Category, Town1, Town2 } from "@/src/types/lend";
import { productService } from "@/src/services/lend";
import { ProductListFilters } from "@/src/types/lend";
import styles from "@/src/styles/ProductList.module.css";

interface FilterData {
  towns1: Town1[];
  towns2: Town2[];
  categories: Category[];
}

export const ProductListContainer: React.FC<ProductListFilters> = ({
  initialProducts,
  initialCategories,
  initialTowns1,
}) => {
  const [filterData, setFilterData] = useState<FilterData>({
    towns1: initialTowns1 || [],
    towns2: [],
    categories: initialCategories || [],
  });
  const [selectedTown1, setSelectedTown1] = useState("");
  const [selectedTown2, setSelectedTown2] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  const fetchFilteredProducts = async (currentPage: number) => {
    setIsLoading(true);
    if (
      currentPage === 0 &&
      !selectedCategory &&
      !searchKeyword &&
      !selectedTown2
    ) {
      setProducts(initialProducts || []);
      setHasMore(initialProducts?.length === 20);
      setIsLoading(false);
      return;
    }
    try {
      const productsData = await productService.getProducts({
        categories: selectedCategory,
        keyword: searchKeyword,
        towns: selectedTown2?.toString(),
        size: "20",
        page: currentPage.toString(),
      });
      if (currentPage === 0) {
        setProducts(productsData);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.rentalSeq));
          const uniqueNewProducts = productsData.filter(
            (p) => !existingIds.has(p.rentalSeq)
          );
          return [...prev, ...uniqueNewProducts];
        });
      }
      setHasMore(productsData.length === 20);
    } catch (error) {
      console.error("fetchFilteredProducts error:", error);
      setProducts([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(0);
    fetchFilteredProducts(0);
  }, [selectedTown2, selectedCategory, searchKeyword]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => {
        fetchFilteredProducts(prev + 1);
        return prev + 1;
      });
    }
  };

  return (
    <div className={styles["product-wrap"]}>
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
      <ProductList
        products={products}
        isLoading={isLoading}
        onLoad={handleLoadMore}
        hasMore={hasMore}
      />
    </div>
  );
};
