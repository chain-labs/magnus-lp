import { defineType, defineField } from "sanity";

export const pricingSchema = defineType({
	name: "pricing",
	title: "Pricing Section",
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
			name: "sectionLabel",
			title: "Section Label",
			type: "string",
			description: "Small label above the title (e.g., 'Pricing')",
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Main heading for the pricing section",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "Subheading text below the title",
		}),
		defineField({
			name: "billingPeriods",
			title: "Billing Periods",
			type: "array",
			description:
				"Add billing periods like Monthly, Yearly, Quarterly, etc. The first one will be selected by default.",
			of: [
				{
					type: "object",
					name: "billingPeriod",
					title: "Billing Period",
					fields: [
						defineField({
							name: "key",
							title: "Key",
							type: "string",
							description:
								"Unique identifier (e.g., 'monthly', 'yearly', 'quarterly')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "label",
							title: "Label",
							type: "string",
							description:
								"Display name (e.g., 'Monthly', 'Yearly', 'Quarterly')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "suffix",
							title: "Price Suffix",
							type: "string",
							description:
								"Text after price (e.g., '/mo', '/year', '/quarter')",
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: "label",
							subtitle: "key",
						},
					},
				},
			],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: "plans",
			title: "Pricing Plans",
			type: "array",
			description: "Add as many plans as you need (1, 2, 3, or more)",
			of: [
				{
					type: "object",
					name: "plan",
					title: "Plan",
					fields: [
						defineField({
							name: "title",
							title: "Plan Title",
							type: "string",
							description: "Name of the plan (e.g., 'Basic', 'Pro', 'Enterprise')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "string",
							description: "Short description of the plan",
						}),
						defineField({
							name: "badge",
							title: "Badge Text",
							type: "string",
							description: "Optional badge text (e.g., 'Most Popular', 'Best Value')",
						}),
						defineField({
							name: "prices",
							title: "Prices",
							type: "array",
							description:
								"Add a price for each billing period. The key must match the billing period key.",
							of: [
								{
									type: "object",
									name: "priceItem",
									title: "Price",
									fields: [
										defineField({
											name: "periodKey",
											title: "Billing Period Key",
											type: "string",
											description:
												"Must match one of the billing period keys (e.g., 'monthly', 'yearly')",
											validation: (Rule) => Rule.required(),
										}),
										defineField({
											name: "amount",
											title: "Price Amount",
											type: "number",
											description: "Price in dollars (or your currency)",
											validation: (Rule) => Rule.required().min(0),
										}),
										defineField({
											name: "originalAmount",
											title: "Original Amount (Optional)",
											type: "number",
											description:
												"Show a strikethrough price for discounts",
										}),
									],
									preview: {
										select: {
											periodKey: "periodKey",
											amount: "amount",
										},
										prepare({ periodKey, amount }) {
											return {
												title: `${periodKey}: $${amount}`,
											};
										},
									},
								},
							],
						}),
						defineField({
							name: "ctaText",
							title: "Button Text",
							type: "string",
							description: "Text on the CTA button (e.g., 'Get Started', 'Subscribe Now')",
							initialValue: "Get Started",
						}),
						defineField({
							name: "ctaLink",
							title: "Button Link",
							type: "url",
							description: "External URL where the button leads to",
							validation: (Rule) =>
								Rule.uri({
									scheme: ["http", "https"],
								}),
						}),
						defineField({
							name: "features",
							title: "Features",
							type: "array",
							description: "List of features included in this plan",
							of: [
								{
									type: "object",
									name: "feature",
									title: "Feature",
									fields: [
										defineField({
											name: "text",
											title: "Feature Text",
											type: "string",
											validation: (Rule) => Rule.required(),
										}),
										defineField({
											name: "included",
											title: "Included",
											type: "boolean",
											description: "Is this feature included in the plan?",
											initialValue: true,
										}),
									],
									preview: {
										select: {
											title: "text",
											included: "included",
										},
										prepare({ title, included }) {
											return {
												title: title,
												subtitle: included ? "✓ Included" : "✗ Not included",
											};
										},
									},
								},
							],
						}),
						defineField({
							name: "primary",
							title: "Highlight This Plan",
							type: "boolean",
							description: "Make this plan stand out with special styling",
							initialValue: false,
						}),
					],
					preview: {
						select: {
							title: "title",
							badge: "badge",
							primary: "primary",
						},
						prepare({ title, badge, primary }) {
							return {
								title: title,
								subtitle: [badge, primary ? "★ Highlighted" : null]
									.filter(Boolean)
									.join(" • "),
							};
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			plans: "plans",
		},
		prepare({ title, plans }) {
			return {
				title: title || "Pricing Section",
				subtitle: `${plans?.length || 0} plan(s)`,
			};
		},
	},
});
