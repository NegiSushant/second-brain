"use client";
import { cn } from "../lib/utils";

interface CardDemoProps {
  title: string;
  link: string;
  type: string;
  tags: string[];
}
export default function CardDemo({ title, link, type, tags }: CardDemoProps) {
  console.log("title" + title);
  // switch (type){

  // }
  const deleteContent = async() => {
    

  }
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(/public/brainImage.png)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="w-full flex justify-between items-center">
          <h3 className="font-medium text-base text-gray-50 z-10">{title}</h3>
          <button className="font-medium text-gray-50" onClick={deleteContent}>Delete</button>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {link}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="mr-2 border-2 border-gray-100 px-2 rounded-full"
                >
                  #{tag.title}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
