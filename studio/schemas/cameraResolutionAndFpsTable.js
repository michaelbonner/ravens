export default {
  name: 'cameraResolutionAndFpsTable',
  title: 'Camera Resolution and FPS Tables',
  type: 'object',
  fields: [
    {
      name: 'cameraResolutionAndFpsRows',
      title: 'Camera Resolution and FPS Rows',
      type: 'array',
      of: [
        {
          title: 'Camera Resolution and FPS Row',
          type: 'object',
          fields: [
            {
              title: 'Resolution',
              name: 'resolution',
              type: 'string',
            },
            {
              title: 'FPS',
              name: 'fps',
              type: 'string',
            },
          ],
        },
      ],
      options: {
        sortable: true,
        editModal: 'fullscreen',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'Camera Resolution and FPS Table',
      }
    },
  },
}
