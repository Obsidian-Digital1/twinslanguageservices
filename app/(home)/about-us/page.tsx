"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { IconBox } from "@/components/common";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { Main } from "../../-components";
import { fadeUp, scaleIn, SectionLabel, staggerContainer, VP } from "../../-components/shared";

const COMPANY_OVERVIEW = {
	content: [
		"Founded in 2012, Twins Language Services has been Lancaster County's trusted partner for professional interpretation, document translation, and transcription services. We bridge communication gaps for healthcare providers, legal professionals, businesses, and community organizations.",
		"Our team of certified interpreters and translators brings deep expertise across multiple industries, ensuring accurate, culturally sensitive communication in every engagement. We understand that language barriers can impact critical decisions, relationships, and outcomes—that's why precision and professionalism are non-negotiable in our work.",
		"From medical appointments to legal proceedings, business negotiations to community events, we deliver language services that meet the highest standards of accuracy, confidentiality, and cultural competence.",
	],
	title: "Who We Are",
} as const;

const MISSION_VALUES = {
	title: "Our Mission & Values",
	values: [
		{
			description:
				"We deliver accurate, culturally sensitive interpretation and translation that preserves meaning and intent across languages.",
			icon: "lucide:target",
			title: "Precision in Every Word",
		},
		{
			description:
				"Your sensitive communications are protected by strict confidentiality protocols and ethical standards.",
			icon: "lucide:shield-check",
			title: "Trust & Confidentiality",
		},
		{
			description:
				"We respect and honor the cultural contexts of every language we serve, ensuring authentic communication.",
			icon: "lucide:globe",
			title: "Cultural Competence",
		},
		{
			description:
				"Our certified professionals bring specialized knowledge in healthcare, legal, business, and community settings.",
			icon: "lucide:award",
			title: "Professional Excellence",
		},
	],
} as const;

const WHO_WE_SERVE = {
	industries: [
		{
			description: "Medical interpretation, patient communication, healthcare documentation",
			icon: "lucide:heart-pulse",
			title: "Healthcare Providers",
		},
		{
			description: "Court interpretation, legal document translation, deposition services",
			icon: "lucide:scale",
			title: "Legal Professionals",
		},
		{
			description: "Business meetings, contract translation, international communication",
			icon: "lucide:briefcase",
			title: "Businesses & Corporations",
		},
		{
			description: "Educational institutions, social services, community programs",
			icon: "lucide:users",
			title: "Community Organizations",
		},
		{
			description: "Municipal services, public meetings, government documentation",
			icon: "lucide:landmark",
			title: "Government Agencies",
		},
		{
			description: "Individual clients needing personal document translation or interpretation",
			icon: "lucide:user",
			title: "Individual Clients",
		},
	],
	title: "Who We Serve",
} as const;

const WHY_CHOOSE_US = {
	differentiators: [
		{
			description:
				"Over 12 years serving Lancaster County with consistent, reliable language services across all industries.",
			icon: "lucide:calendar-check",
			title: "12+ Years of Local Expertise",
		},
		{
			description:
				"Our interpreters and translators hold professional certifications and specialized training in their fields.",
			icon: "lucide:badge-check",
			title: "Certified Professionals",
		},
		{
			description:
				"From on-site interpretation to phone, video, document translation, and transcription—one trusted partner.",
			icon: "lucide:layers",
			title: "Comprehensive Service Range",
		},
		{
			description:
				"We respond quickly to urgent requests and maintain flexible scheduling to meet your needs.",
			icon: "lucide:zap",
			title: "Responsive & Flexible",
		},
	],
	title: "Why Clients Choose Us",
} as const;

export default function AboutUsPage() {
	return (
		<Main>
			<HeroSection />
			<CompanyOverviewSection />
			<MissionValuesSection />
			<WhoWeServeSection />
			<WhyChooseUsSection />
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

			<motion.div
				className="pointer-events-none absolute top-[-20%] right-[10%] z-0 aspect-square
					w-[min(700px,70vw)] rounded-full opacity-40 blur-[120px]"
			>
				<div
					className="size-full rounded-full
						bg-[conic-gradient(from_180deg,var(--color-twin-accent-main),var(--color-twin-secondary-lighter),var(--color-twin-accent-darker),var(--color-twin-accent-main))]"
				/>
			</motion.div>

			<motion.div
				variants={staggerContainer(0.1, 0.2)}
				initial="hidden"
				animate="show"
				className="relative z-10 flex w-full max-w-350 flex-col items-center gap-8 text-center"
			>
				<motion.div variants={fadeUp} className="flex items-center gap-4">
					<span className="block h-px w-12 bg-twin-accent-main/40" />
					<SectionLabel className="text-twin-accent-main">About Us</SectionLabel>
					<span className="block h-px w-12 bg-twin-accent-main/40" />
				</motion.div>

				<motion.h1
					variants={fadeUp}
					className="max-w-250 text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] font-black
						tracking-[-0.03em] text-twin-white"
				>
					Connecting communities through{" "}
					<span
						className="bg-linear-to-r from-twin-accent-lighter via-twin-accent-main
							to-twin-accent-darker bg-clip-text text-transparent"
					>
						language excellence.
					</span>
				</motion.h1>

				<motion.p variants={fadeUp} className="max-w-175 text-lg leading-[1.7] text-twin-white/70">
					For over a decade, we've been Lancaster County's trusted partner for professional
					interpretation, translation, and transcription services.
				</motion.p>
			</motion.div>
		</section>
	);
}

function CompanyOverviewSection() {
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
					className="flex flex-col gap-6"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-primary-main/30" />
						<SectionLabel className="">Our Story</SectionLabel>
					</motion.div>

					<motion.h2
						variants={fadeUp}
						className="max-w-200 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-primary-main"
					>
						{COMPANY_OVERVIEW.title}
					</motion.h2>

					<div className="flex flex-col gap-6">
						{COMPANY_OVERVIEW.content.map((paragraph) => (
							<motion.p
								key={paragraph}
								variants={fadeUp}
								className="max-w-250 text-[17px] leading-[1.75] text-twin-primary-main/75"
							>
								{paragraph}
							</motion.p>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}

function MissionValuesSection() {
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
					className="flex flex-col gap-6"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-primary-main/30" />
						<SectionLabel className="">Mission & Values</SectionLabel>
					</motion.div>

					<motion.h2
						variants={fadeUp}
						className="max-w-200 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-primary-main"
					>
						{MISSION_VALUES.title}
					</motion.h2>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-6 md:grid-cols-2"
				>
					{MISSION_VALUES.values.map((value) => (
						<motion.div
							key={value.title}
							variants={scaleIn}
							className="group flex flex-col gap-5 rounded-3xl border border-twin-primary-main/8
								bg-twin-white p-8 transition-all duration-500 hover:border-twin-primary-main/15
								hover:shadow-xl hover:shadow-twin-primary-main/5"
						>
							<div
								className="flex size-14 items-center justify-center rounded-2xl
									bg-twin-primary-main/6 text-twin-primary-main/70 transition-all duration-500
									group-hover:bg-twin-accent-main/10 group-hover:text-twin-accent-main"
							>
								<IconBox icon={value.icon} className="size-6" />
							</div>

							<div className="flex flex-col gap-3">
								<h3 className="text-xl font-bold tracking-tight text-twin-primary-main">
									{value.title}
								</h3>
								<p className="text-[16px] leading-[1.7] text-twin-primary-main/70">
									{value.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

function WhoWeServeSection() {
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
					className="flex flex-col gap-6"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-primary-main/30" />
						<SectionLabel>Industries</SectionLabel>
					</motion.div>

					<motion.h2
						variants={fadeUp}
						className="max-w-200 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-primary-main"
					>
						{WHO_WE_SERVE.title}
					</motion.h2>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
				>
					{WHO_WE_SERVE.industries.map((industry) => (
						<motion.div
							key={industry.title}
							variants={fadeUp}
							className="group flex items-start gap-5 rounded-2xl border border-twin-primary-main/6
								bg-twin-light-1 p-6 transition-all duration-500 hover:border-twin-primary-main/12
								hover:shadow-lg hover:shadow-twin-primary-main/4"
						>
							<div
								className="flex size-12 shrink-0 items-center justify-center rounded-xl border
									border-twin-primary-main/8 text-twin-primary-main/60 transition-all duration-500
									group-hover:border-twin-accent-main/30 group-hover:text-twin-accent-main"
							>
								<IconBox icon={industry.icon} className="size-5" />
							</div>

							<div className="flex flex-col gap-1.5">
								<h3 className="text-lg font-bold tracking-tight text-twin-primary-main">
									{industry.title}
								</h3>
								<p className="text-[15px] leading-[1.65] text-twin-primary-main/65">
									{industry.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

function WhyChooseUsSection() {
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
					className="flex flex-col gap-6"
				>
					<motion.div variants={fadeUp} className="flex items-center gap-4">
						<span className="block h-px w-12 bg-twin-accent-main/40" />
						<SectionLabel className="text-twin-accent-main">Differentiators</SectionLabel>
					</motion.div>

					<motion.h2
						variants={fadeUp}
						className="max-w-200 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-black
							tracking-[-0.03em] text-twin-white"
					>
						{WHY_CHOOSE_US.title}
					</motion.h2>
				</motion.div>

				<motion.div
					variants={staggerContainer(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="grid grid-cols-1 gap-6 md:grid-cols-2"
				>
					{WHY_CHOOSE_US.differentiators.map((diff) => (
						<motion.div
							key={diff.title}
							variants={scaleIn}
							className="group flex flex-col gap-5 rounded-3xl border border-twin-white/8
								bg-twin-white/5 p-8 backdrop-blur-sm transition-all duration-500
								hover:border-twin-accent-main/20 hover:bg-twin-white/8"
						>
							<div
								className="flex size-14 items-center justify-center rounded-2xl border
									border-twin-white/12 text-twin-white/70 transition-all duration-500
									group-hover:border-twin-accent-main/30 group-hover:text-twin-accent-main
									group-hover:shadow-[0_0_30px_theme(--color-twin-accent-main/15%)]"
							>
								<IconBox icon={diff.icon} className="size-6" />
							</div>

							<div className="flex flex-col gap-3">
								<h3 className="text-xl font-bold tracking-tight text-twin-white">{diff.title}</h3>
								<p className="text-[16px] leading-[1.7] text-twin-white/70">{diff.description}</p>
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
			className="relative flex w-full justify-center overflow-hidden bg-twin-white px-6 py-28 md:py-36
				lg:px-[8%]"
		>
			<motion.div
				variants={staggerContainer(0.1)}
				initial="hidden"
				whileInView="show"
				viewport={VP}
				className="relative z-10 flex w-full max-w-225 flex-col items-center gap-12 text-center"
			>
				<motion.div variants={fadeUp} className="flex items-center gap-4">
					<span className="block h-px w-12 bg-twin-primary-main/30" />
					<span className="text-[11px] font-bold tracking-[0.3em] text-twin-primary-main/50 uppercase">
						Get Started
					</span>
					<span className="block h-px w-12 bg-twin-primary-main/30" />
				</motion.div>

				<motion.h2
					variants={fadeUp}
					className="text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-black tracking-[-0.03em]
						text-twin-primary-main"
				>
					Ready to work with{" "}
					<span className="text-twin-accent-darker">Lancaster's trusted language partner?</span>
				</motion.h2>

				<motion.p
					variants={fadeUp}
					className="max-w-130 text-lg leading-[1.7] text-twin-primary-main/70"
				>
					Whether you need immediate interpretation or long-term translation support, we're here to
					help.
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
							{siteConfig.bookings.label}
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
