"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "../../styles/PostList.module.css";
import Image from "next/image";
interface EventDetail {
  id: number;
  title: string;
  pc_img: string;
}

const EventDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getFullImageUrl = (path: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
    return `${baseUrl}${path}`;
  };
  useEffect(() => {
    if (id) {
      fetch(`/eventApi/event/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEventDetail(data.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [id]);

  return (
    <div className={styles["list-container"]}>
      {eventDetail ? (
        <div>
          <Image
            src={getFullImageUrl(eventDetail.pc_img)}
            alt={eventDetail.title}
            layout="responsive"
            width={850}
            height={4500}
          />
        </div>
      ) : (
        error
      )}
    </div>
  );
};

export default EventDetailPage;
