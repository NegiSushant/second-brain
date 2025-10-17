"use client";
import axios from "axios";
import { cn } from "../lib/utils";
import { CardHeader } from "./CardHeader";
import { useCallback } from "react";
import { CardBody } from "./CardBody";
const API = import.meta.env.VITE_API_URL;

interface CardDemoProps {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
  onDeleteSuccess: () => void;
}

export default function CardDemo({
  _id,
  title,
  link,
  type,
  tags,
  onDeleteSuccess,
}: CardDemoProps) {
  const deleteContent = useCallback(async () => {
    const contentId = _id;
    console.log("COntent_id:" + contentId);

    try {
      const response = await axios.delete(
        `${API}/content/content/${contentId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(response.data.messsage || "deleted");
        onDeleteSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  }, [_id, onDeleteSuccess]);

  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(/brainImage.png)] bg-cover"
        )}
      >
        
        <CardHeader title={title} onClick={deleteContent} />

        <CardBody link={link} type={type} tags={tags} />
      </div>
    </div>
  );
}
