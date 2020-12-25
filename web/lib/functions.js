import { parseISO, format } from "date-fns";
const _ = require("lodash");

export function getAverageScore(player, games) {
  let results = games.map((game) => {
    return game.results;
  });

  results = _.flattenDeep(results);

  const playerResults = results
    .filter((score) => score.player._ref == player)
    .map((scores) => scores.score);

  const gamesPlayed = playerResults.length;
  const totaltSum = _.sum(_.flattenDeep(playerResults));
  return Math.round(totaltSum / gamesPlayed);
}

export function getResultScoreSeries(player, games) {
  let results = games.map((game) => {
    return game.results;
  });

  results = _.flattenDeep(results);

  const playerResults = results
    .filter((score) => score.player._ref == player)
    .map((scores) => scores.score);

  const labels = games.map((game) => toDate(game.gameStart));

  const resultSerie = playerResults.map((round) => _.sum(_.flattenDeep(round)));

  const data = {
    labels: labels,
    datasets: [
      {
        label: player,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: resultSerie,
      },
    ],
  };

  console.log(JSON.stringify(data, null, 2));

  return data;
}

function toDate(date) {
  const parsedDate = parseISO(date);
  return format(parsedDate, "LLLL	d, yyyy");
}
