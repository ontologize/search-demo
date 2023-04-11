"use client";

import LoadingSpinner from "@/components/loadingSpinner";
import ResultsList from "@/components/resultsList";
import SearchBar from "@/components/searchbar";
import { VehicleRecall } from "@/types";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function SimpleSearch() {
  const objectType = "VehicleRecall";
  const objectTypes = ["VehicleRecall"];
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
      <a href="/">
        <h2 className={`${inter.className} text-3xl font-semibold`}>
          Search Demo
        </h2>
      </a>
      <SearchBar
        objectType={objectType}
        query={query}
        handleSearch={handleSearch}
        setQuery={setQuery}
        isSearching={isSearching}
        labelText={`Search all properties of all ${objectTypes.join(
          ", "
        )} objects as you type`}
      />
      <ResultsList results={results} />
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
