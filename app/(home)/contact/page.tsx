import { Main } from "@/app/-components";
import { ContactForm, ContactInfo, MapSection } from "./-components";

export default function ContactPage() {
	return (
		<Main>
			<ContactInfo />
			<ContactForm />
			<MapSection />
		</Main>
	);
}
