import { Line } from "react-chartjs-2";
import { getResultScoreSeries } from "../lib/functions";

export default function ScoreGraph({ player, matches }) {
  const data = getResultScoreSeries(player, matches);
  return <Line data={data} width={400} height={200} />;
}
