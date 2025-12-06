import { defineType, defineField } from "sanity";

export const heroSchema = defineType({
	name: "hero",
	title: "Hero Section",
	type: "document",
	fields: [
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
			name: "frequentlyAskedQuestions",
			title: "Frequently Asked Questions (Slider)",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "question",
							title: "Question",
							type: "string",
						}),
						defineField({
							name: "answer",
							title: "Answer",
							type: "text",
						}),
					],
				},
			],
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
