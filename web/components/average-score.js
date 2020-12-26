import { getPlayerAverageScore } from "../lib/functions";

export default function AverageScore({ player, games }) {
  return (
    <div>
      <p className="text-3xl font-semibold text-center text-gray-800">
        {getPlayerAverageScore(player, games)}
      </p>
      <p className="text-lg text-center text-gray-500">
        Gjennomsnitt over {games.length} slag
      </p>
    </div>
  );
}
