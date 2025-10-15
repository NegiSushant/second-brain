"use client";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

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
        {btype === "share" ? (
          <ShareIcon />
        ) : (
          <PlusIcon />
          
        )}
        <span>{content}</span>
      </HoverBorderGradient>
    </div>
  );
}


export function ShareIcon() {
  return (
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={"black"}
        fill={"white"}
        d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        stroke={"black"}
        fill={"white"}
        d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        stroke={"black"}
        fill={"white"}
        d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        stroke={"black"}
        fill={"white"}
        d="M15.5 6.5L8.5 10.5"
        strokeWidth="1.5"
      ></path>
      <path
        stroke={"black"}
        fill={"white"}
        d="M8.5 13.5L15.5 17.5"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      width="28px"
      height="28px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      stroke="black"
    >
      <path
        d="M6 12H12M18 12H12M12 12V6M12 12V18"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
