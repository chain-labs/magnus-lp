import { defineType, defineField } from "sanity";

export const investorTrapSchema = defineType({
	name: "investorTrap",
	title: "Investor Trap Section",
	type: "document",
	fields: [
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
						}),
					],
				},
			],
		}),
	],
});
