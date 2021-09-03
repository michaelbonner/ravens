import { MdCameraRoll as icon } from 'react-icons/md'

export default {
  name: 'projects',
  title: 'Work Page',
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
