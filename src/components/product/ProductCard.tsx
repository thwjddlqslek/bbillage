"use client";

import { Product } from "@/src/types/lend";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>가격: {product.dailyRentalFee.toLocaleString()}원</p>
      <p>내용: {product.content}</p>
      <div>
        <span>좋아요: {product.likeCnt}</span>
        <span>조회수: {product.viewCnt}</span>
      </div>
      <p>지역: {product.towns.join(", ")}</p>
    </div>
  );
};
