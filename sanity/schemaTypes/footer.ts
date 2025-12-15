import { defineType, defineField } from "sanity";

export const footerSchema = defineType({
	name: "footer",
	title: "Footer",
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
			name: "company",
			title: "Company Info",
			type: "object",
			fields: [
				defineField({
					name: "logoSrc",
					title: "Logo Image",
					type: "image",
					options: {
						hotspot: true,
					},
				}),
				defineField({
					name: "title",
					title: "Company Title",
					type: "string",
				}),
			],
		}),
		defineField({
			name: "socialLinks",
			title: "Social Links",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "platform",
							title: "Platform",
							type: "string",
							options: {
								list: [
									{ title: "Facebook", value: "facebook" },
									{ title: "Instagram", value: "instagram" },
									{ title: "Twitter/X", value: "twitter" },
									{ title: "LinkedIn", value: "linkedin" },
									{ title: "YouTube", value: "youtube" },
								],
							},
						}),
						defineField({
							name: "href",
							title: "URL",
							type: "url",
						}),
					],
				},
			],
		}),
		defineField({
			name: "disclosuresLinks",
			title: "Disclosure Links",
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
							name: "link",
							title: "Link",
							type: "url",
						}),
					],
				},
			],
		}),
		defineField({
			name: "disclosureStatement",
			title: "Disclosure Statement",
			type: "text",
		}),
		defineField({
			name: "SEBIRegistrationNumber",
			title: "SEBI Registration Number",
			type: "string",
		}),
		defineField({
			name: "officeDetails",
			title: "Office Details",
			type: "object",
			fields: [
				defineField({
					name: "researchAnalyst",
					title: "Research Analyst",
					type: "object",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
						}),
						defineField({
							name: "SEBIRegistrationNumber",
							title: "SEBI Registration Number",
							type: "string",
						}),
						defineField({
							name: "registeredOfficeAddress",
							title: "Registered Office Address",
							type: "text",
						}),
					],
				}),
				defineField({
					name: "SEBIOffice",
					title: "SEBI Office",
					type: "object",
					fields: [
						defineField({
							name: "headOfficeAddress",
							title: "Head Office Address",
							type: "text",
						}),
						defineField({
							name: "localOfficeAddress",
							title: "Local Office Address",
							type: "text",
						}),
					],
				}),
				defineField({
					name: "grievanceOfficer",
					title: "Grievance Officer",
					type: "object",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
						}),
						defineField({
							name: "telephoneNumber",
							title: "Telephone Number",
							type: "string",
						}),
						defineField({
							name: "emailID",
							title: "Email ID",
							type: "string",
						}),
					],
				}),
				defineField({
					name: "complianceOfficer",
					title: "Compliance Officer",
					type: "object",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
						}),
						defineField({
							name: "telephoneNumber",
							title: "Telephone Number",
							type: "string",
						}),
						defineField({
							name: "emailID",
							title: "Email ID",
							type: "string",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "disclosures",
			title: "Disclosures",
			type: "array",
			of: [{ type: "text" }],
		}),
		defineField({
			name: "footerBottom",
			title: "Footer Bottom",
			type: "object",
			fields: [
				defineField({
					name: "rights",
					title: "Rights Text",
					type: "string",
				}),
				defineField({
					name: "links",
					title: "Links",
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
									name: "link",
									title: "Link",
									type: "url",
								}),
							],
						},
					],
				}),
			],
		}),
	],
});
