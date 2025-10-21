import { IconBrain } from "@tabler/icons-react";

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <IconBrain className="h-10 w-10 shrink-0 text-neutral-700 dark:text-neutral-200 cursor-pointer" />
      <span className="font-medium text-black dark:text-white">MindVault</span>
    </a>
  );
};
