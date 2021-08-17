import { MdContacts as icon } from 'react-icons/md'

export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
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
      title: 'title',
    },
  },
}
