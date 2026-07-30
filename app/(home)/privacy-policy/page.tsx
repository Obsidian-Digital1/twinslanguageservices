import type { Metadata } from "next";
import { LegalPage } from "../-components/LegalPage";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	alternates: { canonical: "/privacy-policy" },
	description: `Learn how ${siteConfig.name} handles information submitted through this website.`,
	title: `Privacy Policy | ${siteConfig.name}`,
};

export default function PrivacyPolicyPage() {
	return (
		<LegalPage
			eyebrow="Your information"
			title="Privacy Policy"
			intro={
				<p>
					This policy explains what information this website receives, why it is used, and the
					choices available to you when contacting {siteConfig.name}.
				</p>
			}
			sections={[
				{
					content: (
						<p>
							When you submit the contact form, we receive the details you choose to provide,
							including your name, email address, phone number, organization, preferred language,
							requested service, appointment date, and message.
						</p>
					),
					title: "Information you provide",
				},
				{
					content: (
						<ul>
							<li>To respond to your inquiry and discuss the language service you requested.</li>
							<li>To coordinate scheduling, pricing, and service delivery.</li>
							<li>To protect the form and website against spam, fraud, and misuse.</li>
							<li>To meet applicable legal, accounting, or operational requirements.</li>
						</ul>
					),
					title: "How information is used",
				},
				{
					content: (
						<>
							<p>
								Contact submissions are delivered using Resend, an email delivery provider.
								The website also uses hosting and infrastructure providers needed to operate
								securely.
							</p>
							<p>
								The contact page includes an embedded Google Map. Google may receive technical
								information when the map loads and handles that information under its own
								privacy terms. Social-media and booking links also lead to third-party services.
							</p>
						</>
					),
					title: "Service providers and external content",
				},
				{
					content: (
						<p>
							Reasonable administrative and technical safeguards are used to protect submitted
							information. No internet transmission is completely risk-free. Information is kept
							only for as long as reasonably needed to respond, provide services, maintain
							necessary business records, and satisfy legal obligations.
						</p>
					),
					title: "Security and retention",
				},
				{
					content: (
						<p>
							You may ask to review, correct, or delete information you submitted, subject to
							applicable recordkeeping obligations. Contact us at{" "}
							<a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
						</p>
					),
					title: "Your choices",
				},
				{
					content: (
						<p>
							This website is not directed to children under 13. We may update this policy as the
							website or our practices change. The revised date will appear on this page.
						</p>
					),
					title: "Children and policy updates",
				},
			]}
		/>
	);
}
