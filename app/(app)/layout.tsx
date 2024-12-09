"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Navbar */}
        <header className="w-full bg-white dark:bg-gray-800 shadow-md">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1 flex items-center">
              <Link href="/" onClick={handleLogoClick}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span className="btn btn-ghost normal-case text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Frame Flow
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center space-x-4">
              {user && (
                <>
                  <div className="avatar">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full">
                      <Image
                        src={user.imageUrl}
                        alt={
                          user.username || user.emailAddresses[0].emailAddress
                        }
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle"
                  >
                    <LogOutIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-white dark:bg-gray-800 w-64 h-full flex flex-col shadow-lg">
          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 w-full text-base-content flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4">
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full"
              >
                <LogOutIcon className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
