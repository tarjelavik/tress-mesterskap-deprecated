import { parseISO, format } from "date-fns";
const _ = require("lodash");

export function getMatchesWon(player, games) {
  let results = games.map((game) => {
    return game.results;
  });

  const count = _.flattenDeep(results).filter(
    (score) => score.player._ref == player && score.isWinner
  );
  console.log(count);
  return count.length;
}

export function getPlayerAverageScore(player, games) {
  const playerResults = getPlayerResults(player, games);
  const gamesPlayed = playerResults.length;
  const totaltSum = _.sum(_.flattenDeep(playerResults));
  return Math.round(totaltSum / gamesPlayed);
}

export function getResultScoreAccumulatedAverageSeries(player, games) {
  const playerResults = getPlayerResults(player, games);
  const labels = games.map((game) => toDate(game.gameStart));
  const gamesPlayed = playerResults.length;
  const averagePerRound = playerResults.map((r) => _.sum(_.flattenDeep(r)));
  const accumulatedAverage = [];
  let acc = 0;
  for (let i = 0; i < gamesPlayed; i++) {
    acc = acc + averagePerRound[i];
    accumulatedAverage.push(Math.round(acc / (i + 1)));
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: player,
        ...graphDefault,
        data: accumulatedAverage,
      },
    ],
  };
  return data;
}

export function getResultScoreSeries(player, games) {
  const playerResults = getPlayerResults(player, games);
  const labels = games.map((game) => toDate(game.gameStart));
  const resultSerie = playerResults.map((round) => _.sum(_.flattenDeep(round)));
  const data = {
    labels: labels,
    datasets: [
      {
        label: player,
        ...graphDefault,
        data: resultSerie,
      },
    ],
  };
  return data;
}
export function getResultScorePerRoundSeries(player, games) {
  const playerResults = getPlayerResults(player, games);
  const labels = games.map((game) => toDate(game.gameStart));
  const transposed = transpose(playerResults);

  const colors = [
    "rgb(5, 150, 105)",
    "rgb(245, 158, 11)",
    "rgb(37, 99, 235)",
    "rgb(244, 114, 182)",
    "rgb(220, 38, 38)",
  ];

  const tressRoundLabels = [
    "To tress",
    "En av hver",
    "Tre tress",
    "To serier",
    "Sisten",
  ];

  const data = {
    labels: labels,
    datasets: [
      ...transposed.map((result, index) => {
        return {
          label: tressRoundLabels[index],
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: colors[index],
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
          data: result,
        };
      }),
    ],
  };
  return data;
}

function toDate(date) {
  const parsedDate = parseISO(date);
  return format(parsedDate, "dd.L.yyyy");
}

function getPlayerResults(player, games) {
  let results = games.map((game) => {
    return game.results;
  });

  results = _.flattenDeep(results);

  const playerResults = results
    .filter((score) => score.player._ref == player)
    .map((scores) => scores.score);
  return playerResults;
}

const transpose = (a) => a[0].map((_, c) => a.map((r) => r[c]));

const graphDefault = {
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
};
