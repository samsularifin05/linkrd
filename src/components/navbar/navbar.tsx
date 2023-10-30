"use client";

import {
  Copy,
  CopySuccess,
  ExportCurve,
  ExportSquare,
  Global,
  LogoutCurve,
} from "iconsax-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MENU } from "~/lib/data/constants";
import type { Site, User } from "~/server/db/schema";
import Avatar from "../avatar";
import Logo from "../logo";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuItem } from "./menu-item";

interface NavbarProps {
  user: User | undefined;
  site: Site | undefined;
}

export default function Navbar({ user, site }: NavbarProps) {
  const [domain, setDomain] = useState("");
  useEffect(() => {
    setDomain(`${window.location.origin}/${user?.username}`);
  }, [user?.username]);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(domain)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" fixed z-50 w-full bg-neutral-100 p-2 pb-0">
      <div className=" w-full rounded-full border-b bg-white p-4 pl-8">
        <div className="flex w-full items-center justify-between">
          <Logo className=" mr-8" path="/admin" />
          <div className=" hidden w-full flex-1 gap-x-2 overflow-x-scroll [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden ">
            {MENU.map((menu, index) => (
              <MenuItem
                key={index}
                label={menu.label}
                href={menu.href}
                icon={menu.icon}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className=" flex h-10 items-center justify-center gap-1 rounded-full border px-4 hover:bg-neutral-100">
                <ExportCurve size={20} />
                <p className=" text-sm font-medium">Share</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" absolute -right-12 w-[360px] rounded-3xl p-0">
                <div className=" p-6">
                  <div className="relative flex items-center justify-center">
                    {/* <div className=" w-9" /> */}
                    <h1 className=" font-semibold text-neutral-800">
                      Share your Catalink
                    </h1>
                  </div>
                  <p className=" mt-2 text-sm text-neutral-500">
                    Get more visitors by sharing your Linktree everywhere.
                  </p>
                </div>

                <div className=" px-2">
                  <Link
                    href={domain}
                    target="_blank"
                    className=" flex w-full items-center justify-between rounded-xl p-4 hover:bg-neutral-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className=" flex aspect-square h-12 items-center justify-center rounded-lg bg-[#cce703]">
                        <Global size={24} />
                      </div>
                      <h1 className=" font-semibold text-neutral-800">
                        Open my Catalink
                      </h1>
                    </div>
                    <ExportSquare size={20} />
                  </Link>
                </div>

                <div className=" p-6">
                  <Button
                    onClick={handleCopy}
                    className=" h-14 w-full justify-between rounded-xl font-normal"
                    variant="outline"
                  >
                    {domain}
                    {isCopied ? (
                      <CopySuccess size={20} className=" text-green-500" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className=" focus:outline-none">
                <Avatar
                  src={
                    site?.profileImage && site.profileImage != ""
                      ? site.profileImage
                      : user?.image
                  }
                  className=" h-10 w-10"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" absolute -right-5 w-80 rounded-3xl p-2">
                <div className="flex gap-4 p-4">
                  <Avatar
                    src={
                      site?.profileImage && site.profileImage != ""
                        ? site.profileImage
                        : user?.image
                    }
                    className=" h-12 w-12"
                  />
                  <div className=" flex flex-col">
                    <h1 className=" text-lg font-semibold text-neutral-800">
                      {site?.profileTitle && site.profileTitle != ""
                        ? site.profileTitle
                        : user?.name}
                    </h1>
                    <p className=" text-sm text-neutral-500">{domain}</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className=" flex h-12 w-full items-center gap-2 rounded-xl px-4 hover:bg-neutral-100"
                >
                  <LogoutCurve size={20} />
                  <p className=" text-sm text-neutral-800">Logout</p>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
