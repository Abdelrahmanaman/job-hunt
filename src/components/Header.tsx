"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import UserProfil from "./UserButton";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <header className=" sticky top-0 z-20 bg-purple-900 p-4 text-white">
      <nav className="flex items-center justify-between">
        <div>
          <Link href={"/"} className="flex items-center gap-1.5">
            <Image
              src={"/logo.svg"}
              alt="Job Huntlogo"
              width={40}
              height={40}
            />
            <span className="text-sm font-semibold text-white md:text-xl">
              Job Hunt
            </span>
          </Link>
        </div>
        <div className="relative">
          <button
            aria-label="Menu"
            aria-checked={openMenu}
            onClick={handleMenuOpen}
          >
            {openMenu ? (
              <X className="flex size-10 md:hidden " />
            ) : (
              <Menu className="flex size-10 md:hidden" />
            )}
          </button>
          <ul
            className={`${openMenu ? "visible -translate-x-0 opacity-100 transition-all duration-300" : "invisible -translate-x-full opacity-0 transition-all duration-300"}flex absolute right-0  top-10 z-10 size-36 flex-col items-center  justify-center rounded-lg border bg-purple-600 p-4 text-white  md:hidden `}
          >
            <li>
              <Link href={"/"}>Explore Jobs</Link>
            </li>
            <li>
              <Link href={"/jobs/new"}>Post a Job</Link>
            </li>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
        <ul className="mr-10  hidden items-center gap-4 md:flex ">
          <li>
            <Link href={"/"}>Explore Jobs</Link>
          </li>
          <li>
            <Link href={"/jobs/new"}>Post a Job</Link>
          </li>
          <li>
            <UserProfil />
          </li>
        </ul>
      </nav>
    </header>
  );
}
