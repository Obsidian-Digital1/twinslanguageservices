"use client";

import { Icon } from "@iconify/react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";
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
		title: "Ironclad Confidentiality",
	},
	{
		description:
			"From live interpretation to document translation and transcription—one partner for every language need.",
		icon: "lucide:layers",
		stat: "6",
		statLabel: "Services",
		title: "End-to-End Coverage",
	},
] as const;

const SERVICES = [
	{
		accent: "from-twin-accent-main/20 to-transparent",
		description:
			"Professional on-site interpretation for meetings, appointments, and high-stakes events requiring nuanced, real-time communication.",
		icon: "lucide:users",
		id: "in-person-interpreting",
		title: "In-Person Interpreting",
	},
	{
		accent: "from-twin-secondary-lighter/15 to-transparent",
		description:
			"Immediate over-the-phone language support for urgent, time-sensitive communication needs.",
		icon: "lucide:phone",
		id: "phone-interpreting",
		title: "Phone Interpreting",
	},
	{
		accent: "from-twin-accent-darker/15 to-transparent",
		description:
			"Remote interpretation via leading video platforms—bridging distance without sacrificing clarity.",
		icon: "lucide:monitor-play",
		id: "video-interpreting",
		title: "Virtual Interpreting",
	},
	{
		accent: "from-twin-primary-lighter/15 to-transparent",
		description:
			"Precise translation of legal documents, certificates, medical records, and business materials.",
		icon: "lucide:file-text",
		id: "document-translation",
		title: "Document Translation",
	},
	{
		accent: "from-twin-accent-main/15 to-transparent",
		description:
			"Meticulous audio and video transcription with guaranteed accuracy and fast turnaround.",
		icon: "lucide:headphones",
		id: "transcription",
		title: "Transcription",
	},
	{
		accent: "from-twin-secondary-main/15 to-transparent",
		description:
			"Court-certified interpretation for depositions, hearings, trials, and sensitive legal proceedings.",
		icon: "lucide:scale",
		id: "court-legal",
		title: "Legal Interpretation",
	},
] as const;

const PROCESS_STEPS = [
	{
		description: "Reach out via phone, email, or our booking system with your language requirements.",
		icon: "lucide:send",
		number: "01",
		title: "Initiate",
	},
	{
		description: "We analyze your needs and pair you with the perfect linguistic specialist.",
		icon: "lucide:search",
		number: "02",
		title: "Strategize",
	},
	{
		description: "Logistics, scheduling, and scope are locked in for total alignment.",
		icon: "lucide:check-circle",
		number: "03",
		title: "Confirm",
	},
	{
		description: "Our professionals execute flawless, confidential language services.",
		icon: "lucide:zap",
		number: "04",
		title: "Deliver",
	},
] as const;

export default function HomePage() {
	return (
		<Main>
			<HeroSection />
			<TrustCardsSection />
			<ServicesOverviewSection />
			<ProcessStepsSection />
			<CTASection />
		</Main>
	);
}

function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ offset: ["start start", "end start"], target: sectionRef });
	const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { damping: 20, stiffness: 50 });
	const springY = useSpring(mouseY, { damping: 20, stiffness: 50 });

	const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.08);
		mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.08);
	};

	return (
		<section
			ref={sectionRef}
			onMouseMove={handleMouseMove}
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
				style={{ x: springX, y: springY }}
				className="pointer-events-none absolute -top-[15%] right-[5%] z-0 aspect-square
					w-[min(900px,80vw)] rounded-full opacity-50 blur-[140px]"
			>
				<div
					className="size-full rounded-full
						bg-[conic-gradient(from_180deg,var(--color-twin-accent-main),var(--color-twin-secondary-lighter),var(--color-twin-accent-darker),var(--color-twin-accent-main))]"
				/>
			</motion.div>

			<div
				className="pointer-events-none absolute -bottom-[25%] -left-[15%] z-0 aspect-square
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

			<motion.div
				style={{ opacity: contentOpacity, y: contentY }}
				className="relative z-10 flex w-full grow flex-col justify-end px-6 pt-36 pb-45 md:px-16
					lg:px-[8%]"
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
						className="max-w-[1200px] text-[clamp(3rem,9.5vw,9rem)] leading-[0.9] font-black
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
								<Icon icon="lucide:sparkles" className="size-6 md:size-10" />
							</motion.span>
						</span>
					</motion.h1>

					<div
						className="mt-16 flex flex-col gap-12 lg:mt-24 lg:flex-row lg:items-end
							lg:justify-between"
					>
						<motion.p
							variants={fadeUp}
							className="max-w-[480px] text-[17px] leading-[1.7] font-light text-twin-white/80"
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
								<Link href={siteConfig.bookings.url} className="flex items-center gap-3">
									Schedule Service
									<Icon
										icon="lucide:arrow-up-right"
										className="size-5 transition-transform duration-300
											group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</Link>
							</Button>

							<Link
								href={`tel:${siteConfig.contact.phone.replaceAll(/[^0-9]/g, "")}`}
								className="group flex items-center gap-4 rounded-full border border-twin-white/10
									px-6 py-3.5 text-[15px] text-twin-white/70 no-underline transition-all
									duration-400 hover:border-twin-white/25 hover:text-twin-white"
							>
								<span className="relative flex size-2">
									<span
										className="absolute inline-flex size-full animate-ping rounded-full
											bg-twin-accent-main opacity-60"
									/>
									<span className="relative inline-flex size-2 rounded-full bg-twin-accent-main" />
								</span>
								{siteConfig.contact.phone}
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-3 h-24 bg-linear-to-t
					from-twin-white to-transparent"
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
								<SectionLabel className="m-0! text-[12px]! text-twin-primary-main/50">
									What Sets Us Apart
								</SectionLabel>
							</motion.div>
							<motion.h2
								variants={fadeUp}
								className="max-w-[700px] text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-black
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
										<Icon icon={card.icon} className="size-5" />
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
						className="relative min-h-[400px] w-full overflow-hidden rounded-3xl lg:w-[45%]"
					>
						<Image
							src="/hero-interpreter.png"
							alt="Professional interpreter facilitating a business meeting"
							fill={true}
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 45vw"
						/>

						<div
							className="absolute inset-0 bg-gradient-to-t from-twin-primary-main/30 to-transparent"
						/>
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
						<SectionLabel className="m-0! text-[12px]! text-twin-accent-main/80">
							Services
						</SectionLabel>
						<span className="block h-px w-12 bg-twin-accent-main/40" />
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="max-w-[800px] text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-white"
					>
						Six services. <span className="text-twin-accent-main">One mission.</span>
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="max-w-[560px] text-lg leading-[1.7] text-twin-white/65"
					>
						Every service is designed to eliminate language barriers with surgical precision.
					</motion.p>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-4 md:grid-cols-2"
				>
					{SERVICES.map((service, i) => (
						<motion.div
							key={service.id}
							variants={fadeUp}
							className={cnJoin(
								`group relative flex flex-col justify-between overflow-hidden rounded-3xl border
								border-twin-white/6 bg-twin-white/3 p-10 backdrop-blur-sm transition-all
								duration-500 hover:border-twin-accent-main/20 hover:bg-twin-white/6`,
								i === 0 && "md:row-span-2 md:min-h-[480px]",
								i === 5 && "md:row-span-2 md:min-h-[480px]"
							)}
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
								<Icon icon={service.icon} className="size-6" />
							</div>

							<div className="mt-auto flex flex-col gap-4 pt-8">
								<h3 className="text-2xl font-bold tracking-tight text-twin-white">
									{service.title}
								</h3>
								<p className="max-w-[400px] text-[16px] leading-[1.7] text-twin-white/65">
									{service.description}
								</p>
							</div>

							<div
								className="absolute top-8 right-8 flex size-10 items-center justify-center
									rounded-full text-twin-white/0 transition-all duration-500
									group-hover:text-twin-white/40"
							>
								<Icon icon="lucide:arrow-up-right" className="size-5" />
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
							<Icon
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
							<SectionLabel className="m-0! text-[12px]! text-twin-primary-main/50">
								Process
							</SectionLabel>
						</motion.div>
						<motion.h2
							variants={fadeUp}
							className="max-w-[550px] text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
								tracking-[-0.03em] text-twin-primary-main"
						>
							Four steps to <span className="text-twin-accent-darker">flawless delivery.</span>
						</motion.h2>
					</div>
					<motion.p
						variants={fadeUp}
						className="max-w-[400px] text-[16px] leading-[1.7] text-twin-primary-main/70
							lg:text-right"
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
							key={step.number}
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
									{step.number}
								</span>
							</div>

							<div
								className="flex size-12 items-center justify-center rounded-xl
									bg-twin-primary-main/6 text-twin-primary-main/75 transition-all duration-500
									group-hover:bg-twin-accent-main/10 group-hover:text-twin-accent-main"
							>
								<Icon icon={step.icon} className="size-5" />
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

function CTASection() {
	return (
		<section
			className="relative flex w-full justify-center overflow-hidden bg-twin-primary-main px-6 py-28
				md:py-36 lg:px-[8%]"
		>
			<div className="pointer-events-none absolute inset-0 z-0">
				<div
					className="absolute inset-0
						bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,var(--color-twin-accent-main),transparent)]
						opacity-[0.08]"
				/>
			</div>

			<motion.div
				variants={staggerContainer(0.1)}
				initial="hidden"
				whileInView="show"
				viewport={VP}
				className="relative z-10 flex w-full max-w-[900px] flex-col items-center gap-12 text-center"
			>
				<motion.div variants={fadeUp} className="flex items-center gap-4">
					<span className="block h-px w-12 bg-twin-accent-main/40" />
					<span className="text-[11px] font-bold tracking-[0.3em] text-twin-accent-main/80 uppercase">
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
					<span
						className="bg-linear-to-r from-twin-accent-lighter via-twin-accent-main
							to-twin-accent-darker bg-clip-text text-transparent"
					>
						language gap?
					</span>
				</motion.h2>

				<motion.p variants={fadeUp} className="max-w-[520px] text-lg leading-[1.7] text-twin-white/65">
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
						<Link href="/booking" className="flex items-center gap-3">
							Book Now
							<Icon
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
							<Icon icon="lucide:mail" className="size-5" />
						</Link>
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
}
