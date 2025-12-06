import { defineType, defineField } from "sanity";

export const headerSchema = defineType({
	name: "header",
	title: "Header",
	type: "document",
	fields: [
		defineField({
			name: "logoImage",
			title: "Logo Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "brandName",
			title: "Brand Name",
			type: "string",
		}),
		defineField({
			name: "navLinks",
			title: "Navigation Links",
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
							name: "href",
							title: "Link",
							type: "string",
						}),
					],
				},
			],
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
