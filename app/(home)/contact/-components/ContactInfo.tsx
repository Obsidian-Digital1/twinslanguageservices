"use client";

import { motion } from "motion/react";
import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";
import { fadeUp, staggerContainer, VP } from "../../../-components/shared";

type ContactInfoItem = {
	href?: string;
	icon: string;
	label: string;
	note?: string;
	value: string;
};

const CONTACT_INFO: ContactInfoItem[] = [
	{
		href: `tel:${siteConfig.contact.phone}`,
		icon: "lucide:phone",
		label: "Phone",
		value: siteConfig.contact.phone,
	},
	{
		href: `mailto:${siteConfig.contact.email}`,
		icon: "lucide:mail",
		label: "Email",
		value: siteConfig.contact.email,
	},
	{
		href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address.full)}`,
		icon: "lucide:map-pin",
		label: "Address",
		value: siteConfig.contact.address.full,
	},
	{
		icon: "lucide:clock",
		label: "Business Hours",
		value: siteConfig.contact.hours,
	},
];

export function ContactInfo() {
	return (
		<section
			className="relative w-full overflow-hidden bg-linear-to-br from-twin-primary-main
				via-twin-primary-main to-[#0a2540] px-6 py-32 md:py-40 lg:px-[8%]"
		>
			<div className="pointer-events-none absolute inset-0 opacity-30">
				<div
					className="absolute top-0 right-0 size-150 rounded-full bg-twin-accent-main/20
						blur-[120px]"
				/>
				<div className="absolute bottom-0 left-0 size-122.5 rounded-full bg-blue-400/10 blur-[100px]" />
			</div>

			<div className="relative mx-auto flex w-full max-w-350 flex-col gap-20">
				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col gap-8"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<div className="h-0.5 w-16 bg-twin-accent-main" />
						<span className="font-mono text-sm tracking-[0.3em] text-twin-accent-main uppercase">
							Let's Connect
						</span>
					</motion.div>

					<motion.h1
						variants={fadeUp}
						className="max-w-225 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-bold
							tracking-[-0.03em] text-white"
					>
						Start Your
						<br />
						<span className="text-twin-accent-main italic">Conversation</span>
					</motion.h1>

					<motion.p
						variants={fadeUp}
						className="max-w-150 text-[19px] leading-[1.7] text-white"
					>
						Whether you need interpretation, translation, or language consulting—we're ready to help
						you bridge communication gaps with precision and care.
					</motion.p>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.12)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
				>
					{CONTACT_INFO.map((info, index) => (
						<motion.div
							key={info.label}
							variants={fadeUp}
							className="group relative overflow-hidden rounded-2xl border border-white/10
								bg-white/5 p-8 backdrop-blur-sm transition-all duration-700
								hover:border-twin-accent-main/50 hover:bg-white/10"
							style={{
								animationDelay: `${index * 100}ms`,
							}}
						>
							<div
								className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
									duration-700 group-hover:opacity-100"
							>
								<div
									className="absolute inset-0 bg-linear-to-br from-twin-accent-main/10
										to-transparent"
								/>
							</div>

							<div className="relative flex flex-col gap-6">
								<span
									className="flex size-14 items-center justify-center rounded-xl
										bg-twin-accent-main/10 text-twin-accent-main transition-all duration-500
										group-hover:scale-110 group-hover:bg-twin-accent-main/20"
								>
									<IconBox icon={info.icon} className="size-6" />
								</span>

								<div className="flex flex-col gap-3">
									<h3 className="font-mono text-xs font-bold tracking-[0.2em] text-white uppercase">
										{info.label}
									</h3>

									{info.href ?
										<a
											href={info.href}
											className="text-[17px] leading-[1.4] font-semibold wrap-break-word
												text-white transition-colors duration-300 hover:text-twin-accent-main"
											target={info.href.startsWith("http") ? "_blank" : undefined}
											rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
										>
											{info.value}
										</a>
									:	<p
											className="text-[17px] leading-[1.4] font-semibold wrap-break-word
												text-white"
										>
											{info.value}
										</p>
									}

									{info.note && (
										<p className="text-[15px] leading-normal font-medium text-white">{info.note}</p>
									)}
								</div>

								<div
									className="absolute top-0 right-0 size-20 translate-x-10 -translate-y-10
										rounded-full bg-twin-accent-main/5 blur-2xl transition-all duration-700
										group-hover:translate-x-5 group-hover:-translate-y-5
										group-hover:bg-twin-accent-main/10"
								/>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
