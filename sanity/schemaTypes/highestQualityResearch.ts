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
			description: "Configure the column headers for the stock research table",
			initialValue: [
				{ label: "Ticker", align: "left" },
				{ label: "Price Zone", align: "left" },
				{ label: "Action", align: "left" },
				{ label: "Target", align: "left" },
				{ label: "Stop-loss", align: "left" },
				{ label: "Potential", align: "left" },
				{ label: "Duration", align: "left" },
				{ label: "Published", align: "left" },
			],
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
							initialValue: "left",
						}),
					],
				},
			],
		}),
		defineField({
			name: "blurredRowsCount",
			title: "Number of Blurred Rows",
			type: "number",
			description: "How many blurred/teaser rows to show for current stocks (set to 0 to hide)",
			initialValue: 3,
			validation: (Rule) => Rule.min(0).max(10),
		}),
		defineField({
			name: "unlockTitle",
			title: "Unlock Section Title",
			type: "string",
			description: "Text shown above the unlock button",
			initialValue: "You need a plan to unlock premium research insights",
		}),
		defineField({
			name: "unlockButtonText",
			title: "Unlock Button Text",
			type: "string",
			initialValue: "Unlock More Stocks Data",
		}),
		defineField({
			name: "unlockButtonLink",
			title: "Unlock Button Link",
			type: "string",
			description: "Where the unlock button should link to (e.g., #pricing or /signup)",
			initialValue: "#pricing",
		}),
	],
});
