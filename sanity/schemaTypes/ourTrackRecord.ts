import { defineType, defineField } from "sanity";

export const ourTrackRecordSchema = defineType({
	name: "ourTrackRecord",
	title: "Our Track Record Section",
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
			name: "subtitle",
			title: "Subtitle",
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
			name: "stats",
			title: "Stats",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "value",
							title: "Value",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "string",
						}),
					],
				},
			],
		}),
	],
});
