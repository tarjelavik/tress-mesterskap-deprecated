import { Line } from "react-chartjs-2";
import { getResultScoreSeries } from "../lib/functions";

export default function ScoreGraph({ player, games }) {
  const data = getResultScoreSeries(player, games);
  return <Line data={data} width={400} height={150} />;
}
