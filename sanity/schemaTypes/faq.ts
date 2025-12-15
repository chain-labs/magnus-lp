import { defineType, defineField } from "sanity";

export const faqSchema = defineType({
	name: "faq",
	title: "FAQ Section",
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
			type: "string",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "contactButtonText",
			title: "Contact Button Text",
			type: "string",
		}),
		defineField({
			name: "items",
			title: "FAQ Items",
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
	],
});
