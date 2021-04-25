import { MdPerson as icon } from 'react-icons/md'

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
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
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
