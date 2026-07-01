"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Boxes,
  Star,
  Users,
  Settings,
  LogOut,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/context/AuthContext";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const closeSidebar = () => setIsOpen(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: <Boxes size={20} />,
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
      icon: <Star size={20} />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users size={20} />,
    },
  ];

  const router = useRouter();
  const { logout } = useAuth();
  async function handleLogout() {
  if (!confirm("Are you sure you want to logout?")) return;

  logout();

  router.replace("/login");
}

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950
          text-white
          shadow-2xl
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 md:hidden">
          <div>
            <h2 className="text-2xl font-bold">Review Platform</h2>
            <p className="text-xs text-slate-300">
              Admin Panel
            </p>
          </div>

          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-white/10">
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl">
              ⭐
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Review Platform
              </h2>

              <p className="text-sm text-slate-300">
                Admin Dashboard
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={`
                flex items-center gap-3
                rounded-xl px-4 py-3
                transition-all duration-200

                ${
                  pathname === item.href
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-white/10"
                }
              `}
            >
              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          ))}

        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 p-4">

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition-all"
          >
            <Home size={20} />
            Back to Website
          </Link>

            <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-300 hover:bg-red-500/10 transition-all"
            >
            <LogOut size={20} />
            Logout
            </button>

        </div>
      </aside>
    </>
  );
}