import { MdLocalMovies as icon } from 'react-icons/md'

export default {
  name: 'services-page',
  title: 'Services Page',
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
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: [
            { type: 'services' },
          ],
        }
      ],
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
