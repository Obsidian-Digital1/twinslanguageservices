import { Footer, Navbar } from "../-components";

function HomeLayout({ children }: LayoutProps<"/">) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}

export default HomeLayout;
