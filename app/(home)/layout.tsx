import { siteConfig } from "@/lib/config/site";
import { Footer, Navbar } from "../-components";

function HomeLayout({ children }: LayoutProps<"/">) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": ["Organization", "LocalBusiness"],
		address: {
			"@type": "PostalAddress",
			addressLocality: siteConfig.contact.address.city,
			addressRegion: siteConfig.contact.address.state,
			postalCode: siteConfig.contact.address.zip,
			streetAddress: siteConfig.contact.address.street,
		},
		description: siteConfig.description,
		email: siteConfig.contact.email,
		name: siteConfig.name,
		sameAs: Object.values(siteConfig.social),
		telephone: siteConfig.contact.phone,
		url: "https://twinslanguageservices.com",
	};

	return (
		<>
			<Navbar />
			{children}
			<Footer />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData).replaceAll("<", String.raw`\u003c`),
				}}
			/>
		</>
	);
}

export default HomeLayout;
