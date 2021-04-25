export default {
  name: 'cameraPayloadTable',
  title: 'Camera Payload Tables',
  type: 'object',
  fields: [
    {
      name: 'cameraTableRows',
      title: 'Camera Table Rows',
      type: 'array',
      of: [
        {
          title: 'Camera Table Row',
          type: 'object',
          fields: [
            {
              title: 'Camera',
              name: 'camera',
              type: 'string',
            },
            {
              title: 'Weight',
              name: 'weight',
              type: 'string',
            },
            {
              title: 'REM Payload',
              name: 'remPayload',
              type: 'string',
            },
            {
              title: 'EXT Payload',
              name: 'extPayload',
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
        title: 'Camera Payload Table',
      }
    },
  },
}
