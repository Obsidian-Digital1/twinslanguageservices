"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { callApi } from "@zayne-labs/callapi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IconBox } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getRecaptchaToken, RECAPTCHA_USER_ERROR } from "@/lib/client/recaptcha";
import { siteConfig } from "@/lib/config/site";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/actions";
import { cnMerge } from "@/lib/utils/cn";
import {
	ContactFormFieldsSchema,
	type ContactFormFieldsSchemaType,
} from "@/lib/validation/contact";

const serviceOptions = [
	"In-Person Interpreting",
	"Phone Interpreting",
	"Video Interpreting",
	"Document Translation",
	"Legal Interpretation",
	"Medical Interpretation",
	"School Interpretation",
	"Business Meetings",
	"Other",
] as const;

const controlClassName = cnMerge(
	"min-h-13 w-full rounded-xl border-[1.5px] border-[#A9D4E2] bg-white px-4 py-3",
	"text-base text-twin-primary-main shadow-sm shadow-twin-primary-main/3 outline-none",
	"transition-[border-color,box-shadow] duration-200 placeholder:text-[#6f8798]",
	"hover:border-twin-accent-darker focus:border-twin-primary-main",
	"focus:ring-4 focus:ring-twin-accent-main/18"
);

const errorControlClassName = "border-twin-state-error-main focus:border-twin-state-error-main";

export function ContactForm() {
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm({
		defaultValues: {
			agree: false,
			appointmentDate: "",
			email: "",
			firstName: "",
			honeypot: "",
			lastName: "",
			message: "",
			organization: "",
			phone: "",
			preferredLanguage: "",
			serviceNeeded: "",
		},
		resolver: zodResolver(ContactFormFieldsSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		if (data.honeypot) {
			toast.error("Invalid submission");
			return;
		}

		let recaptchaToken: string;

		try {
			recaptchaToken = await getRecaptchaToken(RECAPTCHA_ACTIONS.contactSubmit);
		} catch {
			toast.error(RECAPTCHA_USER_ERROR);
			return;
		}

		await callApi("@post/api/contact", {
			baseURL: globalThis.location.origin,
			body: { ...data, recaptchaToken },
			onError: ({ error }) => {
				toast.error("Failed to send message", {
					description: error.message || RECAPTCHA_USER_ERROR,
				});
			},
			onSuccess: () => {
				setIsSuccess(true);
				form.reset();
				toast.success("Message sent successfully!", {
					description: "We'll get back to you as soon as possible.",
				});
			},
			throwOnError: true,
		});
	});

	return (
		<section
			id="contact-form"
			aria-label="Contact form and location"
			className="relative w-full overflow-hidden bg-twin-primary-subtle/65 px-5 py-24 md:px-8 md:py-32
				lg:px-[8%]"
		>
			<div
				className="relative mx-auto grid w-full max-w-350 gap-8
					lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]"
			>
				<div
					className="rounded-3xl border border-twin-primary-main/8 bg-white p-6
						shadow-[0_24px_70px_-30px_rgba(7,54,84,0.28)] sm:p-9 lg:p-11"
				>
					<div className="mb-9">
						<p
							className="mb-3 text-sm font-black tracking-[0.24em] text-twin-accent-darker
								uppercase"
						>
							Get in touch
						</p>
						<h2 className="text-3xl font-bold tracking-tight text-twin-primary-main md:text-4xl">
							Send Us a Message
						</h2>
						<p className="mt-3 max-w-2xl text-base/relaxed text-twin-primary-main/75">
							Fill out the form and our team will get back to you shortly.
						</p>
					</div>

					{isSuccess ?
						<SuccessMessage onReset={() => setIsSuccess(false)} />
					:	<Form.Root
							form={form}
							onSubmit={(event) => void onSubmit(event)}
							noValidate={true}
							className="flex flex-col gap-6"
						>
							<Form.Field name="honeypot" className="hidden" aria-hidden="true">
								<Form.Input type="text" tabIndex={-1} autoComplete="off" />
							</Form.Field>

							<div className="grid gap-6 sm:grid-cols-2">
								<FieldShared name="firstName" label="First Name" required={true}>
									<Form.Input
										type="text"
										autoComplete="given-name"
										className={controlClassName}
										classNames={{ error: errorControlClassName }}
									/>
								</FieldShared>
								<FieldShared name="lastName" label="Last Name" required={true}>
									<Form.Input
										type="text"
										autoComplete="family-name"
										className={controlClassName}
										classNames={{ error: errorControlClassName }}
									/>
								</FieldShared>
							</div>

							<div className="grid gap-6 sm:grid-cols-2">
								<FieldShared name="email" label="Email" required={true}>
									<Form.Input
										type="email"
										autoComplete="email"
										inputMode="email"
										className={controlClassName}
										classNames={{ error: errorControlClassName }}
									/>
								</FieldShared>
								<FieldShared name="phone" label="Phone Number" required={true}>
									<Form.Input
										type="tel"
										autoComplete="tel"
										inputMode="tel"
										className={controlClassName}
										classNames={{ error: errorControlClassName }}
									/>
								</FieldShared>
							</div>

							<div className="grid gap-6 sm:grid-cols-2">
								<FieldShared name="organization" label="Organization">
									<Form.Input
										type="text"
										autoComplete="organization"
										className={controlClassName}
									/>
								</FieldShared>
								<FieldShared name="preferredLanguage" label="Preferred Language">
									<Form.Input
										type="text"
										placeholder="e.g. Spanish"
										className={controlClassName}
									/>
								</FieldShared>
							</div>

							<div className="grid gap-6 sm:grid-cols-2">
								<FieldShared name="serviceNeeded" label="Service Needed" required={true}>
									<Form.Select
										className={controlClassName}
										classNames={{ error: errorControlClassName }}
									>
										<option value="">Select a service…</option>
										{serviceOptions.map((service) => (
											<option key={service} value={service}>
												{service}
											</option>
										))}
									</Form.Select>
								</FieldShared>
								<FieldShared name="appointmentDate" label="Appointment Date">
									<Form.Input type="date" className={controlClassName} />
								</FieldShared>
							</div>

							<FieldShared name="message" label="Message" required={true}>
								<Form.TextArea
									rows={6}
									placeholder="Tell us how we can help…"
									className={cnMerge(controlClassName, "min-h-36 resize-y")}
									classNames={{ error: errorControlClassName }}
								/>
							</FieldShared>

							<Form.Field name="agree" className="gap-1">
								<Form.Label
									className="flex cursor-pointer items-start gap-3 rounded-xl border
										border-transparent p-1 text-base/relaxed text-twin-secondary-main
										focus-within:border-twin-accent-main"
								>
									<Form.Input
										type="checkbox"
										className="mt-1 size-5 shrink-0 accent-twin-primary-main"
									/>
									<span>I agree to be contacted regarding my request.</span>
								</Form.Label>
								<Form.ErrorMessage
									className="mt-1 text-sm font-medium text-twin-state-error-darker"
								/>
							</Form.Field>

							<Form.StateSubscribe>
								{({ isSubmitting }) => (
									<Form.Submit
										as={Button}
										disabled={isSubmitting}
										className="mt-1 min-h-14 w-full rounded-xl bg-twin-primary-main px-8
											text-base font-bold text-white transition-colors
											hover:bg-twin-secondary-main disabled:cursor-wait disabled:opacity-60"
									>
										<span className="flex items-center justify-center gap-3">
											{isSubmitting ? "Sending…" : "Send Message"}
											<IconBox icon="lucide:send" className="size-5" />
										</span>
									</Form.Submit>
								)}
							</Form.StateSubscribe>
						</Form.Root>
					}
				</div>

				<Aside />
			</div>
		</section>
	);
}

function FieldShared(props: {
	children: React.ReactNode;
	label: string;
	name: keyof ContactFormFieldsSchemaType;
	required?: boolean;
}) {
	const { children, label, name, required } = props;

	return (
		<Form.Field name={name} className="min-w-0 gap-2">
			<Form.Label className="text-base font-bold text-twin-primary-main">
				{label}
				{required && (
					<span className="ml-1 text-twin-state-error-main" aria-hidden="true">
						*
					</span>
				)}
			</Form.Label>
			{children}

			<Form.ErrorMessage className="mt-1 text-sm font-medium text-twin-state-error-darker" />
		</Form.Field>
	);
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
	return (
		<div
			role="status"
			aria-live="polite"
			className="flex min-h-90 flex-col items-center justify-center gap-6 rounded-2xl border
				border-twin-accent-main bg-twin-accent-subtle p-8 text-center"
		>
			<div className="flex size-16 items-center justify-center rounded-full bg-twin-accent-main/20">
				<IconBox
					aria-hidden="true"
					icon="lucide:circle-check"
					className="size-9 text-twin-primary-main"
				/>
			</div>
			<div>
				<h3 className="text-2xl font-bold text-twin-primary-main">Message sent!</h3>
				<p className="mt-2 text-base text-twin-secondary-main">
					Thank you for reaching out. A member of our team will contact you soon.
				</p>
			</div>
			<Button type="button" onClick={onReset} className="rounded-xl bg-twin-primary-main text-white">
				Send another message
			</Button>
		</div>
	);
}

function Aside() {
	return (
		<aside className="flex flex-col gap-7">
			<div
				className="rounded-3xl bg-twin-primary-main p-8 text-white
					shadow-[0_20px_50px_-25px_rgba(7,54,84,0.7)]"
			>
				<div
					className="mb-5 flex size-12 items-center justify-center rounded-xl bg-twin-accent-main/15"
				>
					<IconBox
						aria-hidden="true"
						icon="lucide:phone-call"
						className="size-6 text-twin-accent-main"
					/>
				</div>
				<h3 className="text-xl font-bold">Need an Interpreter Quickly?</h3>
				<p className="mt-3 text-base/relaxed text-twin-accent-lighter">
					Call us directly for immediate assistance.
				</p>
				<a
					href={`tel:${siteConfig.contact.phone}`}
					className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-twin-accent-main px-5
						font-bold text-twin-primary-main no-underline transition-colors hover:bg-white"
				>
					{siteConfig.contact.phone}
				</a>
			</div>

			<div
				className="overflow-hidden rounded-3xl border border-[#A9D4E2] bg-white
					shadow-[0_20px_50px_-30px_rgba(7,54,84,0.35)]"
			>
				{/* Google Maps embeds require an unsandboxed iframe to function correctly. */}
				{/* eslint-disable-next-line react/dom-no-missing-iframe-sandbox */}
				<iframe
					title="Twins Language Services location map"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.666357715981!2d-76.31152382348908!3d40.03822797858855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c625e7a5ce8b8d%3A0x4dd7b5f55efbb22d!2sTwins%20Language%20Services!5e0!3m2!1sen!2sus!4v1785339021598!5m2!1sen!2sus"
					width="100%"
					height="340"
					loading="lazy"
					allowFullScreen={true}
					referrerPolicy="strict-origin-when-cross-origin"
					className="block border-0"
				/>
				<div className="flex items-start gap-3 p-6">
					<IconBox
						aria-hidden="true"
						icon="lucide:map-pin"
						className="mt-0.5 size-5 shrink-0 text-twin-accent-darker"
					/>
					<p className="text-base/relaxed text-twin-secondary-main">
						{siteConfig.contact.address.street}
						<br />
						{siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
						{siteConfig.contact.address.zip}
					</p>
				</div>
			</div>
		</aside>
	);
}
