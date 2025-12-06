import { defineType, defineField } from "sanity";

export const youreStuckSchema = defineType({
	name: "youreStuck",
	title: "You're Stuck Section",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "text",
		}),
		defineField({
			name: "items",
			title: "Items",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "iconType",
							title: "Icon Type",
							type: "string",
							description:
								"Icon identifier (e.g., 'sad', 'chart', 'people')",
						}),
						defineField({
							name: "title",
							title: "Title",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
						}),
					],
				},
			],
		}),
	],
});
