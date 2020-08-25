let _ = require('lodash')

export default {
  title: 'Player result',
  name: 'playerResult',
  type: 'object',
  fieldsets: [{
    name: 'test',
    columns: 2
  }],
  fields: [
    {
      name: 'player',
      title: 'Player',
      fieldset: 'test',
      type: 'reference',
      to: [
        {type: 'player'}
      ]
    },
    {
      name: 'score',
      type: 'array',
      title: 'Score',
      fieldset: 'test',
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
