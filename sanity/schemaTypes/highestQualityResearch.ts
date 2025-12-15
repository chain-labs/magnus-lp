import { defineType, defineField } from "sanity";

export const highestQualityResearchSchema = defineType({
	name: "highestQualityResearch",
	title: "Highest Quality Research Section",
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
			name: "displayLimit",
			title: "Number of Stocks to Display",
			type: "number",
			description: "How many stock entries to fetch and display from Airtable (e.g., 5 or 10)",
			initialValue: 5,
			validation: (Rule) => Rule.min(1).max(50),
		}),
		defineField({
			name: "tableHeaders",
			title: "Table Headers",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "label",
							title: "Label",
							type: "string",
						}),
						defineField({
							name: "align",
							title: "Alignment",
							type: "string",
							options: {
								list: [
									{ title: "Left", value: "left" },
									{ title: "Center", value: "center" },
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
