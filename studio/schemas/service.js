import { MdLocalMovies as icon } from 'react-icons/md'

export default {
  name: 'services',
  title: 'Services',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'homeSummary',
      title: 'Home Summary',
      type: 'blockContent',
    },
    {
      name: 'thumb',
      title: 'Home Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'thumbWidth',
      title: 'Thumb Width (px)',
      type: 'number',
    },
    {
      name: 'thumbHeight',
      title: 'Thumb Height (px)',
      type: 'number',
    },
    {
      name: 'pageSections',
      type: 'array',
      title: 'Page sections',
      of: [
        { type: 'goldBar' },
        { type: 'platformPayloadTable' },
        { type: 'cameraPayloadTable' },
        { type: 'lensesPayloadTable' },
        {
          name: 'banner',
          title: 'Banner Image',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Banner Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'text',
              title: 'Text',
              type: 'blockContent',
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'title',
            },
            prepare(selection) {
              return {
                title: 'Banner Image',
                media: selection.media,
              }
            },
          },
        },
        {
          name: 'highlight',
          title: 'Service',
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'blockContent',
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subTitle: 'text',
              media: 'image',
            },
          },
        },
        {
          name: 'payloadContent',
          title: 'Payload Content',
          type: 'object',
          fields: [
            {
              name: 'remContent',
              title: 'REM Payload Content',
              type: 'text',
            },
            {
              name: 'extContent',
              title: 'EXT Payload Content',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: 'Rem/Ext Payload Content',
              }
            },
          },
        },
      ],
      options: {
        sortable: true,
        editModal: 'fullscreen',
      },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
        media: selection.media,
      }
    },
  },
}
