"use client";

import { useState } from "react";
import styles from "../styles/layout.module.css";
import Image from "next/image";

interface HeaderProps {
  onEventDataFetch: (data: any) => void;
}

export default function Header({ onEventDataFetch }: HeaderProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (index === 3) {
      fetch(`/eventApi/event?size=10&page=0&visibility=true`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => onEventDataFetch(data))
        .catch((error) => {
          console.log("이벤트 목록 에러 발생", error);
          onEventDataFetch(null);
        });
    } else {
      onEventDataFetch(null);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/assets/village_logo.webp"
          alt="Village Logo"
          width={131}
          height={35}
        />
      </div>
      <nav>
        <ul className={styles.nav}>
          {["서비스 소개", "빌려드려요", "빌려주세요", "EVENT", "FAQ"].map(
            (item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`${styles["nav-item"]} ${
                    activeTab === index ? styles.active : ""
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}
