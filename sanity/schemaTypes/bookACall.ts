import { defineType, defineField } from "sanity";

export const bookACallSchema = defineType({
	name: "bookACall",
	title: "Book A Call Section",
	type: "document",
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
		defineField({
			name: "contactUsLink",
			title: "Contact Us Link",
			type: "url",
		}),
		defineField({
			name: "bookACallLink",
			title: "Book A Call Link",
			type: "url",
		}),
		defineField({
			name: "contactUsButtonText",
			title: "Contact Us Button Text",
			type: "string",
		}),
		defineField({
			name: "bookACallButtonText",
			title: "Book A Call Button Text",
			type: "string",
		}),
	],
});
