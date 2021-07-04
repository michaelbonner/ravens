import { MdCameraRoll as icon } from 'react-icons/md'

export default {
  name: 'project',
  title: 'Work',
  type: 'document',
  icon,
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    },
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    },
    {
      name: 'video_id',
      title: 'Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'extraPaddingOnVideo',
      title: 'Extra padding on video',
      type: 'boolean',
      description: 'Should we add a little padding to the top of the video?',
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
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          title: 'Credit',
          type: 'object',
          fields: [
            {
              title: 'Role',
              name: 'role',
              type: 'string',
            },
            {
              title: 'Value',
              name: 'value',
              type: 'string',
            },
          ],
        },
      ],
      options: {
        sortable: true,
        editModal: 'popover',
      },
    },
    {
      name: 'frames',
      title: 'Frames',
      type: 'array',
      of: [
        {
          name: 'frame',
          title: 'Frame',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        sortable: true,
        editModal: 'popover',
      },
    },
    {
      name: 'behindTheScenes',
      title: 'Behind The Scenes',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        sortable: true,
        editModal: 'popover',
      },
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
      clientName: 'clientName',
      title: 'title',
      date: 'date',
      media: 'poster',
    },
    prepare(selection) {
      return {
        title: `${selection.clientName ? `${selection.clientName} | ` : ''}${selection.title || ''}`,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      }
    },
  },
}
