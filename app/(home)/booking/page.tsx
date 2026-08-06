"use client";

import { motion } from "motion/react";
import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";
import { Main } from "../../-components";
import { fadeUp, scaleIn, staggerContainer, VP } from "../../-components/shared";

export default function BookingPage() {
	return (
		<Main>
			<header
				className="relative overflow-hidden bg-twin-primary-main px-6 pt-36 pb-20 text-white md:pt-44
					md:pb-24 lg:px-[8%]"
			>
				<motion.div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0
						bg-[linear-gradient(rgba(96,216,222,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,216,222,0.08)_1px,transparent_1px)]
						bg-size-[56px]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.35 }}
					transition={{ duration: 1.2 }}
				/>
				<motion.div
					aria-hidden="true"
					className="pointer-events-none absolute -top-40 right-[8%] size-120 rounded-full
						bg-twin-accent-main/10 blur-3xl"
					animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }}
					transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
				/>
				<motion.div
					variants={staggerContainer(0.1, 0.2)}
					initial="hidden"
					animate="show"
					className="relative mx-auto max-w-300"
				>
					<motion.p
						variants={fadeUp}
						className="mb-5 flex items-center gap-4 text-sm font-black tracking-[0.28em]
							text-twin-accent-main uppercase"
					>
						<span aria-hidden="true" className="h-px w-12 bg-current" />
						Schedule online
					</motion.p>
					<motion.h1
						variants={fadeUp}
						className="max-w-225 text-[clamp(3rem,7vw,5.75rem)] leading-[0.98] font-black
							tracking-[-0.04em]"
					>
						Choose a time that <span className="text-twin-accent-main">works for you.</span>
					</motion.h1>
					<motion.p variants={fadeUp} className="mt-7 max-w-175 text-lg/relaxed text-white/70">
						Use the calendar below to request a convenient time for your language-service needs.
					</motion.p>
				</motion.div>
			</header>

			<section
				className="relative overflow-hidden bg-twin-primary-subtle px-4 py-12 sm:px-6 md:py-20
					lg:px-[6%]"
			>
				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="relative mx-auto max-w-350"
				>
					<motion.div
						variants={fadeUp}
						className="mb-5 flex flex-col gap-3 rounded-2xl border border-twin-primary-main/10
							bg-white px-5 py-4 text-twin-primary-main shadow-sm sm:flex-row sm:items-center
							sm:justify-between"
					>
						<div className="flex items-center gap-3">
							<span
								className="flex size-10 shrink-0 items-center justify-center rounded-xl
									bg-twin-accent-subtle"
							>
								<IconBox aria-hidden="true" icon="lucide:calendar-check" className="size-5" />
							</span>
							<p className="text-sm/relaxed font-semibold">
								Select a service and an available appointment time.
							</p>
						</div>
						<a
							href={siteConfig.bookings.embedUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold
								text-twin-accent-darker no-underline transition-colors hover:bg-twin-accent-subtle"
						>
							Open calendar in a new tab
							<IconBox aria-hidden="true" icon="lucide:external-link" className="size-4" />
						</a>
					</motion.div>

					<motion.div
						variants={scaleIn}
						className="overflow-hidden rounded-3xl border border-twin-primary-main/10 bg-white
							shadow-[0_28px_80px_-35px_rgba(7,54,84,0.35)]"
					>
						{/* Microsoft Bookings requires its normal iframe permissions to operate. */}
						{/* eslint-disable-next-line react/dom-no-missing-iframe-sandbox */}
						<iframe
							title="Schedule an appointment with Twins Language Services"
							src={siteConfig.bookings.embedUrl}
							width="100%"
							height="900"
							allowFullScreen={true}
							className="block min-h-[75vh] w-full border-0"
						/>
					</motion.div>
				</motion.div>
			</section>
		</Main>
	);
}
