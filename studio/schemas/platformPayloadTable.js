export default {
  name: 'platformPayloadTable',
  title: 'Platform Payload Tables',
  type: 'object',
  fields: [
    {
      name: 'platformTableRows',
      title: 'Platform Table Rows',
      type: 'array',
      of: [
        {
          title: 'Platform Table Row',
          type: 'object',
          fields: [
            {
              title: 'Platform',
              name: 'platform',
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
        title: 'Platform Payload Table',
      }
    },
  },
}
