import { defineType, defineField } from "sanity";

export const whatsappSchema = defineType({
	name: "whatsappLink",
	title: "Whatsapp Link Section",
	type: "document",
	fields: [
		defineField({
			name: "visible",
			title: "Visible",
			type: "boolean",
			initialValue: true,
			description: "Toggle to show or hide the Whatsapp link section.",
			options: {
				layout: "checkbox",
			},
		}),
		defineField({
			name: "whatsappNumber",
			title: "Whatsapp Number",
			type: "string",
			description:
				"Enter the Whatsapp number in international format (e.g., +1234567890).",
		}),
		defineField({
			name: "predefinedMessage",
			title: "Predefined Message",
			type: "string",
			description:
				"Enter a predefined message that will be sent when the link is clicked.",
		}),
	],
});
