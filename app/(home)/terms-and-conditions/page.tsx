import type { Metadata } from "next";
import { LegalPage } from "../-components/LegalPage";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	alternates: { canonical: "/terms-and-conditions" },
	description: `Terms governing use of the ${siteConfig.name} website.`,
	title: `Terms & Conditions | ${siteConfig.name}`,
};

export default function TermsAndConditionsPage() {
	return (
		<LegalPage
			eyebrow="Website use"
			title="Terms & Conditions"
			intro={
				<p>
					These terms govern your use of this website. Submitting a request does not by itself
					create a service agreement.
				</p>
			}
			sections={[
				{
					content: (
						<p>
							This website provides general information about {siteConfig.name} and a way to
							request interpretation, translation, and transcription services. Website content
							is informational and is not legal, medical, or professional advice.
						</p>
					),
					title: "Website purpose",
				},
				{
					content: (
						<p>
							A contact-form submission or booking request is an inquiry only. Scope, interpreter
							or translator availability, timing, pricing, cancellation terms, and other service
							details must be confirmed separately. A binding service arrangement begins only
							when both parties agree to the applicable terms.
						</p>
					),
					title: "Service requests",
				},
				{
					content: (
						<ul>
							<li>Do not submit unlawful, deceptive, harmful, or abusive material.</li>
							<li>Do not interfere with the website, its security, or its availability.</li>
							<li>Do not use automated systems to overload or misuse the contact form.</li>
							<li>Provide information you are authorized to share and that is reasonably necessary.</li>
						</ul>
					),
					title: "Acceptable use",
				},
				{
					content: (
						<p>
							We work to keep website information accurate and current, but do not guarantee that
							all content will always be complete, error-free, or continuously available. We may
							update, suspend, or remove website content when necessary.
						</p>
					),
					title: "Accuracy and availability",
				},
				{
					content: (
						<p>
							This website links to or embeds third-party services, including Google Maps,
							social-media platforms, and booking tools. Those services are governed by their own
							terms and privacy practices, and {siteConfig.name} does not control their content or
							availability.
						</p>
					),
					title: "Third-party services",
				},
				{
					content: (
						<p>
							Website text, branding, graphics, and original design elements may not be copied,
							republished, or commercially exploited without permission, except where applicable
							law allows.
						</p>
					),
					title: "Intellectual property",
				},
				{
					content: (
						<p>
							To the extent permitted by law, the website is provided without warranties, and we
							are not liable for indirect or consequential loss arising solely from website use.
							These terms are governed by the laws of the Commonwealth of Pennsylvania, without
							regard to conflict-of-law principles.
						</p>
					),
					title: "Liability and governing law",
				},
				{
					content: (
						<p>
							Questions about these terms may be sent to{" "}
							<a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
						</p>
					),
					title: "Contact",
				},
			]}
		/>
	);
}
