"use client";

import LoadingSpinner from "@/components/loadingSpinner";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function SimpleSearch() {
  const objectType = "VehicleRecall";
  const [isSearching, setIsSearching] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 p-24">
      <a href="/">
        <h2 className={`${inter.className} text-3xl font-semibold`}>
          Search Demo
        </h2>
      </a>
      <div className="prose">
        <p className="w-full p-4 md:w-9/12 lg:w-[500px]">
          Search the subject property of all
          <span className="font-semibold text-cyan-700">
            {" "}
            {objectType}{" "}
          </span>{" "}
          objects
        </p>
      </div>
      {isSearching && (
        <button
          className="w-30 flex justify-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-center text-sm font-medium text-cyan-800 shadow-sm hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          onClick={() => {
            setIsSearching(true);
          }}
        >
          {isSearching ? <LoadingSpinner colorVariant="cyan" /> : "Load More"}
        </button>
      )}
    </main>
  );
}
