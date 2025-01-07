"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/src/styles/Layout.module.css";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "서비스 소개", path: "/intro" },
  { label: "빌려드려요", path: "/lend" },
  { label: "빌려주세요", path: "/borrow" },
  { label: "EVENT", path: "/event" },
  { label: "FAQ", path: "/faq" },
] as const; // 타입 안전성 강화 용도

const Header = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const index = NAV_ITEMS.findIndex((item) => item.path === pathname);
    if (index !== -1) {
      setActiveTab(index);
    }
  }, [pathname]);

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
          {NAV_ITEMS.map((item, index) => (
            <li key={index}>
              <a
                className={`${styles["nav-item"]} ${
                  activeTab === index ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(index);
                  router.push(item.path);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
