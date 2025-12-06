import { defineType, defineField } from "sanity";

export const investmentPhilosophySchema = defineType({
	name: "investmentPhilosophy",
	title: "Investment Philosophy Section",
	type: "document",
	fields: [
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
								"Icon identifier (e.g., 'chart', 'clipboard', 'trending', 'lightbulb')",
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
