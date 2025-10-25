import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";

interface ButtonProps {
  btype: string;
  content: string;
  onClick?: () => void;
  className?: string;
}

export function Button({ btype, content, onClick, className }: ButtonProps) {
  return (
    <div className="p-1 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        onClick={onClick}
        className={`dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 ${
          className || ""
        }`}
      >
        {btype === "share" ? <ShareIcon /> : <PlusIcon />}
        <span>{content}</span>
      </HoverBorderGradient>
    </div>
  );
}
