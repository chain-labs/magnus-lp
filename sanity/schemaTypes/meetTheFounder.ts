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
			description: "Toggle to show or hide this section on the homepage.",
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
					type: "string",
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
