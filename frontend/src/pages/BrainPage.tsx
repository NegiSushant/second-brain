"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconBrain,
  IconArrowLeft,
  IconBrandTwitter,
  IconBrandYoutube,
  IconFileTypeDoc,
  IconExternalLink,
  IconBrandNotion,
  IconAdjustmentsCode,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { BrainNav } from "../components/BrainNav";
// import CardDemo from "../components/cards-demo-2";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export function Brain() {
  const location = useLocation();

  const links = [
    {
      label: "Tweets",
      href: "tweet",
      icon: (
        <IconBrandTwitter className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Youtube",
      href: "youtube",
      icon: (
        <IconBrandYoutube className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Notions",
      href: "notion",
      icon: (
        <IconBrandNotion className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Documents",
      href: "docs",
      icon: (
        <IconFileTypeDoc className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Links",
      href: "links",
      icon: (
        <IconExternalLink className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Code",
      href: "code",
      icon: (
        <IconAdjustmentsCode className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const currentPath = location.pathname.split("/").pop() || "";
  const title =
    links.find((link) => link.href === currentPath)?.label || "All Content";
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(
      `${API}/user/signOut`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status == 200) {
      alert("Logout successfull");
      navigate("/");
    }
  };
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={(e) => {
                    if (link.href === "logout") {
                      handleLogout(e);
                    } else navigate(`/brain/${link.href}`);
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Dev: Sushant Singh Negi",
                href: "#",
                icon: (
                  <img
                    // src="https://x.com/Negi25_/photo"
                    src="https://media.licdn.com/dms/image/v2/D5603AQGlG_ZczLD-8Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726897221169?e=2147483647&v=beta&t=awOHdgYtXb73syFqvlq0CW_dSRN4DBsivug2VnVU-fs"
                    // src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <BrainNav title={title} />
          <div className="flex flex-1 gap-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <a
      // href="#"
      onClick={() => {
        navigate("/brain");
      }}
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      {/* <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> */}
      <IconBrain className="h-10 w-10 shrink-0 text-neutral-700 dark:text-neutral-200" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-black dark:text-white"
      >
        Your Brain
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
