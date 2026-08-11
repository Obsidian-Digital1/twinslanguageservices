import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SonnerToaster } from "@/components/common";
import { siteConfig } from "@/lib/config/site";
import { cnJoin } from "@/lib/utils/cn";
import { Providers } from "./Providers";
import "../tailwind.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
	description: siteConfig.seo.description,
	keywords: siteConfig.seo.keywords,
	metadataBase: new URL("https://twinslanguageservices.com"),
	openGraph: {
		description: siteConfig.seo.description,
		locale: "en_US",
		siteName: siteConfig.name,
		title: siteConfig.seo.title,
		type: "website",
		url: "/",
	},
	title: siteConfig.seo.title,
};

export const viewport = {
	themeColor: "#073654",
};

function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" data-scroll-behavior="smooth" data-theme="light">
			<body className={cnJoin(inter.variable, poppins.variable)}>
				<a
					href="#main-content"
					className="fixed top-3 left-3 z-100 -translate-y-24 rounded-lg
						bg-twin-accent-main px-5 py-3 font-bold text-twin-primary-main no-underline
						transition-transform duration-160 ease-out
						focus-visible:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-3
						focus-visible:outline-white"
				>
					Skip to Main Content
				</a>
				<Providers>{children}</Providers>
				<SonnerToaster />
			</body>
		</html>
	);
}

export default RootLayout;
