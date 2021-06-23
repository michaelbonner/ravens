import { MdCameraRoll as icon } from 'react-icons/md'

export default {
  name: 'projects',
  title: 'Projects Page',
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
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
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
        title: `${selection.clientName ? `${selection.clientName} | ` : ''}${selection.title || ''}`,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      }
    },
  },
}
