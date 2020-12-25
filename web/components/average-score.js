import { getAverageScore } from "../lib/functions";

export default function AverageScore({ player, games }) {
  return (
    <div>
      <p class="text-3xl font-semibold text-center text-gray-800">
        {getAverageScore(player, games)}
      </p>
      <p class="text-lg text-center text-gray-500">
        Gjennomsnitt over {games.length} slag
      </p>
    </div>
  );
}
