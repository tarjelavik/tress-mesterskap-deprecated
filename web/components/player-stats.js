const _ = require('lodash');

export default function PlayerStats({ player, games }) {

  function getAverageScore(games) {
    let results = games.map(game => { return game.results })
    results = _.flattenDeep(results)
    const playerResults = results.filter(score => score.player._ref == player)
      .map(scores => scores.score)
    const gamesPlayed = playerResults.length
    const totaltSum = _.sum(_.flattenDeep(playerResults))
    return Math.round(totaltSum / gamesPlayed)
  }
  

  return (
    <div>
      <p>Gjennomsnitt: {getAverageScore(games)} på {games.length} spill</p>
      {/* {games && (<ul>{games.map((game) => (<li><pre>{JSON.stringify(game, null, 2)}</pre></li>))}</ul>)} */}
    </div>
  )
}
