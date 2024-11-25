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
      <body>
        <Header onEventDataFetch={setEventData} />
        <Slider />
        {eventData ? (
          <div>
            이벤트 목록
            {JSON.stringify(eventData)}
          </div>
        ) : (
          children
        )}
        <Footer />
      </body>
    </html>
  );
}
