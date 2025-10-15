import React from "react";
import { YouTubeEmbed } from "react-social-media-embed";
import { TwitterCard } from "./TweeterCard";
import { NotionCard } from "./NotionCard";
import LinkCard from "./LinkCard";

interface CardBodyProps {
  link: string;
  tags: string[];
  type: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ link, type, tags }) => {
  const renderContentByType = () => {
    switch (type) {
      case "notion":
        // return <NotionCard url={link} />;
        return (
          <div className="my-2 rounded-md overflow-hidden">
            <NotionCard url={link} />
          </div>
        );

      case "video":
        return (
          <YouTubeEmbed
            url={link}
            height={"200px"}
            width={"200px"}
            className="w-full rounded-md shadow-md my-2 relative z-10"
          />
        );

      case "tweets":
        return (
          <div className="m-0 p-0 overflow-hidden">
            <TwitterCard url={link} />
          </div>
        );

      case "links":
        return (
          <div className="p-0 max-w-lg">
            <LinkCard link={link} />
          </div>
        );

      case "docs":
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center my-2"
          >
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition duration-200">
              View Document
            </button>
          </a>
        );

      case "code":
        return (
          <pre className="bg-gray-900 text-green-300 text-sm p-4 rounded-md overflow-x-auto my-2 relative z-10">
            <code>{link}</code>
          </pre>
        );

      default:
        return (
          <p className="text-gray-400 italic text-sm text-center my-4">
            Unsupported content type
          </p>
        );
    }
  };

  return (
    <>
      <div className=" bg-gray-950 rounded-xl shadow-md border border-gray-800 text-white">
        {renderContentByType()}
      </div>

      <div className="m-0">
        {/* Display tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs border border-gray-600 px-2 py-1 rounded-full text-gray-300 bg-gray-800"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};
