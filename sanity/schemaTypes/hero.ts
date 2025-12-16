import { defineType, defineField } from "sanity";

export const heroSchema = defineType({
	name: "hero",
	title: "Hero Section",
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
			name: "subtitle",
			title: "Subtitle",
			type: "string",
			description: "e.g. 'Stock Picking, Simplified'",
		}),
		defineField({
			name: "headline",
			title: "Headline",
			type: "text",
			description: "Main headline text",
		}),
	],
});
