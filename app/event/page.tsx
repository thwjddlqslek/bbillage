"use client";

import { useEffect, useState } from "react";
import Post from "@/src/components/event/Post";
import styles from "@/src/styles/PostList.module.css";

interface EventData {
  data: {
    list: {
      event_idx: number;
      pc_thumbnail_img: string;
      processing: number;
      title: string;
      start_date: number;
      end_date: number;
    }[];
  };
}

const formatDate = (timestamp: number): string => {
  // https://momentjs.com/
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

const EventPage = () => {
  const [eventData, setEventData] = useState<EventData>({ data: { list: [] } });
  const size = 10;
  const page = 0;

  const getFullImageUrl = (path: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
    return `${baseUrl}${path}`;
  };

  useEffect(() => {
    fetch(`/eventApi/event?size=${size}&page=${page}&visibility=true`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("이벤트 목록 데이터", data);
        setEventData(data);
      })
      .catch((error) => console.log("이벤트 목록 에러 발생", error));
  }, []);

  return (
    <div className={styles["main"]}>
      <div>
        <div className={styles["list-container"]}>
          {eventData?.data.list.map((event) => (
            <Post
              key={event.event_idx}
              id={event.event_idx}
              imageUrl={getFullImageUrl(event.pc_thumbnail_img)}
              status={event.processing as 1 | 2}
              title={event.title}
              startDate={formatDate(event.start_date)}
              endDate={formatDate(event.end_date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
