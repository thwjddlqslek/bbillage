"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";

interface Town {
  sigunguName: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  rentalSeq: number;
  title: string;
  content: string;
  dailyRentalFee: number;
  imageUrl: string;
  towns: string[];
  regDate: number;
  likeCnt: number;
  viewCnt: number;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [towns1, setTowns1] = useState<Town[]>([]);
  const [towns2, setTowns2] = useState<Town[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTown1, setSelectedTown1] = useState("");
  const [selectedTown2, setSelectedTown2] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTowns1 = async () => {
    try {
      const response = await fetch("/api/noauth/getTowns1");
      const result = await response.json();
      console.log("Towns1 성공:", result);
      return result.data?.list || [];
    } catch (error) {
      console.error("Towns1 에러:", error);
      return [];
    }
  };

  const fetchTowns2 = async (area: string) => {
    try {
      const response = await fetch(`/api/noauth/getTowns2?sigunguName=${area}`);
      const result = await response.json();
      console.log("Towns2 성공:", result);
      return result.data?.list || [];
    } catch (error) {
      console.error("Towns2 에러:", error);
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/getCategory");
      const result = await response.json();
      console.log("Categories 성공:", result);
      return result.data?.list || [];
    } catch (error) {
      console.error("Categories 에러:", error);
      return [];
    }
  };

  const fetchProducts = async (params: {
    keyword?: string;
    towns?: string | null;
  }) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        status: "0",
        filter: "0",
        categories: "0",
        page: "0",
        size: "20",
        signIn: "0",
        ...(params.keyword && { keyword: params.keyword }),
        ...(params.towns && { towns: params.towns }),
      });

      const response = await fetch(`/api/noauth/getMainList?${queryParams}`);
      const result = await response.json();
      console.log("Products 응답:", result);
      return result.data?.rentals || [];
    } catch (error) {
      console.error("Products 에러:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [townsData, categoriesData] = await Promise.all([
          fetchTowns1(),
          fetchCategories(),
        ]);
        setTowns1(townsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("에러1", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedTown1) {
      const fetchTowns2Data = async () => {
        const data = await fetchTowns2(selectedTown1);
        setTowns2(data);
      };
      fetchTowns2Data();
    } else {
      setTowns2([]);
    }
  }, [selectedTown1]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await fetchProducts({
        keyword: searchKeyword,
        towns: selectedTown2,
      });
      setProducts(data);
    };
    fetchProductsData();
  }, [searchKeyword, selectedTown2]);

  return (
    <div>
      <div>
        <div>
          <select
            value={selectedTown1}
            onChange={(e) => setSelectedTown1(e.target.value)}
          >
            <option value="">지역 선택</option>
            {Array.isArray(towns1) &&
              towns1.map((town, index) => (
                <option key={index} value={town.sigunguName}>
                  {town.sigunguName}
                </option>
              ))}
          </select>

          <select
            value={selectedTown2 || ""}
            onChange={(e) => setSelectedTown2(e.target.value || null)}
            disabled={!selectedTown1}
          >
            <option value="">동네 선택</option>
            {Array.isArray(towns2) &&
              towns2.map((town, index) => (
                <option key={index} value={town.sigunguName}>
                  {town.sigunguName}
                </option>
              ))}
          </select>

          <select defaultValue="">
            <option value="">카테고리 선택</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.rentalSeq}>
                <h3>{product.title}</h3>
                <p>가격: {product.dailyRentalFee.toLocaleString()}원</p>
                <p>내용: {product.content}</p>
                <p>좋아요: {product.likeCnt}</p>
                <p>조회수: {product.viewCnt}</p>
                <p>지역: {product.towns.join(", ")}</p>
              </div>
            ))
          ) : (
            <div>상품이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
