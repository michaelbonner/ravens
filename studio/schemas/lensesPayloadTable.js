export default {
	name: "lensesPayloadTable",
	title: "Lenses Payload Tables",
	type: "object",
	fields: [
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
							title: "Lense",
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
				editModal: "fullscreen",
			},
		},
	],
	preview: {
		select: {
		  title: "title",
		},
		prepare(selection) {
		  return {
			title: "Lenses Payload Table",
		  };
		},
	  },
}
  