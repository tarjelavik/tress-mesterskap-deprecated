import { getMatchesWon } from "../lib/functions";

export default function MatchesWon({ player, games }) {
  return (
    <div>
      <p className="text-lg text-center text-gray-500">Vunnet</p>
      <p className="text-3xl font-semibold text-center text-gray-800">
        {getMatchesWon(player, games)}
      </p>
      <p className="text-lg text-center text-gray-500">
        av {games.length} slag
      </p>
    </div>
  );
}
