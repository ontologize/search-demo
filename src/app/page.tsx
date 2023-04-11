"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 p-24">
      <a href="/">
        <h2 className={`${inter.className} text-3xl font-semibold`}>
          Search Demo
        </h2>
      </a>
      <ul className="flex w-96 flex-col gap-6 text-gray-700">
        <li>
          <a
            href="/simple"
            className="block rounded-md border border-cyan-500 p-4 hover:border-cyan-600 hover:bg-cyan-50"
          >
            <h3 className={`${inter.className} text-xl font-semibold`}>
              Simple Search
            </h3>
            <p>
              Search a single property of a single object type when the user
              types a query and clicks a button.
            </p>
          </a>
        </li>
        <li>
          <a
            href="/multi-prop"
            className="block rounded-md border border-cyan-500 p-4 hover:border-cyan-600 hover:bg-cyan-50"
          >
            <h3 className={`${inter.className} text-xl font-semibold`}>
              Simple Search: Multiple Properties
            </h3>
            <p>
              Search multiple properties of a single object type when the user
              types a query and clicks a button.
            </p>
          </a>
        </li>
        <li>
          <a
            href="/live"
            className="block rounded-md border border-cyan-500 p-4 hover:border-cyan-600 hover:bg-cyan-50"
          >
            <h3 className={`${inter.className} text-xl font-semibold`}>
              Live Search
            </h3>
            <p>
              Search multiple properties of a single object type as the user
              types a query.
            </p>
          </a>
        </li>
      </ul>
    </main>
  );
}
