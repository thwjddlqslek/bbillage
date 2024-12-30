"use client";

import styles from "../styles/layout.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className={styles["footer-banner"]}>
        <div className={styles["banner-left"]}>
          <Image
            src="/assets/footer-logo.webp"
            alt="Village Logo"
            width={72}
            height={72}
            style={{ marginRight: "32px" }}
          />
          <span>빌리쥐를 지금 시작해 보세요!</span>
        </div>
        <div>
          <Image
            src="/assets/google.webp"
            alt="Village Logo"
            width={162}
            height={50}
            style={{ marginRight: "32px", cursor: "pointer" }}
          />
          <Image
            src="/assets/appstore.webp"
            alt="Village Logo"
            width={162}
            height={50}
            style={{ marginRight: "32px", cursor: "pointer" }}
          />
        </div>
      </footer>
      <footer className={styles["footer-container"]}>
        <div className={styles["footer-box"]}>
          <span>
            (주)어플드제이 사업자 정보
            <br />
            <br />
            대표자 : 이용훈
            <br />
            사업자등록번호 : 663-88-02165
            <br />
            주소 : 서울특별시 마포구 월드컵북로5길 12, 3층
            <br />
            (서교동, 도경빌딩)
            <br />
            이메일 : support@appdejay.co.kr
            <br />
            호스팅제공자 : 아마존웹서비스
            <br />
            <br />
            ©App de Jay Corp.
          </span>
        </div>
        <div className={styles["footer-box"]}>
          <span>
            (주)어플드제이는 통신판매중개자로 거래 당사자가 아니므로,
            <br />
            판매자가 등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다.
            <br />
            이용약관 개인정보처리방침
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
