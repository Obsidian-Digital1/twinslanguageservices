/**
 * Site Configuration
 * Central configuration for Twins Language Services website
 */

import { defineEnumDeep } from "@zayne-labs/toolkit-type-helpers";

export const siteConfig = defineEnumDeep({
	bookings: {
		label: "Schedule Service",
		url: "https://outlook.office.com/book/TwinsLanguageServices2@twinslanguageservices.com/?ismsaljsauthenabled",
	},

	contact: {
		address: {
			city: "Lancaster",
			full: "210 W Grant St, Lancaster, PA 17603",
			state: "PA",
			street: "210 W Grant St",
			zip: "17603",
		},
		coordinates: {
			lat: 40.0455,
			lng: -76.3113,
		},
		email: "info@twinslanguageservices.com",
		hours: "24/7",
		phone: "(717)-420-3157",
	},
	description:
		"Professional interpretation, document translation, and transcription services in Lancaster, PA",

	name: "Twins Language Services",

	navigation: [
		{ href: "/", label: "Home" },
		{ href: "/about-us", label: "About Us" },
		{ href: "/services", label: "Services" },
		{
			href: "https://outlook.office.com/book/TwinsLanguageServices2@twinslanguageservices.com/?ismsaljsauthenabled",
			label: "Booking",
		},
		{ href: "/contact", label: "Contact Us" },
	],

	processSteps: [
		{
			description: "Reach out via phone, email, or our booking system with your language requirements.",
			icon: "lucide:send",
			title: "Initiate Request",
		},
		{
			description: "We analyze your needs and pair you with the best linguistic specialist.",
			icon: "lucide:search",
			title: "Matched Expertise",
		},
		{
			description: "Logistics, scheduling, and scope are finalized for complete alignment.",
			icon: "lucide:check-circle",
			title: "Final Confirmation",
		},
		{
			description:
				"A language professional delivers the agreed service with care and clear communication.",
			icon: "lucide:zap",
			title: "Service Delivery",
		},
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
			accent: "from-twin-accent-main/20 to-transparent",
			icon: "lucide:users",
			id: "in-person-interpreting",
			shortDescription:
				"Professional on-site interpretation for meetings, appointments, and high-stakes events requiring nuanced, real-time communication.",
			title: "In-Person Interpreting",
		},
		{
			accent: "from-twin-secondary-lighter/15 to-transparent",
			icon: "lucide:phone",
			id: "phone-interpreting",
			shortDescription:
				"Immediate over-the-phone language support for urgent, time-sensitive communication needs.",
			title: "Phone Interpreting",
		},
		{
			accent: "from-twin-accent-darker/15 to-transparent",
			icon: "lucide:monitor-play",
			id: "video-interpreting",
			shortDescription:
				"Remote interpretation via leading video platforms—bridging distance without sacrificing clarity.",
			title: "Virtual Interpreting",
		},
		{
			accent: "from-twin-primary-lighter/15 to-transparent",
			icon: "lucide:file-text",
			id: "document-translation",
			shortDescription:
				"Precise translation of legal documents, certificates, medical records, and business materials.",
			title: "Document Translation",
		},
		{
			accent: "from-twin-accent-main/15 to-transparent",
			icon: "lucide:headphones",
			id: "transcription",
			shortDescription:
				"Careful audio and video transcription prepared around the content, format, and timing of your request.",
			title: "Transcription",
		},
		{
			accent: "from-twin-secondary-main/15 to-transparent",
			icon: "lucide:scale",
			id: "court-legal",
			shortDescription:
				"Professional interpretation support for depositions, hearings, trials, and sensitive legal proceedings.",
			title: "Legal Interpretation",
		},
		{
			accent: "from-twin-primary-lighter/15 to-transparent",
			icon: "lucide:stethoscope",
			id: "doctors-appointments",
			shortDescription:
				"Specialized medical interpretation for patient consultations, hospital visits, and clinical appointments.",
			title: "Doctors Appointments",
		},
		{
			accent: "from-twin-accent-main/15 to-transparent",
			icon: "lucide:graduation-cap",
			id: "school-appointments",
			shortDescription:
				"Facilitating clear communication between educators and families for conferences, IEP meetings, and school events.",
			title: "School Appointments",
		},
		{
			accent: "from-twin-secondary-lighter/15 to-transparent",
			icon: "lucide:presentation",
			id: "company-meetings",
			shortDescription:
				"Professional linguistic support for corporate boardroom discussions, strategic negotiations, and internal briefings.",
			title: "Company Meetings",
		},
	],

	social: {
		facebook: "https://www.facebook.com/twinslanguageservices",
		instagram: "https://www.instagram.com/twinslanguageservices/",
		linkedin: "https://www.linkedin.com/in/twinslanguageservices",
	},

	tagline: "Breaking Language Barriers, Building Connections",
});

export type SiteConfig = typeof siteConfig;
