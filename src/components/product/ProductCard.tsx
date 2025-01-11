"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/src/types/lend";
import styles from "@/src/styles/ProductList.module.css";
import Heart from "../../../public/icons/Heart";
import Views from "../../../public/icons/Views";
import Location from "../../../public/icons/Location";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getFullImageUrl = (fileName: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
    return `https://s3.ap-northeast-2.amazonaws.com/image.village/${fileName}`;
  };

  return (
    <Link href={`/lend/${product.rentalSeq}`}>
      <div className={styles.product}>
        <div
          // src={getFullImageUrl(product.imageUrl)}
          // alt={product.title}
          style={{
            width: "408px",
            height: "304px",
            background: "#eee",
            borderRadius: "20px",
          }}
        />
        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.fee}>
          <span>
            <img
              alt="일일대여료아이콘"
              width="45"
              height="17"
              src="/assets/chips_1day.webp"
            />
          </span>
          <span>{product.dailyRentalFee?.toLocaleString()}원</span>
        </p>
        <p className={styles.area}>
          <Location /> {product.towns?.join(", ")}
        </p>
        <div className={styles.footer}>
          <Heart />
          <span>{product.likeCnt}</span>
          <Views />
          <span>{product.viewCnt}</span>
        </div>
      </div>
    </Link>
  );
};
