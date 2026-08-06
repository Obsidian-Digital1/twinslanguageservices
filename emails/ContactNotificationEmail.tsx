import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Row,
	Section,
	Text,
} from "react-email";
import type { ContactFormFieldsSchemaType } from "@/lib/validation/contact";

export function ContactNotificationEmail(props: ContactFormFieldsSchemaType) {
	const {
		appointmentDate,
		email,
		firstName,
		lastName,
		message,
		organization,
		phone,
		preferredLanguage,
		serviceNeeded,
	} = props;

	const details = [
		["Name", `${firstName} ${lastName}`],
		["Email", email],
		["Phone", phone],
		["Organization", organization || "Not provided"],
		["Preferred Language", preferredLanguage || "Not provided"],
		["Service Needed", serviceNeeded],
		["Appointment Date", formatDate(appointmentDate)],
	] as const;

	return (
		<Html lang="en">
			<Head />
			<Preview>
				New {serviceNeeded} request from {firstName} {lastName}
			</Preview>
			<Body style={styles.body}>
				<Container style={styles.container}>
					<Section style={styles.header}>
						<Text style={styles.brand}>Twins Language Services</Text>
						<Text style={styles.tagline}>Breaking Language Barriers, Building Connections</Text>
					</Section>

					<Section style={styles.content}>
						<Heading as="h1" style={styles.heading}>
							New Contact Form Submission
						</Heading>
						<Text style={styles.intro}>
							A new message was submitted through the website contact form. Details are below.
						</Text>

						<Section style={styles.card}>
							<Text style={styles.cardTitle}>Contact Details</Text>
							{details.map(([label, value]) => (
								<Row key={label} style={styles.detailRow}>
									<Column style={styles.detailLabel}>{label}</Column>
									<Column style={styles.detailValue}>{value}</Column>
								</Row>
							))}
						</Section>

						<Section style={styles.messageCard}>
							<Text style={styles.cardTitle}>Message</Text>
							<Text style={styles.message}>{message}</Text>
						</Section>

						<Section style={styles.actions}>
							<Row>
								<Column style={styles.actionColumnLeft}>
									<Button href={`mailto:${email}`} style={styles.primaryButton}>
										Reply to {firstName}
									</Button>
								</Column>
								<Column style={styles.actionColumnRight}>
									<Button href={`tel:${phone}`} style={styles.secondaryButton}>
										Call {firstName}
									</Button>
								</Column>
							</Row>
						</Section>

						<Text style={styles.note}>
							This notification was generated automatically from the contact form at
							twinslanguageservices.com.
						</Text>
					</Section>

					<Section style={styles.footer}>
						<Text style={styles.footerBrand}>Twins Language Services</Text>
						<Text style={styles.footerText}>
							210 W Grant St., Lancaster, PA 17603
							<br />
							(717) 420-3157 · info@twinslanguageservices.com
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

ContactNotificationEmail.PreviewProps = {
	agree: true,
	appointmentDate: "2026-08-04",
	email: "maria.gonzalez@example.com",
	firstName: "Maria",
	honeypot: "",
	lastName: "Gonzalez",
	message:
		"I need an interpreter for an upcoming appointment and would like to confirm availability and pricing.",
	organization: "Lancaster General Health",
	phone: "(717) 555-0148",
	preferredLanguage: "Spanish",
	serviceNeeded: "Medical Interpretation",
} satisfies ContactFormFieldsSchemaType;

export default ContactNotificationEmail;

const styles = {
	actionColumnLeft: { paddingRight: "8px", width: "50%" },
	actionColumnRight: { paddingLeft: "8px", width: "50%" },
	actions: { marginTop: "26px" },
	body: {
		backgroundColor: "#eef3f5",
		fontFamily: "Arial, Helvetica, sans-serif",
		margin: "0",
		padding: "32px 16px",
	},
	brand: { color: "#fdfdfd", fontSize: "20px", fontWeight: "700", margin: "0" },
	card: {
		border: "1px solid #a9d4e2",
		borderRadius: "12px",
		overflow: "hidden",
	},
	cardTitle: {
		backgroundColor: "#f4f9fa",
		borderBottom: "1px solid #a9d4e2",
		color: "#144766",
		fontSize: "12px",
		fontWeight: "700",
		letterSpacing: "0.5px",
		margin: "0",
		padding: "16px 20px",
		textTransform: "uppercase" as const,
	},
	container: {
		backgroundColor: "#fdfdfd",
		borderRadius: "16px",
		margin: "0 auto",
		maxWidth: "600px",
		overflow: "hidden",
	},
	content: { padding: "32px" },
	detailLabel: {
		color: "#839aac",
		fontSize: "13px",
		padding: "10px 20px",
		verticalAlign: "top",
		width: "38%",
	},
	detailRow: { borderBottom: "1px solid #e6eef3" },
	detailValue: {
		color: "#073654",
		fontSize: "14px",
		fontWeight: "600",
		padding: "10px 20px",
		verticalAlign: "top",
	},
	footer: { backgroundColor: "#052940", padding: "24px 32px" },
	footerBrand: { color: "#fdfdfd", fontSize: "13px", fontWeight: "700", margin: "0 0 6px" },
	footerText: { color: "#a9d4e2", fontSize: "12px", lineHeight: "1.6", margin: "0" },
	header: { backgroundColor: "#073654", padding: "28px 32px" },
	heading: { color: "#073654", fontSize: "22px", margin: "0 0 8px" },
	intro: { color: "#4d7b96", fontSize: "14px", lineHeight: "1.6", margin: "0 0 24px" },
	message: {
		color: "#073654",
		fontSize: "14px",
		lineHeight: "1.65",
		margin: "0",
		padding: "18px 20px",
		whiteSpace: "pre-wrap" as const,
	},
	messageCard: {
		border: "1px solid #a9d4e2",
		borderRadius: "12px",
		marginTop: "20px",
		overflow: "hidden",
	},
	note: {
		borderTop: "1px solid #a9d4e2",
		color: "#839aac",
		fontSize: "12px",
		lineHeight: "1.6",
		margin: "24px 0 0",
		paddingTop: "16px",
	},
	primaryButton: {
		backgroundColor: "#073654",
		borderRadius: "10px",
		color: "#fdfdfd",
		display: "block",
		fontSize: "15px",
		fontWeight: "700",
		padding: "14px 20px",
		textAlign: "center" as const,
		textDecoration: "none",
	},
	secondaryButton: {
		backgroundColor: "#fdfdfd",
		border: "2px solid #073654",
		borderRadius: "10px",
		color: "#073654",
		display: "block",
		fontSize: "15px",
		fontWeight: "700",
		padding: "12px 20px",
		textAlign: "center" as const,
		textDecoration: "none",
	},
	tagline: { color: "#60d8de", fontSize: "12px", margin: "5px 0 0" },
};

function formatDate(value?: string) {
	if (!value) return "Not provided";

	const date = new Date(`${value}T12:00:00`);
	return Number.isNaN(date.getTime()) ? value : (
			date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
		);
}
