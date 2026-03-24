/**
 * Site Configuration
 * Central configuration for Twins Language Services website
 */

import { defineEnumDeep } from "@zayne-labs/toolkit-type-helpers";

export const siteConfig = defineEnumDeep({
	bookings: {
		label: "Schedule Service",
		url: "https://outlook.office365.com/book/TwinsLanguageServices@example.com/",
	},

	contact: {
		address: {
			city: "Lancaster",
			full: "1707 Marrietta Avenue, Lancaster, PA 17603",
			state: "PA",
			street: "1707 Marrietta Avenue",
			zip: "17603",
		},
		coordinates: {
			lat: 40.0379,
			lng: -76.3055,
		},
		email: "info@twinslanguageservices.com",
		phone: "(717)-420-3157",
	},
	description:
		"Professional interpretation, document translation, and transcription services in Lancaster, PA",

	name: "Twins Language Services",

	navigation: [
		{ href: "/", label: "Home" },
		{ href: "/about-us", label: "About Us" },
		{ href: "/services", label: "Services" },
		{ href: "/booking", label: "Booking" },
		{ href: "/contact", label: "Contact Us" },
	],

	seo: {
		description:
			"Professional language services in Lancaster, PA. Expert interpretation, document translation, and transcription for businesses, healthcare, legal, and more.",
		keywords: [
			"language services",
			"interpretation",
			"translation",
			"transcription",
			"Lancaster PA",
			"Spanish interpretation",
			"document translation",
			"legal interpretation",
		],
		title: "Twins Language Services | Interpretation, Translation & Transcription",
	},

	services: [
		{
			id: "in-person-interpreting",
			shortDescription: "Professional on-site interpretation for meetings, appointments, and events",
			title: "In-Person Interpreting",
		},
		{
			id: "phone-interpreting",
			shortDescription: "Immediate language support via telephone for urgent communication needs",
			title: "Phone Interpreting",
		},
		{
			id: "video-interpreting",
			shortDescription: "Remote interpretation services via video conferencing platforms",
			title: "Video/Virtual Interpreting",
		},
		{
			id: "document-translation",
			shortDescription: "Accurate translation of documents, certificates, and business materials",
			title: "Document Translation",
		},
		{
			id: "transcription",
			shortDescription: "Professional transcription services for audio and video content",
			title: "Transcription",
		},
		{
			id: "court-legal",
			shortDescription: "Certified interpretation for legal proceedings and court appearances",
			title: "Court/Legal Interpretation",
		},
	],

	social: {
		facebook: "https://www.facebook.com/twinslanguageservices",
		instagram: "https://www.instagram.com/twinslanguageservices",
		linkedin: "https://www.linkedin.com/company/twins-language-services",
	},

	tagline: "Breaking Language Barriers, Building Connections",
});

export type SiteConfig = typeof siteConfig;
