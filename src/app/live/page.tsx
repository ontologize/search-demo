"use client";

import LoadingSpinner from "@/components/loadingSpinner";
import ResultsList from "@/components/resultsList";
import SearchBar from "@/components/searchbar";
import { Query, VehicleRecall } from "@/types";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function LiveSearchMultiProp() {
  const objectType = "VehicleRecall";
  const pageSize = 10;
  const [queryTerm, setQueryTermTerm] = useState<string>("");
  const [results, setResults] = useState<VehicleRecall[] | undefined>();
  const [isSearching, setIsSearching] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();

  const fetchResults = useCallback(() => {
    const query: Query = {
      type: "or",
      value: [
        { type: "allTerms", field: "properties.subject", value: queryTerm },
        { type: "anyTerm", field: "properties.component", value: queryTerm },
        {
          type: "allTerms",
          field: "properties.consequenceSummary",
          value: queryTerm,
        },
        {
          type: "allTerms",
          field: "properties.correctiveAction",
          value: queryTerm,
        },
        {
          type: "eq",
          field: "properties.recallType",
          value: queryTerm
            .split(" ")
            .map(
              (s) =>
                s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase()
            )
            .join(" "),
        },
        {
          type: "eq",
          field: "properties.nhtsaId",
          value: queryTerm,
        },
        {
          type: "and",
          value: [
            {
              type: "anyTerm",
              field: "properties.recallDescription",
              value: queryTerm,
            },
            {
              type: "anyTerm",
              field: "properties.manufacturer",
              value: queryTerm,
            },
          ],
        },
      ],
    };

    fetch(`/api/search?objectType=${objectType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, pageSize, pageToken: nextPageToken }),
    })
      .then((resp) => resp.json())
      .then((respJson) => {
        setResults(respJson["data"]);
        setNextPageToken(respJson["nextPageToken"]);
        setIsSearching(false);
      });
  }, [queryTerm, nextPageToken]);

  useEffect(() => {
    if (queryTerm === "") {
      setResults(undefined);
      setNextPageToken(undefined);
    } else {
      const handler = setTimeout(() => {
        setIsSearching(true);
        setResults(undefined);
        setNextPageToken(undefined);
        fetchResults();
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [queryTerm, fetchResults]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 p-24">
      <a href="/">
        <h2 className={`${inter.className} text-3xl font-semibold`}>
          Search Demo
        </h2>
      </a>
      <div className="prose">
        <p className="w-full p-4 md:w-9/12 lg:w-[500px]">
          Search multiple properties of all
          <span className="font-semibold text-cyan-700">
            {" "}
            {objectType}{" "}
          </span>{" "}
          objects as you type: subject, component, consequence summary,
          corrective action, manufacturer, recall description, recall type
        </p>
      </div>
      <SearchBar
        query={queryTerm}
        setQueryTerm={setQueryTermTerm}
        isSearching={isSearching}
        displaySearchButton={false}
      />
      <ResultsList results={results} />
      {(nextPageToken || isSearching) && (
        <button
          className="w-30 flex justify-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-center text-sm font-medium text-cyan-800 shadow-sm hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          onClick={() => {
            setIsSearching(true);
            fetchResults();
          }}
        >
          {isSearching ? <LoadingSpinner colorVariant="cyan" /> : "Load More"}
        </button>
      )}
    </main>
  );
}
