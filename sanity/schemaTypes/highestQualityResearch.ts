import { defineType, defineField } from "sanity";

export const highestQualityResearchSchema = defineType({
	name: "highestQualityResearch",
	title: "Highest Quality Research Section",
	type: "document",
	fields: [
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
		defineField({
			name: "stockData",
			title: "Stock Data",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "ticker",
							title: "Ticker",
							type: "string",
						}),
						defineField({
							name: "logo",
							title: "Logo",
							type: "image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "priceZone",
							title: "Price Zone",
							type: "string",
						}),
						defineField({
							name: "action",
							title: "Action",
							type: "string",
							options: {
								list: [
									{ title: "BUY", value: "BUY" },
									{ title: "HOLD", value: "HOLD" },
									{ title: "SELL", value: "SELL" },
								],
							},
						}),
						defineField({
							name: "target",
							title: "Target",
							type: "string",
						}),
						defineField({
							name: "stopLoss",
							title: "Stop Loss",
							type: "string",
						}),
						defineField({
							name: "potential",
							title: "Potential",
							type: "string",
						}),
						defineField({
							name: "duration",
							title: "Duration",
							type: "string",
						}),
						defineField({
							name: "published",
							title: "Published",
							type: "string",
						}),
					],
				},
			],
		}),
		defineField({
			name: "ctaTitle",
			title: "CTA Title",
			type: "string",
		}),
		defineField({
			name: "ctaDescription",
			title: "CTA Description",
			type: "text",
		}),
		defineField({
			name: "ctaButtonText",
			title: "CTA Button Text",
			type: "string",
		}),
		defineField({
			name: "ctaButtonLink",
			title: "CTA Button Link",
			type: "url",
		}),
	],
});
