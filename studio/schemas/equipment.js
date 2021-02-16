import { MdLocalMovies as icon, MdTagFaces } from "react-icons/md";

export default {
    name: "equipment",
    title: "Equipment",
    type: "document",
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            name: "aerialImage",
            title: "Aerial Image",
            type: "image",
            options: {
              hotspot: true,
            },
          },
        {
            name: "aerialContentHeading",
            title: "Aerial Content Heading",
            type: "string",
        },
        {
            name: "aerialContent",
            title: "Aerial Content",
            type: "text",
        },
        {
            name: "platformTableRows",
            title: "Platform Table Rows",
            type: "array",
            of: [
              {
                title: "Platform Table Row",
                type: "object",
                fields: [
                  {
                    title: "Platform",
                    name: "platform",
                    type: "string",
                  },
                  {
                    title: "Weight",
                    name: "weight",
                    type: "string",
                  },
                  {
                    title: "REM Payload",
                    name: "remPayload",
                    type: "string",
                  },
                  {
                    title: "EXT Payload",
                    name: "extPayload",
                    type: "string",
                  },
                ],
              },
            ],
            options: {
              sortable: true,
              editModal: "popover",
            },
        },
        {
            name: "cameraTableRows",
            title: "Camera Table Rows",
            type: "array",
            of: [
              {
                title: "Camera Table Row",
                type: "object",
                fields: [
                  {
                    title: "Camera",
                    name: "camera",
                    type: "string",
                  },
                  {
                    title: "Weight",
                    name: "weight",
                    type: "string",
                  },
                  {
                    title: "REM Payload",
                    name: "remPayload",
                    type: "string",
                  },
                  {
                    title: "EXT Payload",
                    name: "extPayload",
                    type: "string",
                  },
                ],
              },
            ],
            options: {
              sortable: true,
              editModal: "popover",
            },
        },
        {
            name: "lensesTableRows",
            title: "Lenses Table Rows",
            type: "array",
            of: [
              {
                title: "Lenses Table Row",
                type: "object",
                fields: [
                  {
                    title: "Lenses",
                    name: "lense",
                    type: "string",
                  },
                  {
                    title: "Weight",
                    name: "weight",
                    type: "string",
                  },
                  {
                    title: "REM Payload",
                    name: "remPayload",
                    type: "string",
                  },
                  {
                    title: "EXT Payload",
                    name: "extPayload",
                    type: "string",
                  },
                ],
              },
            ],
            options: {
              sortable: true,
              editModal: "popover",
            },
        },
        {
            name: "remContent",
            title: "REM Payload Content",
            type: "text",
        },
        {
            name: "extContent",
            title: "EXT Payload Content",
            type: "text",
        },

        {
            name: "vehicleImage",
            title: "Vehicle Image",
            type: "image",
            options: {
              hotspot: true,
            },
          },
        {
            name: "vehicleContentHeading",
            title: "Vehicle Content Heading",
            type: "string",
        },
        {
            name: "vehicleContent",
            title: "Vehicle Content",
            type: "text",
        },
        {
            name: "highSpeedImage",
            title: "High Speed Image",
            type: "image",
            options: {
              hotspot: true,
            },
          },
        {
            name: "highSpeedContentHeading",
            title: "High Speed Content Heading",
            type: "string",
        },
        {
            name: "highSpeedContent",
            title: "High Speed Content",
            type: "text",
        },
    ],
    preview: {
        select: {
          title: 'title',
        },
      },
  };
  