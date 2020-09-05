let _ = require('lodash')

export default {
  title: 'Player result',
  name: 'playerResult',
  type: 'object',
  fields: [
    {
      name: 'player',
      title: 'Player',
      type: 'reference',
      to: [
        {type: 'player'}
      ]
    },
    {
      name: 'isWinner',
      title: 'Winner?',
      type: 'boolean'
    },
    {
      name: 'score',
      type: 'array',
      title: 'Score',
      of: [{type: 'number'}],
      validation: Rule => Rule.max(5)
    }
  ],
  preview: {
    select: {
      title: 'player.name',
      score: 'score'
    },
    prepare (selection) {
      const {title, score} = selection
      const scoreString = score.join(', ')
      const scoreTotal = _.sum(score)
      return {
        title: `${scoreString} = ${scoreTotal}`,
        subtitle: title
      }
    }
  }
}
