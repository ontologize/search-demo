"use client";

import LoadingSpinner from "@/components/loadingSpinner";
import SearchBar from "@/components/searchbar";
import { NhtsaOdiComplaint, VehicleRecall } from "@/types";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useReducer, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface State {
  vehicleRecall: {
    results: VehicleRecall[];
    nextPageToken?: string;
  };
  nhtsaOdiComplaint: {
    results: NhtsaOdiComplaint[];
    nextPageToken?: string;
  };
}

interface Action {
  objectType?: "vehicleRecall" | "nhtsaOdiComplaint";
  results?: VehicleRecall[] | NhtsaOdiComplaint[];
  nextPageToken?: string;
}

export default function LiveSearchMultiPropMultiType() {
  // const objectTypes = ["VehicleRecall", "NhtsaOdiComplaint"];
  const pageSize = 10;
  // const initialNextPageTokens = useMemo(
  //   () => ({
  //     vehicleRecall: undefined,
  //     nhtsaOdiComplaint: undefined,
  //   }),
  //   []
  // );
  const [queryTerm, setQueryTermTerm] = useState<string>("");
  // const [results, setResults] = useState<VehicleRecall[] | undefined>();
  const [isSearching, setIsSearching] = useState(false);
  // const [nextPageTokens, setNextPageTokens] = useState<{
  //   [key: string]: string | undefined;
  // }>(initialNextPageTokens);

  function resultsReducer(state: State, action: Action) {
    if (!action.objectType) {
      return initial;
    }
    return {
      ...state,
      [action.objectType]: {
        ...state[action.objectType],
        results: [
          ...state[action.objectType].results,
          ...(action.results ?? []),
        ],
        nextPageTokens: action.nextPageToken,
      },
    };
  }

  const queries = useMemo(
    () => ({
      vehicleRecall: (qt: string) => ({
        type: "or",
        value: [
          { type: "allTerms", field: "properties.subject", value: qt },
          { type: "anyTerm", field: "properties.component", value: qt },
          {
            type: "allTerms",
            field: "properties.consequenceSummary",
            value: qt,
          },
          {
            type: "allTerms",
            field: "properties.correctiveAction",
            value: qt,
          },
          {
            type: "eq",
            field: "properties.recallType",
            value: qt
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
            value: qt,
          },
          {
            type: "and",
            value: [
              {
                type: "anyTerm",
                field: "properties.recallDescription",
                value: qt,
              },
              {
                type: "anyTerm",
                field: "properties.manufacturer",
                value: qt,
              },
            ],
          },
        ],
      }),
      nhtsaOdiComplaint: (qt: string) => ({
        type: "anyTerm",
        field: "properties.compdesc",
        value: qt,
      }),
    }),
    []
  );

  const initial: State = {
    vehicleRecall: {
      results: [],
      nextPageToken: undefined,
    },
    nhtsaOdiComplaint: {
      results: [],
      nextPageToken: undefined,
    },
  };

  const [state, dispatch] = useReducer(resultsReducer, initial);
  const objectTypes = Object.keys(state) as Array<keyof State>;

  function handleLoadMore() {
    setIsSearching(true);
    Promise.all(
      objectTypes.map((objectType) => {
        fetch(`/api/search?objectType=${objectType}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queries[objectType](queryTerm),
            pageSize,
            pageToken: state[objectType].nextPageToken,
          }),
        })
          .then((resp) => resp.json())
          .then((respJson) => {
            dispatch({
              objectType: objectType,
              results: [...state[objectType].results, ...respJson["data"]],
              nextPageToken: respJson["nextPageToken"],
            });
            // setResults(results?.concat(respJson["data"]));
            // setNextPageTokens({
            //   ...nextPageTokens,
            //   [objectType]: respJson["nextPageToken"],
            // });
          });
      })
    ).then(() => {
      setIsSearching(false);
    });
  }

  useEffect(() => {
    if (queryTerm === "") {
      dispatch({});
    }
  }, [queryTerm]);

  useEffect(() => {
    if (queryTerm !== "") {
      const handler = setTimeout(() => {
        setIsSearching(true);

        Promise.all(
          objectTypes.map((objectType) => {
            fetch(`/api/search?objectType=${objectType}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: queries[objectType](queryTerm),
                pageSize,
              }),
            })
              .then((resp) => resp.json())
              .then((respJson) => {
                dispatch({
                  objectType: objectType,
                  results: respJson["data"],
                  nextPageToken: respJson["nextPageToken"],
                });
                // setResults(respJson["data"]);
                // setNextPageTokens({
                //   ...nextPageTokens,
                //   [objectType]: respJson["nextPageToken"],
                // });
                // setIsSearching(false);
              });
          })
        ).then(() => {
          setIsSearching(false);
        });
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [queryTerm, objectTypes, queries]);

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
            {objectTypes.join(", ")}{" "}
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
      {(Object.keys(state) as Array<keyof State>).map((objectType) => (
        <div key={objectType} className="w-full md:w-9/12 lg:w-[600px]">
          <h3 className={`${inter.className} text-lg font-medium`}>
            {objectType}
          </h3>
          <ol className="flex w-full list-decimal flex-col gap-2 text-gray-700 marker:mr-2 marker:text-gray-500">
            {state[objectType].results &&
              (state[objectType].results.length === 0 ? (
                <p className="block w-full text-center text-gray-700">
                  No results
                </p>
              ) : (
                state[objectType].results.map((result) => (
                  <li
                    className="pl-4"
                    key={
                      objectType === "vehicleRecall"
                        ? result.properties?.nhtsaId!
                        : result.properties?.cmplid!
                    }
                  >
                    <a
                      className="block rounded-md border border-cyan-300 p-2 hover:border-cyan-600"
                      target="_blank"
                      href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/workspace/hubble/external/search/v2/?objectId=${result.rid}`}
                    >
                      <span className="mr-2 text-gray-400">
                        {objectType === "vehicleRecall"
                          ? result.properties?.nhtsaId!
                          : result.properties?.cmplid!}
                      </span>
                      {objectType === "vehicleRecall"
                        ? result.properties?.subject!
                        : result.properties?.compdesc!}
                    </a>
                  </li>
                ))
              ))}
          </ol>
        </div>
      ))}
      {isSearching && (
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
