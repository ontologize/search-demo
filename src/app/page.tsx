"use client";

import LoadingSpinner from "@/components/loadingSpinner";
import { VehicleRecall } from "@/types";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const objectType = "VehicleRecall";
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<VehicleRecall[] | undefined>();
  const [isSearching, setIsSearching] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();

  function handleReset() {
    setResults(undefined);
    setNextPageToken(undefined);
  }

  function handleSearch() {
    if (query !== "") {
      setIsSearching(true);
      handleReset();
      fetch(`/api/single?objectType=${objectType}&query=${query}`)
        .then((resp) => resp.json())
        .then((respJson) => {
          setResults(respJson["data"]);
          setNextPageToken(respJson["nextPageToken"]);
          setIsSearching(false);
        });
    }
  }

  function handleLoadMore() {
    setIsSearching(true);
    fetch(
      `/api/single?objectType=${objectType}&query=${query}${
        nextPageToken ? "&nextPageToken=" + nextPageToken : ""
      }`
    )
      .then((resp) => resp.json())
      .then((respJson) => {
        setResults(results?.concat(respJson["data"]));
        setNextPageToken(respJson["nextPageToken"]);
        setIsSearching(false);
      });
  }

  useEffect(() => {
    if (query === "") {
      handleReset();
    }
  }, [query]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 p-24">
      <h2 className={`${inter.className} text-2xl font-semibold`}>
        Search Demo
      </h2>
      <div className="flex w-96 flex-col">
        <label htmlFor="search" className="self-center pb-4">
          Search all{" "}
          <pre className="inline-block font-semibold text-cyan-800">
            {objectType}
          </pre>{" "}
          objects
        </label>
        <div className="flex gap-4">
          <input
            type="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            className="flex w-20 justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            onClick={handleSearch}
          >
            {isSearching ? <LoadingSpinner /> : "Search"}
          </button>
        </div>
      </div>
      <ol className="flex list-decimal flex-col gap-2 text-gray-700 marker:mr-2 marker:text-gray-500">
        {results?.map((result) => (
          <li className="pl-4" key={result.properties?.nhtsaId}>
            <div className="w-full rounded-md border border-cyan-300 p-2">
              <span className="mr-2 text-gray-400">
                {result.properties?.nhtsaId}
              </span>
              <a
                className="hover:underline"
                target="_blank"
                href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/workspace/hubble/external/search/v2/?objectId=${result.rid}`}
              >
                {result.properties?.subject}
              </a>
            </div>
          </li>
        ))}
      </ol>
      {nextPageToken && (
        <button
          className="w-30 flex justify-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-center text-sm font-medium text-cyan-800 shadow-sm hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          onClick={handleLoadMore}
        >
          {isSearching ? <LoadingSpinner colorVariant="cyan" /> : "Load More"}
        </button>
      )}
    </main>
  );
}
