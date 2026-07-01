/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
      return;
    }

    const currentUser = JSON.parse(user);

    if (!currentUser.is_admin) {
      router.replace("/");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="md:ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            <Menu />
          </button>

          <h1 className="text-xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}