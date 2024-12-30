"use client";

import Image from "next/image";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.rentalSeq}`}>
      <div>
        <div>
          <img
            src={`https://s3.ap-northeast-2.amazonaws.com/image.village/${product.imageUrl}`}
            alt={product.title}
            width={200}
            height={200}
          />
        </div>
        <div>
          <h3>{product.title}</h3>
          <p>{product.dailyRentalFee.toLocaleString()}원</p>
          <p>{product.content}</p>
        </div>
      </div>
    </Link>
  );
}
