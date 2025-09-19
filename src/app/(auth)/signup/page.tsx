"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Call your signup API
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed.");
      setLoading(false);
      return;
    }

    // Auto-login after signup
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (loginRes?.error) {
      setError("Signup succeeded, but login failed.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-8 rounded-lg shadow bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for Ecoground</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as "STUDENT" | "TEACHER")}
              className="mt-1 block w-full px-3 py-2 border rounded"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}