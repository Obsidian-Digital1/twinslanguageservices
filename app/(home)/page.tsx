"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { InfiniteMover } from "@/components/animated/common/inifinte-mover";
import { NavLink } from "@/components/common";
import { IconBox } from "@/components/common/IconBox";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { cnJoin } from "@/lib/utils/cn";
import { Main } from "../-components";
import { fadeUp, scaleIn, SectionLabel, staggerContainer, VP } from "../-components/shared";

const TRUST_CARDS = [
	{
		description:
			"Certified interpreters and translators with deep specialization across healthcare, legal, business, and community domains.",
		icon: "lucide:award",
		stat: "12+",
		statLabel: "Years",
		title: "Seasoned Expertise",
	},
	{
		description:
			"Every engagement is protected by strict ethical protocols. Your sensitive communications never leave our custody.",
		icon: "lucide:lock",
		stat: "100%",
		statLabel: "Private",
		title: "Trustworthy Partnership",
	},
	{
		description:
			"From live interpretation to document translation and transcription—one partner for every language need.",
		icon: "lucide:layers",
		stat: "6",
		statLabel: "Services",
		title: "Professional Excellence",
	},
] as const;

const SERVICES = siteConfig.services;

const PROCESS_STEPS = siteConfig.processSteps;

const LANGUAGE_ORBIT = ["Hola", "Bonjour", "Olá", "Hello", "Kikuyu", "Luo", "Kalenjin"] as const;

const REVIEWS = [
	{
		date: "March 2024",
		name: "Sarah M.",
		rating: 5,
		text: "Excellent interpretation services for our medical appointment. The interpreter was professional, punctual, and very clear. A truly dependable partner for our family.",
	},
	{
		date: "February 2024",
		name: "James R., Esq.",
		rating: 5,
		text: "Twins Language Services helped us with a complex legal document translation. The precision and attention to detail were exceptional. Highly recommend for any legal professional.",
	},
	{
		date: "January 2024",
		name: "Maria L.",
		rating: 5,
		text: "Very dependable transcription for our business meetings. We've been using them for months now in Lancaster, and they never miss a beat. Professional and efficient.",
	},
	{
		date: "Google Review",
		name: "Mahamadou Hassane",
		rating: 5,
		text: "Their service was professional, fast, and reliable from start to finish. Communication was clear, and my documents were handled carefully and delivered on time.",
	},
	{
		date: "Google Review",
		name: "Dianchik",
		rating: 5,
		text: "Everything was done on time, they kept me updated on the progress, and they responded to my questions by email quickly.",
	},
	{
		date: "Google Review",
		name: "Olamitobi Olatokun",
		rating: 5,
		text: "The interpreter was professional, punctual, and made communication clear and effective. I highly recommend them for anyone needing reliable language support.",
	},
	{
		date: "Google Review",
		name: "Erslaan Faridi",
		rating: 5,
		text: "My experience with Twins Language Services was great. Very professional team that can be trusted. Needed documents translated for our company.",
	},
	{
		date: "Google Review",
		name: "Luisa M.",
		rating: 5,
		text: "This translation service is excellent! 10/10, it gives fast service, un dia para otro results, great communication and flexible hours.",
	},
	{
		date: "Google Review",
		name: "Sore Abdoul Hazise",
		rating: 5,
		text: "Everything was done perfectly with professionalism. They are good communicants, fast, reliable and good pricing. I found all I needed in one place.",
	},
] as const;

export default function HomePage() {
	return (
		<Main>
			<HeroSection />
			<TrustCardsSection />
			<ServicesOverviewSection />
			<ProcessStepsSection />
			<ReviewsSection />
			<CTASection />
		</Main>
	);
}

function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-svh w-full flex-col overflow-hidden bg-twin-primary-main"
		>
			<div
				className="pointer-events-none absolute inset-0 z-1 opacity-[0.035] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
				}}
			/>

			<motion.div
				className="pointer-events-none absolute top-[-15%] right-[5%] z-0 aspect-square
					w-[min(900px,80vw)] rounded-full opacity-50 blur-[140px]"
			>
				<div
					className="size-full rounded-full
						bg-[conic-gradient(from_180deg,var(--color-twin-accent-main),var(--color-twin-secondary-lighter),var(--color-twin-accent-darker),var(--color-twin-accent-main))]"
				/>
			</motion.div>

			<div
				className="pointer-events-none absolute bottom-[-25%] left-[-15%] z-0 aspect-square
					w-[min(700px,70vw)] rounded-full bg-twin-secondary-main/30 opacity-40 blur-[120px]"
			/>

			<div
				className="pointer-events-none absolute top-0 left-0 z-2 h-full w-px bg-linear-to-b
					from-transparent via-twin-white/6 to-transparent"
				style={{ left: "8%" }}
			/>
			<div
				className="pointer-events-none absolute top-0 z-2 hidden h-full w-px bg-linear-to-b
					from-transparent via-twin-white/6 to-transparent lg:block"
				style={{ left: "50%" }}
			/>

			<div
				aria-hidden="true"
				className="group/orbit pointer-events-auto absolute top-[17%] right-[7%] z-4 hidden size-100
					xl:block"
			>
				<div className="absolute inset-0 rounded-full border border-twin-accent-main/12" />
				<div className="absolute inset-12 rounded-full border border-dashed border-twin-accent-main/18" />

				<div className="absolute inset-0 animate-language-orbit group-hover/orbit:paused">
					<span
						className="absolute top-7 left-1/2 size-2.5 -translate-x-1/2 rounded-full
							bg-twin-accent-main shadow-[0_0_24px_var(--color-twin-accent-main)]"
					/>
					<span
						className="absolute top-1/2 right-7 size-1.5 -translate-y-1/2 rounded-full bg-white/55"
					/>
					<span
						className="absolute bottom-7 left-1/2 size-2 -translate-x-1/2 rounded-full
							bg-twin-accent-lighter/70"
					/>

					{LANGUAGE_ORBIT.map((language, index) => (
						<span
							key={language}
							className="absolute inset-0"
							style={{ transform: `rotate(${(index * 360) / LANGUAGE_ORBIT.length}deg)` }}
						>
							<span className="absolute top-0 left-1/2 -translate-x-1/2">
								<span
									className="block"
									style={{ transform: `rotate(-${(index * 360) / LANGUAGE_ORBIT.length}deg)` }}
								>
									<span
										className="block animate-language-orbit-counter rounded-full border
											border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold tracking-wide
											text-white/70 backdrop-blur-sm group-hover/orbit:paused"
									>
										{language}
									</span>
								</span>
							</span>
						</span>
					))}
				</div>

				<motion.div
					className="absolute inset-25 flex flex-col items-center justify-center rounded-full border
						border-white/12 bg-twin-primary-main/35 text-center shadow-2xl
						shadow-twin-primary-darker/20 backdrop-blur-md"
					animate={{ y: [0, -8, 0] }}
					transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
				>
					<IconBox icon="lucide:languages" className="size-10 text-twin-accent-main" />
					<span className="mt-3 text-[10px] font-bold tracking-[0.28em] text-white/55 uppercase">
						Every voice
					</span>
					<span className="mt-1 text-sm font-bold text-white">understood</span>
				</motion.div>
			</div>

			<motion.div
				className="relative z-10 flex w-full grow flex-col justify-end px-6 pt-32 pb-28 md:px-16
					md:pt-36 md:pb-52 lg:px-[8%]"
			>
				<motion.div
					variants={staggerContainer(0.1, 0.3)}
					initial="hidden"
					animate="show"
					className="flex w-full flex-col"
				>
					<motion.div variants={fadeUp} className="mb-10 flex items-center gap-5">
						<span className="block h-px w-16 bg-twin-accent-main" />
						<span
							className="text-[11px] font-bold tracking-[0.3em] text-twin-accent-lighter/80
								uppercase"
						>
							Lancaster, PA · Est. 2012
						</span>
					</motion.div>

					<motion.h1
						variants={fadeUp}
						className="max-w-300 text-[clamp(3rem,9.5vw,9rem)] leading-[0.9] font-black
							tracking-[-0.04em] text-twin-white"
					>
						<span className="block">Breaking</span>
						<span className="block">Language</span>
						<span className="relative inline-block">
							<span
								className="bg-linear-to-r from-twin-accent-lighter via-twin-accent-main
									to-twin-accent-darker bg-clip-text text-transparent"
							>
								Barriers
							</span>
							<motion.span
								className="absolute -top-4 -right-8 text-twin-accent-main/60 md:-top-6
									md:-right-14"
								animate={{ rotate: [0, 8, -6, 0] }}
								transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
							>
								<IconBox icon="lucide:sparkles" className="size-6 md:size-10" />
							</motion.span>
						</span>
					</motion.h1>

					<div
						className="mt-16 flex flex-col gap-12 lg:mt-24 lg:flex-row lg:items-end
							lg:justify-between"
					>
						<motion.p
							variants={fadeUp}
							className="max-w-120 text-[17px] leading-[1.7] font-light text-twin-white/80"
						>
							Expert interpretation, document translation, and transcription services—engineered for
							healthcare, legal, business, and community organizations throughout Lancaster County.
						</motion.p>

						<motion.div
							variants={fadeUp}
							className="flex flex-col gap-5 md:flex-row md:items-center"
						>
							<Button
								asChild={true}
								theme="accent-gradient"
								size="medium"
								className="group overflow-hidden rounded-full transition-all duration-500
									hover:shadow-[0_0_50px_theme(--color-twin-accent-main/35%)] active:scale-[0.97]"
							>
								<NavLink href={siteConfig.bookings.url} className="flex items-center gap-3">
									Schedule Service
									<IconBox
										icon="lucide:arrow-up-right"
										className="size-5 transition-transform duration-300
											group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</NavLink>
							</Button>

							<Button
								asChild={true}
								theme="ghost-dark"
								size="medium"
								className="justify-start gap-4 rounded-full border-twin-white/10 px-6 text-base
									font-normal text-twin-white/70 transition-all duration-400
									hover:border-twin-white/20 hover:text-twin-white"
							>
								<a href={`tel:${siteConfig.contact.phone.replaceAll(/[^0-9]/g, "")}`}>
									{siteConfig.contact.phone}
								</a>
							</Button>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-20 bg-linear-to-t
					from-twin-white via-twin-white/60 to-transparent md:h-32"
			/>
		</section>
	);
}

function TrustCardsSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-white px-6 py-28 md:py-36
				lg:px-[8%]"
		>
			<div className="flex w-full max-w-350 flex-col gap-20">
				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col gap-16 lg:flex-row lg:items-stretch lg:gap-20"
				>
					<div className="flex flex-col gap-12 lg:w-[55%]">
						<div className="flex flex-col gap-6">
							<motion.div variants={fadeUp} className="flex items-center gap-4">
								<span className="block h-px w-12 bg-twin-primary-main/30" />
								<SectionLabel className="text-[12px] text-twin-primary-main/50">
									What Sets Us Apart
								</SectionLabel>
							</motion.div>
							<motion.h2
								variants={fadeUp}
								className="max-w-175 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-black
									tracking-[-0.03em] text-twin-primary-main"
							>
								Precision is not optional—
								<span className="text-twin-accent-darker">it&apos;s our standard.</span>
							</motion.h2>
						</div>

						<motion.div
							variants={staggerContainer(0.12)}
							initial="hidden"
							whileInView="show"
							viewport={VP}
							className="flex flex-col gap-5"
						>
							{TRUST_CARDS.map((card) => (
								<motion.div
									key={card.title}
									variants={fadeUp}
									className="group flex items-start gap-5 rounded-2xl border
										border-twin-primary-main/6 bg-twin-light-1 p-6 transition-all duration-500
										hover:border-twin-primary-main/12 hover:shadow-xl
										hover:shadow-twin-primary-main/4"
								>
									<div
										className="flex size-12 shrink-0 items-center justify-center rounded-xl
											border border-twin-primary-main/8 text-twin-primary-main/60 transition-all
											duration-500 group-hover:border-twin-accent-main/30
											group-hover:text-twin-accent-main"
									>
										<IconBox icon={card.icon} className="size-5" />
									</div>

									<div className="flex flex-col gap-1.5">
										<h3 className="text-lg font-bold tracking-tight text-twin-primary-main">
											{card.title}
										</h3>
										<p className="text-[15px] leading-[1.65] text-twin-primary-main/65">
											{card.description}
										</p>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>

					<motion.div
						variants={scaleIn}
						initial="hidden"
						whileInView="show"
						viewport={VP}
						className="relative min-h-100 w-full overflow-hidden rounded-3xl lg:w-[45%]"
					>
						<Image
							src="/hero-interpreter.png"
							alt="Professional interpreter facilitating a business meeting"
							fill={true}
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 45vw"
						/>

						<div className="absolute inset-0 bg-linear-to-t from-twin-primary-main/30 to-transparent" />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

function ServicesOverviewSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-primary-main px-6 py-28
				md:py-36 lg:px-[8%]"
		>
			<div
				className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
					backgroundSize: "80px 80px",
				}}
			/>

			<div className="relative z-10 flex w-full max-w-350 flex-col gap-20">
				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col items-center gap-8 text-center"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-accent-main/40" />
						<SectionLabel className="text-[12px] text-twin-accent-main/80">Services</SectionLabel>
						<span className="block h-px w-12 bg-twin-accent-main/40" />
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="max-w-200 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-white"
					>
						Nine services. <span className="text-twin-accent-main">One mission.</span>
					</motion.h2>
					<motion.p variants={fadeUp} className="max-w-140 text-lg leading-[1.7] text-twin-white/65">
						Every service is designed to eliminate language barriers with surgical precision.
					</motion.p>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
				>
					{SERVICES.map((service, i) => (
						<motion.div
							key={service.id}
							variants={fadeUp}
							className="group relative flex flex-col justify-between overflow-hidden rounded-3xl
								border border-twin-white/6 bg-twin-white/3 p-10 backdrop-blur-sm transition-all
								duration-500 hover:border-twin-accent-main/20 hover:bg-twin-white/6"
						>
							<span className="text-[11px] font-bold tracking-[0.3em] text-twin-white/35 uppercase">
								{String(i + 1).padStart(2, "0")}
							</span>

							<div
								className="mt-8 flex size-14 items-center justify-center rounded-2xl border
									border-twin-white/12 text-twin-white/70 transition-all duration-500
									group-hover:border-twin-accent-main/30 group-hover:text-twin-accent-main
									group-hover:shadow-[0_0_30px_theme(--color-twin-accent-main/15%)]"
							>
								<IconBox icon={service.icon} className="size-6" />
							</div>

							<div className="mt-auto flex flex-col gap-4 pt-8">
								<h3 className="text-2xl font-bold tracking-tight text-twin-white">
									{service.title}
								</h3>
								<p className="max-w-[400px] text-[16px] leading-[1.7] text-twin-white/65">
									{service.shortDescription}
								</p>
							</div>

							<div
								className="absolute top-8 right-8 flex size-10 items-center justify-center
									rounded-full text-twin-white/0 transition-all duration-500
									group-hover:text-twin-white/40"
							>
								<IconBox icon="lucide:arrow-up-right" className="size-5" />
							</div>

							<Link href="/services" className="absolute inset-0 z-20 focus:outline-hidden">
								<span className="sr-only">View {service.title} details</span>
							</Link>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					variants={fadeUp}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex justify-center"
				>
					<Button
						asChild={true}
						theme="ghost-dark"
						size="medium"
						className="group rounded-full border-twin-white/15 px-10 transition-all duration-500
							hover:border-twin-accent-main/40 hover:text-twin-accent-main"
					>
						<Link href="/services" className="flex items-center gap-3">
							View All Services
							<IconBox
								icon="lucide:arrow-right"
								className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
							/>
						</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}

function ProcessStepsSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-white px-6 py-28 md:py-36
				lg:px-[8%]"
		>
			<div className="flex w-full max-w-350 flex-col gap-20">
				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
				>
					<div className="flex flex-col gap-6">
						<motion.div variants={fadeUp} className="flex items-center gap-4">
							<span className="block h-px w-12 bg-twin-primary-main/30" />
							<SectionLabel className="text-[12px] text-twin-primary-main/50">Process</SectionLabel>
						</motion.div>
						<motion.h2
							variants={fadeUp}
							className="max-w-137.5 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
								tracking-[-0.03em] text-twin-primary-main"
						>
							Four steps to <span className="text-twin-accent-darker">flawless delivery.</span>
						</motion.h2>
					</div>
					<motion.p
						variants={fadeUp}
						className="max-w-100 text-[16px] leading-[1.7] text-twin-primary-main/70 lg:text-right"
					>
						A transparent, friction-free process from first contact to final deliverable.
					</motion.p>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4"
				>
					{PROCESS_STEPS.map((step, idx) => (
						<motion.div
							key={step.title}
							variants={fadeUp}
							className={cnJoin(
								"group relative flex flex-col gap-8 py-10 lg:px-8",
								idx !== 0 && "border-t border-twin-primary-main/6 lg:border-t-0 lg:border-l"
							)}
						>
							<div className="flex items-center gap-5">
								<span
									className="text-[clamp(3rem,5vw,4.5rem)] leading-none font-black
										tracking-tighter text-twin-primary-main/15 transition-colors duration-500
										group-hover:text-twin-accent-main/30"
								>
									{String(idx + 1).padStart(2, "0")}
								</span>
							</div>

							<div
								className="flex size-12 items-center justify-center rounded-xl
									bg-twin-primary-main/6 text-twin-primary-main/75 transition-all duration-500
									group-hover:bg-twin-accent-main/10 group-hover:text-twin-accent-main"
							>
								<IconBox icon={step.icon} className="size-5" />
							</div>

							<div className="flex flex-col gap-3">
								<h3 className="text-xl font-bold tracking-tight text-twin-primary-main">
									{step.title}
								</h3>
								<p className="text-[15px] leading-[1.7] text-twin-primary-main/70">
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

function ReviewsSection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-light-1 px-6 py-28 md:py-36
				lg:px-[8%]"
		>
			<div className="flex w-full max-w-350 flex-col gap-20">
				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex flex-col items-center gap-8 text-center"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-primary-main/30" />
						<SectionLabel className="text-[12px] text-twin-primary-main/50">Reviews</SectionLabel>
						<span className="block h-px w-12 bg-twin-primary-main/30" />
					</motion.div>

					<div className="flex flex-col items-center gap-4">
						<motion.h2
							variants={fadeUp}
							className="max-w-200 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
								tracking-[-0.03em] text-twin-primary-main"
						>
							Trusted by professionals{" "}
							<span className="text-twin-accent-darker">across Lancaster County.</span>
						</motion.h2>
						<motion.div variants={fadeUp} className="flex items-center gap-2">
							<div className="flex items-center gap-0.5 text-twin-primary-main">
								{[...Array(5).keys()].map((i) => (
									<IconBox key={i} icon="material-symbols:star-rounded" className="size-5" />
								))}
							</div>
							<span className="font-bold text-twin-primary-main/70">4.9 Rating on Google</span>
						</motion.div>
					</div>
				</motion.div>

				<motion.div
					variants={fadeUp}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="w-full"
				>
					<InfiniteMover speed="slow" className="max-w-none">
						{REVIEWS.map((review) => (
							<li
								key={review.name}
								className="flex min-h-75 w-[min(86vw,27rem)] shrink-0 flex-col justify-between
									rounded-3xl border border-twin-primary-main/6 bg-twin-white p-8 shadow-sm
									transition-all duration-500 hover:border-twin-primary-main/12 hover:shadow-xl"
							>
								<div className="flex flex-col gap-6">
									<div className="flex items-center gap-0.5 text-twin-primary-main">
										{[...Array(review.rating).keys()].map((i) => (
											<IconBox
												key={i}
												icon="material-symbols:star-rounded"
												className="size-4"
											/>
										))}
									</div>
									<p className="text-[15.5px] leading-[1.7] text-twin-primary-main/80 italic">
										&ldquo;{review.text}&rdquo;
									</p>
								</div>

								<div
									className="mt-8 flex items-center justify-between border-t
										border-twin-primary-main/6 pt-6"
								>
									<div className="flex flex-col">
										<span className="font-bold text-twin-primary-main">{review.name}</span>
										<span className="text-[13px] text-twin-primary-main/50">{review.date}</span>
									</div>
									<IconBox icon="logos:google-icon" className="size-5 opacity-40" />
								</div>
							</li>
						))}
					</InfiniteMover>
				</motion.div>

				<motion.div
					variants={fadeUp}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="flex justify-center"
				>
					<Button
						asChild={true}
						theme="ghost-light"
						size="medium"
						className="group rounded-full border-twin-primary-main/15 px-8 transition-all
							duration-500 hover:border-twin-primary-main/30 hover:bg-twin-primary-main/3"
					>
						<Link
							href="https://www.google.com/search?q=Twins+Language+Services+Lancaster+PA"
							target="_blank"
							className="flex items-center gap-3"
						>
							View All Google Reviews
							<IconBox
								icon="lucide:external-link"
								className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
							/>
						</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-primary-subtle px-6 py-28
				md:py-36 lg:px-[8%]"
		>
			<div className="pointer-events-none absolute inset-0 z-0">
				<div
					className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r
						from-transparent via-twin-accent-main/35 to-transparent"
				/>
				<div
					className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full
						bg-twin-accent-main/12 blur-3xl"
				/>
			</div>

			<motion.div
				variants={staggerContainer(0.1)}
				initial="hidden"
				whileInView="show"
				viewport={VP}
				className="relative z-10 flex w-full max-w-225 flex-col items-center gap-12 text-center"
			>
				<motion.div variants={fadeUp} className="flex items-center gap-4">
					<span className="block h-px w-12 bg-twin-primary-main/25" />
					<span className="text-[11px] font-bold tracking-[0.3em] text-twin-accent-darker uppercase">
						Get Started
					</span>
					<span className="block h-px w-12 bg-twin-primary-main/25" />
				</motion.div>

				<motion.h2
					variants={fadeUp}
					className="text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-[-0.03em]
						text-twin-primary-main"
				>
					Ready to bridge the{" "}
					<span
						className="bg-linear-to-r from-twin-accent-lighter via-twin-accent-main
							to-twin-accent-darker bg-clip-text text-transparent"
					>
						language gap?
					</span>
				</motion.h2>

				<motion.p
					variants={fadeUp}
					className="max-w-130 text-lg leading-[1.7] text-twin-primary-main/70"
				>
					Whether you need immediate interpretation or long-term translation support, we're ready to
					deliver.
				</motion.p>

				<motion.div variants={fadeUp} className="flex flex-col gap-4 md:flex-row md:gap-5">
					<Button
						asChild={true}
						theme="accent-gradient"
						size="large"
						className="group overflow-hidden rounded-full transition-all duration-500
							hover:shadow-[0_0_60px_theme(--color-twin-accent-main/30%)] active:scale-[0.97]"
					>
						<Link href={siteConfig.bookings.url} className="flex items-center gap-3">
							Book Now
							<IconBox
								icon="lucide:arrow-up-right"
								className="size-5 transition-transform duration-300 group-hover:translate-x-0.5
									group-hover:-translate-y-0.5"
							/>
						</Link>
					</Button>

					<Button
						asChild={true}
						theme="ghost-light"
						size="large"
						className="rounded-full border-twin-primary-main/15 transition-all duration-500
							hover:border-twin-primary-main/30 hover:bg-twin-primary-main/3"
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
