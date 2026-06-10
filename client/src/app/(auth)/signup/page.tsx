"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useSignupMutation } from "@/features/auth/authApi";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [registerUser, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const result = await registerUser(formData).unwrap();
      dispatch(setCredentials(result));
      router.push("/dashboard"); // Directs to workspace hub once registered
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || "Something went wrong during registration.",
      );
    }
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
        <p className="text-sm text-slate-400">
          Get started with your collaborative workspace today.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-400 hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
}
