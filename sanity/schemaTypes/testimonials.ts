import { defineType, defineField } from "sanity";

export const testimonialsSchema = defineType({
	name: "testimonials",
	title: "Testimonials Section",
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
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "items",
			title: "Testimonial Items",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
						}),
						defineField({
							name: "imageUrl",
							title: "Image",
							type: "image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "positionAndCompany",
							title: "Position & Company",
							type: "string",
						}),
						defineField({
							name: "companyLogo",
							title: "Company Logo",
							type: "image",
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: "testimonial",
							title: "Testimonial",
							type: "text",
						}),
					],
				},
			],
		}),
	],
});
