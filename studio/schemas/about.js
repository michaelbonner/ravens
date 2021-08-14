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
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'locations',
      title: 'Locations',
      type: 'blockContent',
    },
    {
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'people' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
