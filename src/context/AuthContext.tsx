"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "@/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
    login: (
    email: string,
    password: string
    ) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadUser();
  }, []);

  async function loadUser() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response =
        await api.get("/auth/me");

      setUser(response.data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  async function login(
    email: string,
    password: string
  ) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem(
      "token",
      response.data.access_token
    );
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    setUser(response.data.user);

    return response.data.user;
  }
  async function register(
    name: string,
    email: string,
    password: string
  ) {
    await api.post("/auth/register", {
      name,
      email,
      password,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}