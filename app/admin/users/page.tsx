"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, Users } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadUsers() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://review-project-backend.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  async function deleteUser(id: number) {
    if (!confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://review-project-backend.onrender.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail);
      }

      toast.success("User deleted");

      loadUsers();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-lg">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Management
          </h1>

          <p className="text-gray-500">
            Total Users: {users.length}
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-600"
          />

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Joined
                </th>

                <th className="p-4 text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-10 text-center text-gray-500"
                  >
                    No users found.
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>

                          <p className="font-semibold">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            ID #{user.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          user.is_admin
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.is_admin ? "Admin" : "User"}
                      </span>

                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-end">

                        {!user.is_admin ? (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="rounded-lg bg-red-100 p-2 transition hover:bg-red-200"
                          >
                            <Trash2
                              size={18}
                              className="text-red-600"
                            />
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-blue-700">
                            <Users size={16} />
                            Admin
                          </div>
                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}