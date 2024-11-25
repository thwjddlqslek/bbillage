"use client";

import { useEffect, useState } from "react";

interface EventData {
  status: string;
  data: { id: number; name: string }[];
}

const EventPage = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const size = 10;
  const page = 0;

  useEffect(() => {
    // fetch(`/eventApi/event?size=${size}&page=${page}&visibility=true`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.statusText);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => setEventData(data))
    //   .catch((error) => console.log("이벤트 목록 에러 발생", error));
  }, []);

  return (
    <div>
      이벤트 상세
      {JSON.stringify(eventData)}
    </div>
  );
};

export default EventPage;
