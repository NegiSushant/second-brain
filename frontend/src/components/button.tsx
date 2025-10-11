"use client";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { IconBasketShare, IconAd } from "@tabler/icons-react";
interface buttonProp {
  btype: string;
  content: string;
  // onClick: string;
}

export function Button({ btype, content }: buttonProp) {
  return (
    <div className="p-1 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        {btype === "share" ? (
          <IconBasketShare className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ) : (
          <IconAd className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        )}
        <span>{content}</span>
      </HoverBorderGradient>
    </div>
  );
}

