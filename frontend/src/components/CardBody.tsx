import React from "react";

interface CardBodyProps {
  link: string;
  tags: string[];
  type: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ link, type, tags }) => {
  const renderContentByType = () => {
    switch (type) {
      case "audio":
        return (
          <audio
            src={link}
            controls
            className="w-full rounded-md shadow-sm my-2 relative z-10"
          />
        );

      case "video":
        return (
          <video
            src={link}
            controls
            className="w-full rounded-md shadow-md my-2 relative z-10"
          />
        );

      case "tweet":
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center my-2"
          >
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition duration-200">
              View Tweet
            </button>
          </a>
        );

      case "links":
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center my-2"
          >
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition duration-200">
              View Link
            </button>
          </a>
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

      case "texts":
        return (
          <p className="text-gray-100 bg-gray-800 rounded-md p-3 text-sm leading-relaxed my-2">
            {link}
          </p>
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
    <div className="p-4 bg-gray-950 rounded-xl shadow-md border border-gray-800 text-white">
      <div>{renderContentByType()}</div>

      <div className="mt-3">
        {/* Display the link in a readable way */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-indigo-400 text-sm truncate hover:underline"
        >
          {link}
        </a>

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
    </div>
  );
};

// interface CardBodyProps {
//   link: string;
//   tags: string[];
//   type: string;
// }

// export const CardBody = ({ link, type, tags }: CardBodyProps) => {
//   const renderContentByType = () => {
//     switch (type) {
//       case "audio":
//         return (
//           <audio src={link} controls className="w-full relative z-10"></audio>
//         );
//       case "tweet":
//         return (
//           <blockquote className="twitter-tweet">
//             <a href={link}>
//               <button className="w-32 h-10 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200">
//                 View Tweet
//               </button>
//             </a>
//           </blockquote>
//         );
//       case "link":
//         return (
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline break-words text-sm"
//           >
//             <button className="w-32 h-10 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200">
//               View Link
//             </button>
//           </a>
//         );
//       case "video":
//         return (
//           <video src={link} controls className="w-full relative z-10"></video>
//         );
//       case "docs": return
//       case "code": return
//       case "text": return

//     }
//   };

//   return (
//     <div className="text content">
//       {renderContentByType()}
//       <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
//         {link}
//       </h1>
//       <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
//         {tags.map((tag, index) => {
//           return (
//             <span
//               key={index}
//               className="mr-2 border-2 border-gray-100 px-2 rounded-full"
//             >
//               #{tag.title}
//             </span>
//           );
//         })}
//       </p>
//     </div>
//   );
// };
