import { MdLocalMovies as icon, MdTagFaces } from 'react-icons/md'

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
        title: `${selection.clientName} | ${selection.title}`,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      }
    },
  },
}
