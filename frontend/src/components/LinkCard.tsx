import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";

interface LinkCardProps {
  link: string;
}

interface MetaData {
  title: string;
  description: string;
  image: string;
  favicon: string;
  domain: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(link)}`
        );
        const data = await res.json();

        if (data?.data) {
          const urlObj = new URL(link);
          setMeta({
            title: data.data.title || urlObj.hostname,
            description: data.data.description || "No description available",
            image: data.data.image?.url || `https://image.thum.io/get/${link}`,
            favicon:
              data.data.logo?.url ||
              `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`,
            domain: urlObj.hostname.replace("www.", ""),
          });
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [link]);

  if (isLoading) {
    return (
      <div className="p-4 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm animate-pulse">
        <div className="h-40 bg-gray-200 dark:bg-neutral-800 rounded-md mb-3" />
        <div className="h-4 bg-gray-200 dark:bg-neutral-700 w-2/3 mb-2 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-neutral-800 w-1/2 rounded" />
      </div>
    );
  }

  if (!meta) return null;

  return (
    <div className="flex flex-col border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg transition-all duration-200 w-full max-w-md mx-auto">
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-t-xl">
        <img
          src={meta.image}
          alt={meta.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://cdn.dribbble.com/userupload/4487190/file/original-d4c3ba33335a133315f0e2dca0332649.png?resize=752x&vertical=center";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-1 flex flex-col justify-between flex-1 min-h-[140px]">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0">
            {meta.favicon ? (
              <img
                src={meta.favicon}
                alt="favicon"
                className="w-5 h-5 rounded-sm border border-gray-200 dark:border-neutral-700"
              />
            ) : (
              <Globe className="w-5 h-5 text-gray-500" />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {meta.domain}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
            {meta.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {meta.description}
          </p>
        </div>

        {/* Button (always stays inside card) */}
        <div className="mt-3 flex justify-end">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition duration-200 text-sm">
              View
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;

// import React, { useState, useEffect } from "react";
// import { Globe } from "lucide-react";

// interface LinkCardProps {
//   link: string;
// }

// const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
//   const [favicon, setFavicon] = useState<string | null>(null);
//   const [domain, setDomain] = useState<string>("");

//   useEffect(() => {
//     try {
//       const url = new URL(link);
//       setDomain(url.hostname.replace("www.", ""));
//       setFavicon(
//         `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`
//       );
//     } catch {
//       setFavicon(null);
//     }
//   }, [link]);

//   const handleImageError = () => setFavicon(null);

//   return (
//     <div className="flex items-center justify-between p-3 border rounded-xl bg-white shadow-md transition hover:shadow-lg">
//       <div className="flex items-center gap-3">
//         {favicon ? (
//           <img
//             src={favicon}
//             alt="website favicon"
//             onError={handleImageError}
//             className="w-10 h-10 rounded-lg border border-gray-200"
//           />
//         ) : (
//           <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
//             <Globe className="text-gray-500 w-6 h-6" />
//           </div>
//         )}
//         <div>
//           <p className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
//             {domain || "Unknown Website"}
//           </p>
//         </div>
//       </div>

//       <a href={link} target="_blank" rel="noopener noreferrer" className="ml-3">
//         <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition duration-200">
//           View
//         </button>
//       </a>
//     </div>
//   );
// };

// export default LinkCard;
