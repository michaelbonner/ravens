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
      name: 'seo_title',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seo_description',
      title: 'SEO Description',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
    },
    {
      name: 'video_id',
      title: 'Hero Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
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
      name: 'pageSections',
      type: 'array',
      title: 'Page sections',
      of: [
        { type: 'goldBar' },
        { type: 'platformPayloadTable' },
        { type: 'cameraPayloadTable' },
        { type: 'cameraResolutionAndFpsTable' },
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
      name: 'related_services',
      title: 'Related Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'services' }],
        },
      ],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
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
