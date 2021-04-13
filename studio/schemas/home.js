export default {
    name: "home",
    title: "Home",
    type: "document",
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            name: "poster",
            title: "Poster Image",
            type: "image",
            options: {
              hotspot: true,
            },
        },
        {
            name: "heading",
            title: "Heading",
            type: "string",                        
        },
        {
            name: "text",
            title: "Text",
            type: "blockContent",                        
        }
    ],
    preview: {
        select: {
          title: 'title',
        },
      },
  };
  