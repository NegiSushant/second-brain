"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}

interface TwitterCardProps {
  url: string; // the tweet URL (x.com or twitter.com)
}

export const TwitterCard: React.FC<TwitterCardProps> = ({ url }) => {
  // Ensures Twitter’s script is loaded only once
  const loadTwitterScript = () => {
    if (!document.getElementById("twitter-wjs")) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    loadTwitterScript();

    // Wait until window.twttr is ready, then render the embed
    const checkAndLoadWidgets = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } else {
        setTimeout(checkAndLoadWidgets, 200);
      }
    };
    checkAndLoadWidgets();
  }, [url]);

  // Replace "x.com" → "twitter.com" for proper embedding
  const correctedUrl = url.replace("x.com", "twitter.com");

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-white shadow-md">
      <h3 className="text-lg font-semibold mb-3">Tweet</h3>
      <blockquote className="twitter-tweet">
        <a href={correctedUrl}></a>
      </blockquote>
      <div className="flex justify-center mt-4">
        <a
          href={correctedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition duration-200"
        >
          View on Twitter
        </a>
      </div>
    </div>
  );
};
