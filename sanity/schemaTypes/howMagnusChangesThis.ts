import { defineType, defineField } from "sanity";

export const howMagnusChangesThisSchema = defineType({
	name: "howMagnusChangesThis",
	title: "How Magnus Hathaway Changes This Section",
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
			name: "items",
			title: "Items",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "tag",
							title: "Tag",
							type: "string",
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
							name: "image",
							title: "Image",
							type: "image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "imageDirection",
							title: "Image Direction",
							type: "string",
							options: {
								list: [
									{ title: "Left", value: "left" },
									{ title: "Right", value: "right" },
								],
							},
						}),
					],
				},
			],
		}),
	],
});
