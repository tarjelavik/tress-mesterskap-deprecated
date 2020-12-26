import Link from "next/link";

export default function MatchTable({ data }) {
  const headers = [
    "",
    "To tress",
    "En av hver",
    "Tre tress",
    "To serier",
    "Sisten",
    "Totalt",
  ];

  const headerRow = (
    <thead>
      <tr>
        {headers.map((head, index) => (
          <th className="px-4 py-2 bg-white border-black border-b" key={index}>
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );

  const results = data;

  const playerRow = results.map((result, index) => (
    <tbody>
      <tr key={index}>
        <td className="border px-4 py-2">
          <Link
            as={`/players/${result.player._id}`}
            href="/players/[result.player._id]"
          >
            <a>{result.player.name}</a>
          </Link>
        </td>
        {result.score.map((round, index) => (
          <td className="border px-4 py-2" key={index}>
            {round}
          </td>
        ))}
        <td className="border px-4 py-2">
          {result.score.reduce((a, b) => a + b, 0)}
        </td>
      </tr>
    </tbody>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table-auto bg-gray-200">
        {headerRow}
        {playerRow}
      </table>
    </div>
  );
}
