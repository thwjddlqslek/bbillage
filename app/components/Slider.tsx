"use client";

import { useState, MouseEvent, TouchEvent } from "react";
import styles from "../styles/layout.module.css";
import slides from "../styles/components/slider.module.css";
import Image from "next/image";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].pageX : e.pageX);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const currentX =
      "touches" in e
        ? (e as TouchEvent).changedTouches[0].pageX
        : (e as MouseEvent).pageX;

    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }

    setIsDragging(false);
  };

  return (
    <div className={slides["slide-background"]}>
      <div className={slides["slide"]}>
        <div
          className={slides["slide-track"]}
          style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className={slides["slide-info"]}>
            <Image
              src="/assets/slide1.webp"
              alt="slide1"
              width={190}
              height={152}
            />
            <div>
              <h2>안 쓰는 물건 빌려주고 용돈 벌자!</h2>
              <h3>공간만 차지하는 내 물건들 렌탈료 받고 빌려줘 보세요.</h3>
            </div>
          </div>
          <div className={slides["slide-info"]}>
            <Image
              src="/assets/slide2.webp"
              alt="slide2"
              width={190}
              height={152}
            />
            <div>
              <h2>구매 전에 경험하자!</h2>
              <h3>사지 말고 빌려 쓰세요, 사기 전에 빌려 쓰세요.</h3>
            </div>
          </div>
          <div className={slides["slide-info"]}>
            <Image
              src="/assets/slide3.webp"
              alt="slide3"
              width={190}
              height={152}
            />
            <div>
              <h2>잠깐, 필요한 물건 중고거래 대신 빌려 쓰자!</h2>
              <h3>번거로운 중고거래 대신 쉽게 빌려서 사용해 보세요.</h3>
            </div>
          </div>
        </div>
        <div className={slides["button-container"]}>
          <button className={slides.arrow} onClick={handlePrevClick}>
            <Image
              src="/assets/icon-left.webp"
              alt="arrow-left"
              width={40}
              height={40}
            />
          </button>
          <button className={slides["arrow"]} onClick={handleNextClick}>
            <Image
              src="/assets/icon-right.webp"
              alt="arrow-right"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
