import LoadingSpinner from "./loadingSpinner";

interface SearchbarProps {
  query: string;
  isSearching: boolean;
  handleSearch?: () => void;
  setQueryTerm: (query: string) => void;
  displaySearchButton?: boolean;
}

export default function SearchBar({
  query,
  isSearching,
  handleSearch,
  setQueryTerm,
  displaySearchButton = true,
}: SearchbarProps) {
  return (
    <div className="flex w-96 flex-col">
      <label htmlFor="search" className="hidden" />
      <div className="flex gap-4">
        <input
          placeholder="Search..."
          type="search"
          id="search"
          value={query}
          onChange={(e) => setQueryTerm(e.target.value)}
          className="grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
        {displaySearchButton && (
          <button
            disabled={isSearching}
            className={`flex w-20 justify-center rounded-md border border-transparent ${
              isSearching ? "bg-cyan-400" : "bg-cyan-600"
            } px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
            onClick={isSearching || !handleSearch ? undefined : handleSearch}
          >
            {isSearching ? <LoadingSpinner /> : "Search"}
          </button>
        )}
      </div>
    </div>
  );
}
