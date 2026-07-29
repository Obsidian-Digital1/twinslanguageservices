import { z } from "zod";

export const ContactRequestSchema = z.object({
	agree: z.boolean().refine(Boolean, "You must agree to be contacted"),
	appointmentDate: z.string().max(40, "Appointment date is too long"),
	email: z.email("Please enter a valid email address").max(254),
	firstName: z.string().trim().min(1, "First name is required").max(80),
	honeypot: z.string().max(0, "Invalid submission").optional(),
	lastName: z.string().trim().min(1, "Last name is required").max(80),
	message: z.string().trim().min(10, "Please tell us how we can help").max(5000),
	organization: z.string().trim().max(160),
	phone: z.string().trim().min(10, "Please enter a valid phone number").max(40),
	preferredLanguage: z.string().trim().max(100),
	serviceNeeded: z.string().trim().min(1, "Please select a service").max(120),
});

export type ContactRequestSchemaType = z.infer<typeof ContactRequestSchema>;
