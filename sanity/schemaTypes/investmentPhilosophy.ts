import { defineType, defineField } from "sanity";

export const investmentPhilosophySchema = defineType({
	name: "investmentPhilosophy",
	title: "Investment Philosophy Section",
	type: "document",
	fields: [
		defineField({
			name: "visible",
			title: "Visible",
			type: "boolean",
			initialValue: true,
			description: "Toggle to show or hide this section on the homepage.",
			options: {
				layout: "checkbox",
			},
		}),
		defineField({
			name: "sectionLabel",
			title: "Section Label",
			type: "string",
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "items",
			title: "Philosophy Items",
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
