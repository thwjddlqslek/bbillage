"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import Slider from "./components/Slider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [eventData, setEventData] = useState(null);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: "1 0 auto" }}>
          <Header />
          <Slider />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
