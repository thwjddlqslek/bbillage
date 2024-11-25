"use client";

import styles from "../styles/layout.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className={styles["footer-banner"]}>
        <Image
          src="/assets/footer-logo.webp"
          alt="Village Logo"
          width={72}
          height={72}
          style={{ marginRight: "32px" }}
        />
        <div>빌리쥐를 지금 시작해 보세요!</div>
      </footer>
      <footer className={styles.footer}>
        (주)어플드제이 사업자 정보 대표자 : 이용훈 사업자등록번호 :
        663-88-02165 주소 : 서울특별시 마포구 월드컵북로5길 12, 3층(서교동,
        도경빌딩) 이메일 : support@appdejay.co.kr 호스팅제공자 : 아마존웹서비스
        (주)어플드제이는 통신판매중개자로 거래 당사자가 아니므로,판매자가
        등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다. ©App de Jay
        Corp.
      </footer>
    </>
  );
}
