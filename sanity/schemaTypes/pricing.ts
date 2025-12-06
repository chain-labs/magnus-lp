import { defineType, defineField } from "sanity";

export const pricingSchema = defineType({
	name: "pricing",
	title: "Pricing Section",
	type: "document",
	fields: [
		defineField({
			name: "sectionLabel",
			title: "Section Label",
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
			name: "plans",
			title: "Pricing Plans",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "title",
							title: "Plan Title",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "string",
						}),
						defineField({
							name: "monthlyPrice",
							title: "Monthly Price",
							type: "number",
						}),
						defineField({
							name: "yearlyPrice",
							title: "Yearly Price",
							type: "number",
						}),
						defineField({
							name: "link",
							title: "CTA Link",
							type: "url",
						}),
						defineField({
							name: "features",
							title: "Features",
							type: "array",
							of: [{ type: "string" }],
						}),
						defineField({
							name: "primary",
							title: "Primary Plan (Highlighted)",
							type: "boolean",
						}),
					],
				},
			],
		}),
	],
});
