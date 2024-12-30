"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/layout.module.css";
import Image from "next/image";

const Header = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    switch (pathname) {
      case "/intro":
        setActiveTab(0);
        break;
      case "/product":
        setActiveTab(1);
        break;
      case "/borrow":
        setActiveTab(2);
        break;
      case "/event":
        setActiveTab(3);
        break;
      case "/faq":
        setActiveTab(4);
        break;
      default:
        break;
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
          {["서비스 소개", "빌려드려요", "빌려주세요", "EVENT", "FAQ"].map(
            (item, index) => (
              <li key={index}>
                <a
                  className={`${styles["nav-item"]} ${
                    activeTab === index ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(index);
                    switch (index) {
                      case 0:
                        router.push("/intro");
                        break;
                      case 1:
                        router.push("/product");
                        break;
                      case 2:
                        router.push("/borrow");
                        break;
                      case 3:
                        router.push("/event");
                        break;
                      case 4:
                        router.push("/faq");
                        break;
                      default:
                        break;
                    }
                  }}
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
};

export default Header;
