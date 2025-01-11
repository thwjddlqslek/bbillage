"use client";

import { Product } from "@/src/types/lend";
import { ProductCard } from "@/src/components/product/ProductCard";
import styles from "@/src/styles/ProductList.module.css";
import React, { useEffect } from "react";
interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onLoad: () => void;
  hasMore: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products = [],
  isLoading,
  onLoad,
  hasMore,
}) => {
  const observerTarget = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // endtries 요소가 화면에 들어왔는지
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          onLoad();
        }
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isLoading, hasMore, onLoad]);

  if (isLoading) {
    return (
      <div className={styles["no-product"]}>
        <p>검색 중</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles["no-product"]}>
        <p>검색된 대여물품이 없어요!</p>
      </div>
    );
  }

  return (
    <div className={styles["product-list"]}>
      {products.map((product) => (
        <ProductCard key={`product-${product.rentalSeq}`} product={product} />
      ))}
      <div ref={observerTarget}>{isLoading && <p>로딩 중</p>}</div>
    </div>
  );
};
