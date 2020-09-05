export default {
  name: 'match',
  type: 'document',
  title: 'Match',
  initialValue: () => ({
    name: 'Tresskamp - ' + (new Date()).toLocaleDateString(),
    gameStart: (new Date()).toISOString()
  }),
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'gameStart',
      type: 'date',
      title: 'Game start'
    },
    {
      name: 'results',
      type: 'array',
      of: [{type: 'playerResult'}],
      options: {
        editModal: 'popover'
      }
    },
    {
      name: 'mainRepresentation',
      type: 'image',
      title: 'Image',
      description: 'Image of match',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainRepresentation'
    }
  }
}
