"use client";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortCode, setShortCode] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const notify = () => {
    toast.success("Barcode Downloaded Successfully", {
      style: {
        fontSize: window.innerWidth < 640 ? "12px" : "16px",
        padding: window.innerWidth < 640 ? "8px 12px" : "12px 16px",
      },
    });
  };

  const router = useRouter();
  useEffect(() => {
    router.replace("/signup");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setShortenedUrl(null);
    setShowModal(false);

    try {
      const res = await fetch(
        "https://urlbackend-production.up.railway.app/generate-qr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, shortCode }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await res.json();

      setShortenedUrl(data.url);
      setShowModal(true);
      toast.success("Url Shortened Succesfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("Something went wrong");
        toast.error("something went wrong");
      }
    }
  };

  return (
    <div className="bg-black h-screen pb-3 flex flex-col gap-1 mx-auto ">
      <section
        id="main-section"
        className="mt-10 mx-auto flex  items-start px-3 gap-3 justify-center py-3 md:py-12 lg:py-12"
      >
        <div className="flex flex-col max-w- items-center gap-3   mdp-10">
          <div className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 animate-spin-slow">
            <div className="bg-white rounded-full py-1 px-5">
              <p className="text-black text-sm text-center">
                URL Shortener, made for you
              </p>
            </div>
          </div>

          <div className="mb-4 mt-2">
            <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-bold">
              Get full control <br /> over short links
            </h1>
          </div>

          <div>
            <p className="text-white max-w-2xl text-sm text-center md:text-lg">
              Shorten, manage, and share your URLs effortlessly. Simplify link
              sharing, monitor engagement, and maintain full control over your
              online presence.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-3 "
          >
            <div className="w-full  mt-4 flex flex-col gap-1">
              <label htmlFor="" className="text-white">
                Url
              </label>
              <input
                type="text"
                value={url}
                placeholder="Paste long url and shorten it"
                onChange={(e) => setUrl(e.target.value)}
                className="
            w-full
            px-4
            py-3
            rounded-lg
            border
            border-gray-700
            bg-gray-900
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
            duration-200
            placeholder:text-sm
          "
              />
            </div>
            <div className="w-full  mt-4 flex flex-col gap-1">
              <label htmlFor="" className="text-white">
                ShortCode (Optional)
              </label>
              <input
                type="text"
                value={shortCode}
                placeholder="Enter Short Code"
                onChange={(e) => setShortCode(e.target.value)}
                className="
            w-full
            px-4
            py-3
            rounded-lg
            border
            border-gray-700
            bg-gray-900
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
            duration-200
            placeholder:text-sm
          "
              />
            </div>

            <button
              type="submit"
              className="
            w-full
          cursor-pointer
            px-2
            py-2
            rounded-lg
            bg-gradient-to-r from-blue-500 to-purple-600
            text-white
            font-semibold
            hover:from-purple-600 hover:to-blue-500
            shadow-lg
            hover:shadow-xl
            transition
            duration-300
          "
            >
              Shorten
            </button>
          </form>
          {shortenedUrl && showModal && (
            <Modal
              shortCode={shortenedUrl}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </section>

      <section>
        <div className=" mt-4 text-center space-y-2">
          <div className="inline-flex items-center justify-center space-x-3 bg-black/50 backdrop-blur-sm px-8 py-2 rounded-full border border-yellow-400/20">
            <span className="text-gray-200">
              <p className="text-sm">Beautifully crafted with</p>
            </span>
            <div className="relative">
              <span className="text-yellow-400 text-xl animate-bounce">❤️</span>
              <div className="absolute inset-0 text-yellow-400 text-xl animate-ping opacity-30">
                ❤️
              </div>
            </div>
            <span className="text-gray-200">by</span>
            <span className="text-yellow-400 font-bold text-lg tracking-wide hover:text-yellow-300 transition-all duration-300 hover:scale-105 cursor-pointer">
              <p className="text-sm">TimoBest</p>
            </span>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/50"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/50"></div>
          </div>

          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Copyright © 2025 by TimoBest
            <br />
            <span className="text-gray-500">All rights reserved</span>
          </p>
        </div>
      </section>
    </div>
  );
}
