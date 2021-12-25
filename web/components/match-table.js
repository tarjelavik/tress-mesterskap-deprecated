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
          <th
            style={{ verticalAlign: "bottom" }}
            className="px-2 py-1 bg-white border-green-500 border-b"
            key={index}
          >
            <div
              style={{
                textOrientation: "mixed",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {head}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );

  const results = data;

  const playerRow = results.map((result, index) => (
    <tr key={index}>
      <td className="border px-2 sm:py-1">
        <Link
          as={`/players/${result.player._id}`}
          href="/players/[result.player._id]"
        >
          <a>{result.player.name}</a>
        </Link>
        {result.isWinner ? " ⭐" : ""}
      </td>
      {result.score.map((round, index) => (
        <td className="border px-2 py-1" key={index}>
          {round}
        </td>
      ))}
      <td className="border px-2 py-1">
        {result.score.reduce((a, b) => a + b, 0)}
      </td>
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table-auto bg-green-100">
        {headerRow}
        <tbody>{playerRow}</tbody>
      </table>
    </div>
  );
}
