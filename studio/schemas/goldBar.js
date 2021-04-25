export default {
  name: 'goldBar',
  title: 'Gold Bar',
  type: 'object',
  fields: [
    {
      name: 'leaveBlank',
      title: 'Show?',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'Gold Bar',
      }
    },
  },
}
