"use client";

import { use, useEffect, useState } from "react";

interface EventDetail {
  id: number;
  name: string;
  description: string; // 상세 정보로 받아오는 다른 데이터
}

interface Params {
  id: string;
}

const EventDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // URL에서 id를 가져옵니다.

  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/eventApi/event/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setEventDetail(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Event Detail</h1>
      {eventDetail ? (
        <div>
          <h2>{eventDetail.name}</h2>
          <p>{eventDetail.description}</p>
        </div>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
};

export default EventDetailPage;
