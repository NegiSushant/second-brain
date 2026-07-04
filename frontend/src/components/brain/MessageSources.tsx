import { IconBrandYoutube, IconBrandX, IconWorld } from "@tabler/icons-react";

interface MessageSourcesProps {
  sources: string[];
}

export default function MessageSources({ sources }: MessageSourcesProps) {
  const uniqueSources = [...new Set(sources)];

  if (!uniqueSources.length) return null;

  const getSourceInfo = (url: string) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace("www.", "");

      if (host.includes("youtube") || host.includes("youtu.be")) {
        return {
          icon: <IconBrandYoutube size={18} />,
          label: host,
        };
      }

      if (host.includes("x.com") || host.includes("twitter.com")) {
        return {
          icon: <IconBrandX size={18} />,
          label: host,
        };
      }

      return {
        icon: <IconWorld size={18} />,
        label: host,
      };
    } catch {
      return {
        icon: <IconWorld size={18} />,
        label: url,
      };
    }
  };

  return (
    <div className="mt-3 pl-2">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Sources
      </p>

      <div className="flex flex-col gap-2">
        {uniqueSources.map((url) => {
          const source = getSourceInfo(url);

          return (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {source.icon}
              <span>{source.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// import { IconExternalLink } from "@tabler/icons-react";

// interface MessageSourcesProps {
//   sources: string[];
// }

// export default function MessageSources({ sources }: MessageSourcesProps) {
//   // Remove duplicate URLs
//   const uniqueSources = [...new Set(sources)];

//   if (uniqueSources.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mt-4">
//       <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
//         Sources
//       </p>

//       <div className="flex flex-col gap-2">
//         {uniqueSources.map((url) => {
//           let hostname = url;

//           try {
//             hostname = new URL(url).hostname.replace("www.", "");
//           } catch {
//             hostname = url;
//           }

//           return (
//             <a
//               key={url}
//               href={url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
//             >
//               <span className="truncate">{hostname}</span>

//               <IconExternalLink size={16} />
//             </a>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
