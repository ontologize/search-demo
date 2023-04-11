import { VehicleRecall } from "@/types";

interface ResultsListProps {
  results: VehicleRecall[] | undefined;
}

export default function ResultsList({ results }: ResultsListProps) {
  return (
    <ol className="flex list-decimal flex-col gap-2 text-gray-700 marker:mr-2 marker:text-gray-500">
      {results?.map((result) => (
        <li className="pl-4" key={result.properties?.nhtsaId}>
          <a
            className="block rounded-md border border-cyan-300 p-2 hover:border-cyan-600"
            target="_blank"
            href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/workspace/hubble/external/search/v2/?objectId=${result.rid}`}
          >
            <span className="mr-2 text-gray-400">
              {result.properties?.nhtsaId}
            </span>
            {result.properties?.subject}
          </a>
        </li>
      ))}
    </ol>
  );
}
