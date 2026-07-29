import type { Metadata } from "next";
import { Main } from "@/app/-components";
import { ContactForm, ContactInfo } from "./-components";

export const metadata: Metadata = {
	alternates: { canonical: "/contact" },
	description:
		"Contact Twins Language Services to request interpretation, translation, or transcription support.",
	openGraph: {
		description:
			"Contact Twins Language Services to request interpretation, translation, or transcription support.",
		title: "Contact Twins Language Services",
		url: "/contact",
	},
	title: "Contact Us | Twins Language Services",
};

export default function ContactPage() {
	return (
		<Main>
			<ContactInfo />
			<ContactForm />
		</Main>
	);
}
