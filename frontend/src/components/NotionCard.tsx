"use client";
import React, { useState, useEffect } from "react";

interface NotionCardProps {
  url: string;
}

export const NotionCard: React.FC<NotionCardProps> = ({ url }) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    // const defaultStyle = "w-full h-full object-cover rounded-md";
    try {
      // Default thumbnail from Thum.io
      let generatedSrc = `//image.thum.io/get/${url}`;

      // Handle a special case
      if (url === "https://secondbrain-app.vercel.app/") {
        generatedSrc = "landing.png";
      }

      setImageSrc(generatedSrc);
    } catch (error) {
      console.error("Error loading Notion preview:", error);
      setImageSrc(
        "https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?resize=752x&vertical=center"
      );
    }
  }, [url]);

  const handleError = () => {
    setImageSrc(
      "https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?resize=752x&vertical=center"
    );
  };

  return (
    <div className="overflow-hidden w-full h-full rounded-md">
      <img
        src={imageSrc}
        alt="Notion preview"
        className="w-full h-full object-cover"
        onError={handleError}
      />
      <div className="flex justify-center mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition duration-200"
        >
          View Notion
        </a>
      </div>
    </div>
  );
};
