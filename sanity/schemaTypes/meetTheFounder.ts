import { defineType, defineField } from "sanity";

export const meetTheFounderSchema = defineType({
	name: "meetTheFounder",
	title: "Meet The Founder Section",
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
			name: "sectionTitle",
			title: "Section Title",
			type: "string",
		}),
		defineField({
			name: "sectionSubtitle",
			title: "Section Subtitle",
			type: "string",
		}),
		defineField({
			name: "heroImage",
			title: "Hero Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "storyParagraphs",
			title: "Story Paragraphs",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "highlightedText",
							title: "Highlighted Text (White)",
							type: "string",
						}),
						defineField({
							name: "regularText",
							title: "Regular Text (Gray)",
							type: "text",
						}),
					],
				},
			],
		}),
		defineField({
			name: "founderImage",
			title: "Founder Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "founderDetails",
			title: "Founder Details",
			type: "object",
			fields: [
				defineField({
					name: "name",
					title: "Name",
					type: "string",
				}),
				defineField({
					name: "position",
					title: "Position",
					type: "string",
				}),
				defineField({
					name: "bio",
					title: "Bio",
					type: "text",
				}),
				defineField({
					name: "credentials",
					title: "Credentials",
					type: "array",
					of: [{ type: "string" }],
				}),
			],
		}),
	],
});
