import { defineType, defineField } from "sanity";

export const investorTrapSchema = defineType({
	name: "investorTrap",
	title: "Investor Trap Section",
	type: "document",
	fields: [
		defineField({
			name: "visible",
			title: "Visible",
			type: "boolean",
			initialValue: true,
			description: "Toggle to show or hide this section on the homepage.",
			options: {
				layout: "checkbox", // or omit to use the default switch
			},
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "text",
		}),
		defineField({
			name: "cardPairs",
			title: "Card Pairs",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "left",
							title: "Left Card",
							type: "object",
							fields: [
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
							],
						}),
						defineField({
							name: "right",
							title: "Right Card",
							type: "object",
							fields: [
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
							],
						}),
						defineField({
							name: "topPosition",
							title: "Top Position (%)",
							type: "string",
							description:
								"DO NOT CHANGE VALUES. Used for positioning the card pair on the page.",
						}),
					],
				},
			],
		}),
	],
});
