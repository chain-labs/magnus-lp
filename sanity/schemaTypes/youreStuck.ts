import { defineType, defineField } from "sanity";

export const youreStuckSchema = defineType({
	name: "youreStuck",
	title: "You're Stuck Section",
	type: "document",
	fields: [
		defineField({
			name: "visible",
			title: "Visible",
			type: "boolean",
			initialValue: true,
			options: {
				layout: "checkbox",
			},
		}),
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
								"DO NOT CHANGE VALUES. Used to determine which icon to show.",
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
