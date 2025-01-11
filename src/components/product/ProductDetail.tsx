"use client";
import { ProductDetail } from "@/src/types/lend";
import styles from "@/src/styles/Product.module.css";
import Location from "@/public/icons/Location";
import Tag from "@/public/icons/Tag";
import Star from "@/public/icons/Star";
import Button from "@/src/components/common/Button";
import { useState } from "react";
import StyledCalendar from "@/src/components/common/StyledCalendar";

interface ProductDetailProps {
  product: ProductDetail;
}

export default function ProductDetailView({ product }: ProductDetailProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
    console.log("Calendar Clicked");
  };
  return (
    <div className={styles["container"]}>
      <div>
        <div //img 태그로 변경
          // src={getFullImageUrl(product.imageUrl)}
          // alt={product.title}
          style={{
            width: "100%",
            height: "620px",
            background: "#f5f5f5",
            borderRadius: "20px",
            marginBottom: "27px",
          }}
        />
        <div className={styles["top-wrap"]}>
          <div className={styles["user-wrap"]}>
            <img
              src={
                product.userProfileImage
                  ? product.userProfileImage
                  : "/assets/defaultprofile.webp"
              }
              alt={product.userNickName}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className={styles["user-info"]}>
              <span>
                <Location />
                <p>{product.grade}</p>
              </span>
              <p>{product.userNickName}</p>
            </div>
          </div>
          <div className={styles["star-wrap"]}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                background={i < product.userStarPoint ? "#ff334b" : "#eee"}
              />
            ))}
            <p>({product.userStarPoint})</p>
          </div>
        </div>
        <div className={styles["product-info"]}>
          <h1>{product.title}</h1>
          <span className={styles["fee-wrap"]}>
            <img
              alt="일일대여료아이콘"
              width="45"
              height="17"
              src="/assets/chips_1day.webp"
              style={{ marginRight: "8px" }}
            />
            <p>{product.dailyFee?.toLocaleString()}원</p>
          </span>
          <span className={styles["grey-wrap"]}>
            <Tag />
            <p>
              {product.categoryInfo
                .map((category) => category.categoryName)
                .join(",")}
            </p>
          </span>
          <p className={styles.content}>{product.content}</p>
          <span className={styles["grey-wrap"]}>
            <Location />
            <p>{product.towns.map((town) => town.townName).join(", ")}</p>
          </span>
        </div>
        {isCalendarOpen && <StyledCalendar onClose={handleCalendarClick} />}
        <div className={styles["btn-wrap"]}>
          <Button
            className={`${styles["btn-base"]} ${styles["calendar-btn"]}`}
            text="대여 캘린더"
            onClick={handleCalendarClick}
          />
          <Button
            className={`${styles["btn-base"]} ${styles["rental-btn"]}`}
            href="https://play.google.com/store/apps/details?id=app.dejay.village"
            target="_blank"
            text="대여하기"
            ariaLabel="Google Play Store에서 앱 다운로드하기 (새 탭에서 열림)"
          />
        </div>
      </div>
      <div className={styles["product-info"]}>
        <h1>{product.userNickName} 님의 다른 대여 상품도 있어요.</h1>
      </div>
    </div>
  );
}
