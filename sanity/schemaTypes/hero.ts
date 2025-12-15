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

		defineField({
			name: "skewedGridImage",
			title: "Skewed Grid Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
});
