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
			name: "subtitle",
			title: "Subtitle",
			type: "string",
		}),
		defineField({
			name: "chartTitle",
			title: "Chart Title",
			type: "string",
			initialValue: "Performance Comparison",
		}),
		defineField({
			name: "chartSubtitle",
			title: "Chart Subtitle",
			type: "string",
			initialValue: "Since Inception Returns",
		}),
		defineField({
			name: "companyPerformanceData",
			title: "Company Performance Data",
			type: "array",
			description: "Add Magnus first, then competitor companies",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "company",
							title: "Company Name",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "returnPercentage",
							title: "Return (%)",
							type: "number",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "color",
							title: "Bar Color (hex)",
							type: "string",
							description: "Optional custom color for the bar (e.g., #3b82f6)",
						}),
					],
					preview: {
						select: {
							company: "company",
							returnPercentage: "returnPercentage",
						},
						prepare({ company, returnPercentage }) {
							return {
								title: company,
								subtitle: `${returnPercentage > 0 ? '+' : ''}${returnPercentage}%`,
							};
						},
					},
				},
			],
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
