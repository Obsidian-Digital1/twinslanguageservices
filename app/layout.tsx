import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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
	description: "",
	title: "",
};

function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" data-theme="light">
			<body className={cnJoin(inter.variable, poppins.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
