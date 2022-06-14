import { MdHome as icon } from 'react-icons/md'

export default {
  name: 'home',
  title: 'Home',
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
      name: 'video_id',
      title: 'Video ID',
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'services' }],
        },
      ],
    },
    {
      name: 'reel_heading',
      title: 'Reel Heading',
      type: 'string',
    },
    {
      name: 'reel_video_id',
      title: 'Reel Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the Reel video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'reel_video_width_aspect_ratio',
      title: 'Reel video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    },
    {
      name: 'reel_video_height_aspect_ratio',
      title: 'Reel video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
