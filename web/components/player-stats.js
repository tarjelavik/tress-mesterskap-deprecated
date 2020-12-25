import { getAverageScore } from "../lib/functions";

export default function PlayerStats({ player, games }) {
  return (
    <div>
      <p>
        Gjennomsnitt: {getAverageScore(player, games)} på {games.length} spill
      </p>
      {/* {games && (<ul>{games.map((game) => (<li><pre>{JSON.stringify(game, null, 2)}</pre></li>))}</ul>)} */}
    </div>
  );
}
