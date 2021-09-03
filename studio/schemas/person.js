import { MdPersonPin as icon } from 'react-icons/md'

export default {
  name: 'people',
  title: 'People',
  type: 'document',
  icon: icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Please use "Firstname Lastname" format',
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
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
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
    select: { title: 'name', media: 'image' },
  },
}
