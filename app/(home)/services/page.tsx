"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { IconBox } from "@/components/common";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { Main } from "../../-components";
import { fadeUp, staggerContainer, VP } from "../../-components/shared";

const SERVICES = siteConfig.services;

export default function ServicesPage() {
	return (
		<Main>
			<HeroSection />
			<ProcessSection />
			<ServicesGridSection />
			<CTASection />
		</Main>
	);
}

function HeroSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-primary-main px-6 py-32
				md:py-40 lg:px-[8%]"
		>
			<div
				className="pointer-events-none absolute inset-0 z-1 opacity-[0.035] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
				}}
			/>

			<div
				className="pointer-events-none absolute -top-1/4 -right-1/4 size-150 rounded-full
					bg-twin-accent-main/10 blur-3xl"
			/>

			<motion.div
				variants={staggerContainer(0.1, 0.2)}
				initial="hidden"
				animate="show"
				className="relative z-10 flex w-full max-w-350 flex-col items-center gap-8 text-center"
			>
				<motion.div variants={fadeUp} className="flex items-center gap-4">
					<span className="block h-px w-12 bg-twin-accent-main/40" />
					<p className="font-black tracking-[0.28em] text-twin-accent-main uppercase lg:text-lg">
						Our Expertise
					</p>
					<span className="block h-px w-12 bg-twin-accent-main/40" />
				</motion.div>

				<motion.h1
					variants={fadeUp}
					className="max-w-250 text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] font-black
						tracking-[-0.03em] text-twin-white"
				>
					Precision-engineered{" "}
					<span
						className="bg-linear-to-r from-twin-accent-lighter via-twin-accent-main
							to-twin-accent-darker bg-clip-text text-transparent"
					>
						language services.
					</span>
				</motion.h1>

				<motion.p variants={fadeUp} className="max-w-175 text-lg leading-[1.7] text-twin-white/70">
					Comprehensive interpretation, translation, and transcription solutions tailored for
					healthcare, legal, and business professionals.
				</motion.p>
			</motion.div>

			<div className="absolute bottom-0 h-px w-full bg-linear-to-r from-transparent via-twin-accent-main/20 to-transparent" />
		</section>
	);
}

function ServicesGridSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-white px-6 py-28 md:py-36
				lg:px-[8%]"
		>
			<div className="flex w-full max-w-350 flex-col gap-16 md:gap-24">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{SERVICES.map((service, i) => (
						<motion.div
							key={service.id}
							variants={fadeUp}
							initial="hidden"
							whileInView="show"
							viewport={VP}
							className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border
								border-twin-primary-main/15 bg-twin-light-1 p-8 transition-all duration-500
								hover:border-twin-accent-main/40 hover:shadow-xl hover:shadow-twin-primary-main/5"
						>
							<div className="flex flex-col gap-8">
								<div
									className="flex size-14 items-center justify-center rounded-2xl border
										border-twin-primary-main/15 text-twin-primary-main/85 transition-all
										duration-500 group-hover:border-twin-accent-main/40
										group-hover:text-twin-accent-main"
								>
									<IconBox icon={service.icon} className="size-6" />
								</div>

								<div className="flex flex-col gap-4">
									<h3 className="text-2xl font-bold tracking-tight text-twin-primary-main">
										{service.title}
									</h3>
									<p className="text-[17px] leading-[1.7] text-twin-primary-main">
										{service.shortDescription}
									</p>
								</div>
							</div>

							<div className="mt-12 flex items-center justify-between border-t border-twin-primary-main/12 pt-8">
								<span className="font-mono text-sm tracking-widest text-twin-primary-main/70 uppercase">
									Service {String(i + 1).padStart(2, "0")}
								</span>
								<Button
									asChild={true}
									theme="ghost-light"
									size="sm"
									className="rounded-full px-5 text-twin-accent-darker hover:bg-twin-accent-main/5"
								>
									<Link href={siteConfig.bookings.url} className="flex items-center gap-2">
										Book Now
										<IconBox icon="lucide:arrow-right" className="size-4" />
									</Link>
								</Button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

function ProcessSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden
				bg-linear-to-b from-[#0a2540] to-twin-primary-main px-6 pt-40 pb-28
				md:pt-48 md:pb-36 lg:px-[8%]"
		>
			<div className="relative z-10 flex w-full max-w-350 flex-col gap-20">
				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col items-center gap-6 text-center"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-accent-main/40" />
						<span className="font-black tracking-[0.28em] text-twin-accent-main uppercase lg:text-lg">
							The Process
						</span>
						<span className="block h-px w-12 bg-twin-accent-main/40" />
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="max-w-200 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-white"
					>
						Professionalism in{" "}
						<span className="text-twin-accent-main italic">every step.</span>
					</motion.h2>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
				>
					{siteConfig.processSteps.map((step, i) => (
						<motion.div
							key={step.title}
							variants={fadeUp}
							className="group relative flex flex-col items-center gap-6 text-center lg:items-start
								lg:text-start"
						>
							<div className="relative">
								<div
									className="relative z-10 flex size-16 items-center justify-center rounded-2xl
										bg-twin-accent-main/15 text-twin-accent-main ring-4
										ring-twin-primary-main transition-transform duration-500
										group-hover:rotate-6"
								>
									<IconBox icon={step.icon} className="size-7" />
								</div>

								{i < siteConfig.processSteps.length - 1 && (
									<div
										className="absolute top-1/2 left-full -z-1 hidden h-px w-screen
											bg-twin-accent-main/30 lg:block lg:w-40"
									/>
								)}
							</div>

							<div className="flex flex-col gap-3">
								<span className="font-mono text-[11px] font-bold tracking-[0.3em] text-twin-accent-main/60 uppercase">
									Step {String(i + 1).padStart(2, "0")}
								</span>
								<h3 className="text-xl font-bold tracking-tight text-twin-white">
									{step.title}
								</h3>
								<p className="max-w-100 text-base leading-[1.7] text-twin-white/80">
									{step.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-primary-main px-6 py-28
				md:py-36 lg:px-[8%]"
		>
			<motion.div
				variants={staggerContainer(0.1)}
				initial="hidden"
				whileInView="show"
				viewport={VP}
				className="relative z-10 flex w-full max-w-225 flex-col items-center gap-10 text-center"
			>
				<motion.div variants={fadeUp} className="flex items-center gap-4">
					<span className="block h-px w-12 bg-twin-accent-main/40" />
					<span className="font-black tracking-[0.28em] text-twin-accent-main uppercase lg:text-lg">
						Get Started
					</span>
					<span className="block h-px w-12 bg-twin-accent-main/40" />
				</motion.div>

				<motion.h2
					variants={fadeUp}
					className="text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-[-0.03em]
						text-twin-white"
				>
					Ready to bridge the{" "}
					<span className="text-twin-accent-darker">language gap?</span>
				</motion.h2>

				<motion.p variants={fadeUp} className="max-w-130 text-lg leading-[1.7] text-twin-white/65">
					Whether you need immediate interpretation or long-term translation support, we're ready to
					deliver.
				</motion.p>

				<motion.div variants={fadeUp} className="mt-4 flex flex-col gap-4 md:flex-row md:gap-5">
					<Button
						asChild={true}
						theme="accent-gradient"
						size="large"
						className="group overflow-hidden rounded-full shadow-2xl transition-all duration-500
							hover:shadow-twin-accent-main/30 active:scale-[0.97]"
					>
						<Link href={siteConfig.bookings.url} className="flex items-center gap-3">
							Schedule Now
							<IconBox
								icon="lucide:arrow-up-right"
								className="size-5 transition-transform duration-300 group-hover:translate-x-0.5
									group-hover:-translate-y-0.5"
							/>
						</Link>
					</Button>

					<Button
						asChild={true}
						theme="ghost-dark"
						size="large"
						className="rounded-full border-twin-white/12 transition-all duration-500
							hover:border-twin-white/25"
					>
						<Link href="/contact" className="flex items-center gap-3">
							Contact Us
							<IconBox icon="lucide:mail" className="size-5" />
						</Link>
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
}
