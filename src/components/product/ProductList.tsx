"use client";

import { Product } from "@/src/types/lend";
import { ProductCard } from "@/src/components/product/ProductCard";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products = [],
  isLoading,
}) => {
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!products.length) {
    return <div>상품이 없습니다.</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.rentalSeq} product={product} />
      ))}
    </div>
  );
};
