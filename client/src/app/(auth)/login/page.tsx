"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { useLoginMutation } from "@/features/auth/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/getErrorMessage";
import Link from "next/link";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials(res));
      toast.success("Logged in succesfully.");
      router.push("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="text-center tracking-tight">
        <h2 className="text-lg font-semibold">Sign in to Studio</h2>
        <p className="text-sm font-extralight text-gray-500 mt-1">
          Welcome back! Please sign in to continue
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-gray-800 tracking-wide mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none placeholder:text-xs placeholder:text-gray-400 focus:border-studio transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-800 tracking-wide mb-1">
            Password
          </label>
          <div className="relative">
            <input
              required
              type={!showPassword ? "password" : "text"}
              placeholder="Enter your password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none  focus:border-[#E03E3E] transition-colors placeholder:text-xs placeholder:text-gray-400 pr-12"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <EyeIcon className=" text-gray-500 size-5" />
              ) : (
                <EyeOffIcon className=" text-gray-500 size-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black flex items-center justify-center text-gray-200 font-semibold tracking-wide rounded-lg py-2.5 text-xs hover:bg-black/80 disabled:bg-black/80 disabled:cursor-no-drop"
        >
          {!isLoading ? (
            <span>Login</span>
          ) : (
            <LoaderIcon className="size-4 animate-spin" />
          )}
        </button>
      </form>

      <div className="flex justify-center items-center gap-1">
        <p className="text-sm text-gray-500 tracking-tight">
          Don&apos;t have an account?
        </p>
        <Link
          href="/signup"
          className="text-sm text-studio font-medium hover:-translate-y-0.5 transition-transform ease-in duration-150"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}

export default Login;
