"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    fetch("/api/single?objectType=VehicleRecall&query=chains")
      .then((resp) => resp.json())
      .then((respJson) => console.log(respJson));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
        Search Demo
      </h2>
    </main>
  );
}
