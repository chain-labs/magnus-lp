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
			description: "Toggle to show or hide this section on the homepage.",
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
			name: "billingOptions",
			title: "Billing Options",
			type: "array",
			description:
				"Add billing options (e.g., Monthly, Yearly, Quarterly). Each option contains its own set of plans. The first option will be selected by default.",
			validation: (Rule) => Rule.required().min(1),
			of: [
				{
					type: "object",
					name: "billingOption",
					title: "Billing Option",
					fields: [
						defineField({
							name: "periodKey",
							title: "Period Key",
							type: "string",
							description:
								"Unique identifier (e.g., 'monthly', 'yearly', 'quarterly')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "periodLabel",
							title: "Period Label",
							type: "string",
							description:
								"Display name shown in toggle (e.g., 'Monthly', 'Yearly', 'Quarterly')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "priceSuffix",
							title: "Price Suffix",
							type: "string",
							description:
								"Text after price (e.g., '/mo', '/year', '/quarter')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "plans",
							title: "Plans",
							type: "array",
							description: "Add plans for this billing period. At least one plan is required.",
							validation: (Rule) => Rule.required().min(1),
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
											name: "price",
											title: "Price",
											type: "number",
											description: "Price amount for this plan",
											validation: (Rule) => Rule.required().min(0),
										}),
										defineField({
											name: "originalPrice",
											title: "Original Price (Optional)",
											type: "number",
											description: "Show a strikethrough price for discounts",
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
											price: "price",
										},
										prepare({ title, badge, primary, price }) {
											return {
												title: `${title} - ₹${price}`,
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
							title: "periodLabel",
							plans: "plans",
						},
						prepare({ title, plans }) {
							return {
								title: title,
								subtitle: `${plans?.length || 0} plan(s)`,
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
			billingOptions: "billingOptions",
		},
		prepare({ title, billingOptions }) {
			const totalPlans = billingOptions?.reduce(
				(acc: number, opt: { plans?: unknown[] }) => acc + (opt.plans?.length || 0),
				0
			) || 0;
			return {
				title: title || "Pricing Section",
				subtitle: `${billingOptions?.length || 0} billing option(s), ${totalPlans} total plan(s)`,
			};
		},
	},
});
