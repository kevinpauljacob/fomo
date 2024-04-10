"use client";
import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { UserContext } from "@/context/userContext";
import { toast } from "react-toastify";

export default function SignIn() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.walletConnected) {
      toast.error("Wallet not connected", { position: "top-right" });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3333/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      setUser({
        ...user,
        email: email,
        isLoggedIn: true,
        token: token,
      });
      // Save token to local storage or state for future authenticated requests
      console.log("Login successful. Token:", token);
      toast.success("Login successful", { position: "top-right" });
      router.push("/events");
    } catch (error: any) {
      console.error("Login failed:", error.response.data.message);
      setError(error.response.data.message);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };
  return (
    <main className="flex items-center justify-center h-[calc(100vh-141px)] max-w-[640px] mx-auto">
      <div className="w-[350px] bg-black/10 border border-white/10 rounded-lg px-5 py-7">
        <h1 className="text-2xl text-white font-semibold">Welcome to Fomo</h1>
        <p className="text-sm text-white text-opacity-80 font-semibold mt-1">
          Please sign in or sign up below
        </p>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col my-3">
            <label
              htmlFor="email"
              className="text-sm text-white text-opacity-80 font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm text-white text-opacity-80 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
            />
          </div>
          <div className="flex justify-center mt-2">
            <WalletMultiButton />
          </div>
          <button
            type="submit"
            className="bg-white text-black font-bold text-md hover:bg-white/80 transition-all w-full rounded-lg p-2 mt-2"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </main>
  );
}
