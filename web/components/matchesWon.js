import { getWinsAndExpected } from "../lib/functions";

export default function MatchesWon({ player, games }) {
  const data = getWinsAndExpected(player, games);
  return (
    <div>
      <p className="text-lg text-center text-gray-500">Vunnet</p>
      <p className="text-3xl font-semibold text-center text-gray-800">
        {data.wins}
      </p>
      <p className="text-lg text-center text-gray-500">
        av {games.length} slag
      </p>
      <p class="text-center text-green-500 text-sm">
        <span class="font-bold">Forventet: {data.expectedWins}</span>
      </p>
    </div>
  );
}
