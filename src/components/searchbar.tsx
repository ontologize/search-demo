import LoadingSpinner from "./loadingSpinner";

interface SearchbarProps {
  objectType: string;
  query: string;
  isSearching: boolean;
  handleSearch: () => void;
  setQuery: (query: string) => void;
  labelText: string;
}

export default function SearchBar({
  objectType,
  query,
  isSearching,
  handleSearch,
  setQuery,
  labelText,
}: SearchbarProps) {
  return (
    <div className="flex w-96 flex-col">
      <label htmlFor="search" className="self-center pb-4 text-center">
        {labelText}
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
  );
}
