import React from "react";
import { useRouter } from "next/navigation";
import "./Post.css";
import Calendar from "./icons/Calendar";
import Image from "next/image";

interface PostProps {
  id: number;
  imageUrl: string;
  status: 1 | 2;
  title: string;
  startDate: string;
  endDate: string;
}

const Post: React.FC<PostProps> = ({
  id,
  imageUrl,
  status,
  title,
  startDate,
  endDate,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/${id}`);
  };

  return (
    <div className="post-container" onClick={handleClick}>
      <Image
        src={imageUrl}
        className="image"
        alt={title}
        width={408}
        height={304}
      />
      <span className={`badge ${status === 1 ? "ongoing" : "ended"}`}>
        {status === 1 ? "진행중" : "종료"}
      </span>
      <p className="title">{title}</p>
      <div className="date-container">
        <Calendar />
        <p className="date">{startDate}</p>
        <p> ~ </p>
        <p className="date">{endDate}</p>
      </div>
    </div>
  );
};

export default Post;
