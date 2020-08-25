export default {
  name: 'player',
  type: 'document',
  title: 'Player',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'mainRepresentation',
      type: 'image',
      title: 'Image',
      description: 'Image of player',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainRepresentation'
    }
  }
}
