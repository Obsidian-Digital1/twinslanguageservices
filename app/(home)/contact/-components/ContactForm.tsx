"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { callApi } from "@zayne-labs/callapi";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IconBox } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { fadeUp, staggerContainer, VP } from "../../../-components/shared";

const contactFormSchema = z.object({
	email: z.email("Please enter a valid email address"),
	honeypot: z.string().max(0, "Invalid submission").optional(),
	message: z.string().min(10, "Message must be at least 10 characters"),
	name: z.string().min(2, "Name must be at least 2 characters"),
	phone: z.string().min(10, "Please enter a valid phone number"),
});

export function ContactForm() {
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			honeypot: "",
			message: "",
			name: "",
			phone: "",
		},
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		// Check honeypot
		if (data.honeypot) {
			toast.error("Invalid submission");
			return;
		}

		await callApi("@post/api/contact", {
			body: {
				email: data.email,
				message: data.message,
				name: data.name,
				phone: data.phone,
			},
			onError: ({ error }) => {
				toast.error("Failed to send message", {
					description: error.message,
				});
			},
			onSuccess: () => {
				setIsSuccess(true);
				form.reset();
				toast.success("Message sent successfully!", {
					description: "We'll get back to you as soon as possible.",
				});

				setTimeout(() => {
					setIsSuccess(false);
				}, 5000);
			},
		});
	});

	return (
		<section className="relative w-full overflow-hidden bg-white px-6 py-32 md:py-40 lg:px-[8%]">
			<span
				className="pointer-events-none absolute inset-0
					bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-size-[40px_40px]
					opacity-[0.03]"
			/>
			<div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-20 lg:flex-row lg:gap-16">
				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col gap-8 lg:sticky lg:top-32 lg:h-fit lg:w-[45%]"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<div className="h-[2px] w-16 bg-twin-accent-main" />
						<span className="font-mono text-sm tracking-[0.3em] text-twin-accent-main uppercase">
							Get in Touch
						</span>
					</motion.div>

					<motion.h2
						variants={fadeUp}
						className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-bold
							tracking-[-0.03em] text-twin-primary-main"
					>
						Send Us a
						<br />
						<span className="text-twin-accent-main italic">Message</span>
					</motion.h2>

					<motion.p
						variants={fadeUp}
						className="max-w-[500px] text-[18px] leading-[1.7] text-twin-primary-main/60"
					>
						Have a question or need more information? Fill out the form and we'll respond promptly.
						We're here to help with all your language service needs.
					</motion.p>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex-1"
				>
					{!isSuccess ?
						<Form.Root
							form={form}
							onSubmit={(event) => void onSubmit(event)}
							className="flex flex-col gap-8"
						>
							{/* Honeypot field for spam protection */}
							<Form.Field
								control={form.control}
								className="hidden"
								aria-hidden="true"
								name="honeypot"
							>
								<Form.Input type="text" tabIndex={-1} autoComplete="off" />
							</Form.Field>

							<motion.div variants={fadeUp}>
								<Form.Field control={form.control} name="name">
									<Form.Label
										className="mb-3 block font-mono text-xs tracking-[0.2em]
											text-twin-primary-main/60 uppercase"
									>
										Full Name
									</Form.Label>
									<Form.Input
										type="text"
										placeholder="John Doe"
										className="w-full border-0 border-b-2 border-twin-primary-main/10
											bg-transparent px-0 py-4 text-[18px] text-twin-primary-main transition-all
											duration-300 placeholder:text-twin-primary-main/30
											focus:border-twin-accent-main focus:ring-0 focus:outline-none"
									/>
									<Form.ErrorMessage className="mt-2 text-sm text-red-500" />
								</Form.Field>
							</motion.div>

							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								<motion.div variants={fadeUp}>
									<Form.Field control={form.control} name="email">
										<Form.Label
											className="mb-3 block font-mono text-xs tracking-[0.2em]
												text-twin-primary-main/60 uppercase"
										>
											Email Address
										</Form.Label>
										<Form.Input
											type="email"
											placeholder="john@example.com"
											className="w-full border-0 border-b-2 border-twin-primary-main/10
												bg-transparent px-0 py-4 text-[18px] text-twin-primary-main
												transition-all duration-300 placeholder:text-twin-primary-main/30
												focus:border-twin-accent-main focus:ring-0 focus:outline-none"
										/>
										<Form.ErrorMessage className="mt-2 text-sm text-red-500" />
									</Form.Field>
								</motion.div>

								<motion.div variants={fadeUp}>
									<Form.Field control={form.control} name="phone">
										<Form.Label
											className="mb-3 block font-mono text-xs tracking-[0.2em]
												text-twin-primary-main/60 uppercase"
										>
											Phone Number
										</Form.Label>
										<Form.Input
											type="tel"
											placeholder="(123) 456-7890"
											className="w-full border-0 border-b-2 border-twin-primary-main/10
												bg-transparent px-0 py-4 text-[18px] text-twin-primary-main
												transition-all duration-300 placeholder:text-twin-primary-main/30
												focus:border-twin-accent-main focus:ring-0 focus:outline-none"
										/>
										<Form.ErrorMessage className="mt-2 text-sm text-red-500" />
									</Form.Field>
								</motion.div>
							</div>

							<motion.div variants={fadeUp}>
								<Form.Field control={form.control} name="message">
									<Form.Label
										className="mb-3 block font-mono text-xs tracking-[0.2em]
											text-twin-primary-main/60 uppercase"
									>
										Your Message
									</Form.Label>
									<Form.TextArea
										placeholder="Tell us about your language service needs..."
										rows={6}
										className="w-full resize-none border-0 border-b-2 border-twin-primary-main/10
											bg-transparent px-0 py-4 text-[18px] text-twin-primary-main transition-all
											duration-300 placeholder:text-twin-primary-main/30
											focus:border-twin-accent-main focus:ring-0 focus:outline-none"
									/>
									<Form.ErrorMessage className="mt-2 text-sm text-red-500" />
								</Form.Field>
							</motion.div>

							<motion.div variants={fadeUp} className="mt-4">
								<Form.StateSubscribe>
									{({ isSubmitting }) => (
										<Form.Submit
											as={Button}
											disabled={isSubmitting}
											className="group relative overflow-hidden rounded-full
												bg-twin-primary-main px-10 py-5 font-semibold text-white transition-all
												duration-500 hover:bg-twin-accent-main
												hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] disabled:opacity-50"
										>
											<p className="z-10 flex items-center gap-3">
												Send Message
												<IconBox
													icon="lucide:send"
													className="size-5 transition-transform duration-300
														group-hover:translate-x-1 group-hover:-translate-y-1"
												/>
											</p>

											<span
												className="absolute inset-0 z-0 bg-linear-to-r from-twin-accent-main
													to-twin-primary-main opacity-0 transition-opacity duration-500
													group-hover:opacity-100"
											/>
										</Form.Submit>
									)}
								</Form.StateSubscribe>
							</motion.div>
						</Form.Root>
					:	<motion.div
							variants={fadeUp}
							className="flex flex-col items-center gap-8 rounded-3xl border-2
								border-twin-accent-main/20 bg-linear-to-br from-twin-accent-main/5 to-transparent
								p-12 text-center backdrop-blur-sm"
						>
							<div
								className="flex size-20 items-center justify-center rounded-full
									bg-twin-accent-main/10 text-twin-accent-main"
							>
								<IconBox icon="lucide:check-circle" className="size-10" />
							</div>

							<div className="flex flex-col gap-4">
								<h3 className="font-serif text-3xl font-bold text-twin-primary-main">
									Message Sent Successfully!
								</h3>
								<p className="text-[17px] leading-[1.7] text-twin-primary-main/70">
									Thank you for reaching out. We'll get back to you as soon as possible.
								</p>
							</div>

							<button
								type="button"
								onClick={() => setIsSuccess(false)}
								className="group mt-4 flex items-center gap-3 rounded-full border-2
									border-twin-primary-main bg-twin-primary-main px-8 py-4 font-semibold text-white
									transition-all duration-300 hover:bg-transparent hover:text-twin-primary-main"
							>
								Send Another Message
								<IconBox
									icon="lucide:arrow-right"
									className="size-5 transition-transform duration-300 group-hover:translate-x-1"
								/>
							</button>
						</motion.div>
					}
				</motion.div>
			</div>
		</section>
	);
}
