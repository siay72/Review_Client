"use client";
import React, { useState } from "react";
import api from "@/services/api";
import "./App.css";
import { useAuth } from "../../src/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const { login, register } = useAuth();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    if (isLogin) {
      console.log(formData.password);
console.log(formData.password.length);
        const user = await login(
        formData.email,
        formData.password
        );

        toast.success(`Welcome ${user.name}`);

        router.replace(
        user.is_admin === true ? "/admin/dashboard" : "/"
        );
      
    } else {
      if (
        formData.password !==
        formData.confirmPassword
      ) {
        toast.error("Passwords do not match");

        return;
      }

      await register(
        formData.name,
        formData.email,
        formData.password
      );

      toast.success(
        "Registration successful!"
      );

      setIsLogin(true);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.detail ||
        "Authentication failed"
    );
  } finally {
    setIsLoading(false);
  }
};


  const handleTabSwitch = (loginState: boolean) => {
    setIsLogin(loginState);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="auth-shell flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">
      {/* Brand Panel */}

      {/* Form Panel */}
      <div className="form-panel flex-1 flex items-center justify-center relative overflow-hidden bg-[#EEF3FA]">
        <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(229,85,3,0.15),transparent)]" />
        <div className="form-container w-full bg-white border border-gray-200 rounded-2xl max-w-[400px] p-10 relative shadow-xl">
          {/* Tabs */}
          <div className="tabs flex relative mb-10 bg-gray-300 rounded-xl p-1 opacity-0 animate-[fadeUp_0.8s_ease-out_0.15s_forwards]" role="tablist">
            <button
              className={`tab text-black flex-1 px-5 py-3 border-none bg-none font-outfit text-[0.9rem] font-medium cursor-pointer transition-colors duration-300 rounded z-2 ${isLogin ? "text-slate-900" : "text-[#6b6b6b]"}`}
              onClick={() => handleTabSwitch(true)}
              type="button"
              role="tab"
              aria-selected={isLogin}
            >
              Sign In
            </button>
            <button
              className={`tab flex-1 px-5 py-3 text-black border-none bg-none font-outfit text-[0.9rem] font-medium cursor-pointer transition-colors duration-300 rounded z-2 ${!isLogin ? "text-slate-900" : "text-[#6b6b6b]"}`}
              onClick={() => handleTabSwitch(false)}
              type="button"
              role="tab"
              aria-selected={!isLogin}
            >
              Register
            </button>
            <div className={`tab-indicator absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-md rounded-lg transition-transform duration-[450ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-1 shadow-md ${isLogin ? "" : "translate-x-[calc(100%+4px)]"}`} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-header mb-7 opacity-0 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]">
              <h2 className="font-dm-serif text-2xl font-normal text-slate-900 mb-2 tracking-[-0.5px]">{isLogin ? "Welcome back" : "Create account"}</h2>
              <p className="text-[0.9rem] font-light text-gray-600 leading-relaxed">
                {isLogin
                  ? "Enter your credentials to access your account."
                  : "Fill in the details below to get started."}
              </p>
            </div>

            {!isLogin && (
              <div
                className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
                style={{ animationDelay: "0s" }}
              >
                <label
                  htmlFor="name"
                  className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "name" || formData.name ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required={!isLogin}
                  autoComplete="name"
                  className="w-full py-3.5 px-4 bg-gray-200 border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-slate-900 transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)]"
                />
              </div>
            )}

            <div
              className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
              style={{ animationDelay: "0.05s" }}
            >
              <label
                htmlFor="email"
                className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "email" || formData.email ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                autoComplete="email"
                className="w-full py-3.5 px-4 bg-gray-200 border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-slate-900 transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)]"
              />
            </div>

            <div
              className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              <label
                htmlFor="password"
                className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "password" || formData.password ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
              >
                Password
              </label>
              <div className="password-wrapper relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full py-3.5 px-4 bg-gray-200 border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-slate-900 transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)] pr-11 focus:border-primary focus:shadow-[0_0_0_3px_rgba(229,85,3,0.15)]"
                />
                <button
                  type="button"
                  className="password-toggle absolute right-3 bg-none border-none text-[#6b6b6b] cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div
                className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
                style={{ animationDelay: "0.15s" }}
              >
                <label
                  htmlFor="confirmPassword"
                  className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "confirmPassword" || formData.confirmPassword ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
                >
                  Confirm Password
                </label>
                <div className="password-wrapper relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    required={!isLogin}
                    autoComplete="new-password"
                    className="w-full py-3.5 px-4 bg-gray-200 border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-slate-900 transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)] pr-11 focus:border-primary focus:shadow-[0_0_0_3px_rgba(229,85,3,0.15)]"
                  />
                  <button
                    type="button"
                    className="password-toggle absolute right-3 bg-none border-none text-[#6b6b6b] cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 hover:text-primary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div
                className="forgot-password text-right mt-[-0.625rem] mb-6 opacity-0 animate-slideUp"
                style={{ animationDelay: "0.2s" }}
              >
                <button
                  type="button"
                  className="forgot-password-btn"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 w-full py-3.5 text-white border-none rounded-lg font-outfit text-[0.95rem] font-semibold cursor-pointer transition-all duration-250 flex justify-center items-center h-12 tracking-[0.3px] opacity-0 animate-slideUp hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(229,85,3,0.15)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? "bg-white shadow-md" : ""}`}
              disabled={isLoading}
              style={{ animationDelay: "0.25s" }}
            >
              {isLoading ? (
                <span className="spinner w-[22px] h-[22px] border-2 border-[rgba(12,12,12,0.15)] rounded-full border-t-[#0c0c0c] animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <AuthForm />;
}