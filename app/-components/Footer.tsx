"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Logo, NavLink } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, y: 0 },
} as const;

const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
	hidden: {},
	show: { transition: { delayChildren, staggerChildren } },
});

const VP = { amount: 0.15, once: true } as const;

const columns = [
	{
		links: siteConfig.navigation.map((item) => ({
			href: item.href,
			label: item.label,
		})),
		title: "Pages",
	},
	{
		links: siteConfig.services.map((service) => ({
			href: "/services",
			label: service.title,
		})),
		title: "Services",
	},
	{
		links: [
			{ href: `tel:${siteConfig.contact.phone}`, label: siteConfig.contact.phone },
			{ href: `mailto:${siteConfig.contact.email}`, label: siteConfig.contact.email },
			{ href: null, label: siteConfig.contact.address.full },
		],
		title: "Contact Us",
	},
];

function Footer() {
	return (
		<footer
			className="flex w-full justify-center overflow-hidden border-t border-white/5 bg-twin-primary-main
				px-4 pt-12 pb-8 md:px-10 lg:px-25"
		>
			<div className="w-full max-w-275">
				<motion.div
					variants={staggerContainer(0.08)}
					initial="hidden"
					whileInView="show"
					viewport={VP}
					className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
				>
					<motion.div variants={fadeUp} className="flex flex-col gap-4">
						<Logo iconSize={32} />
						<p className="max-w-65 text-base/relaxed text-white/45">{siteConfig.tagline}</p>
					</motion.div>

					{columns.map((col) => (
						<motion.div key={col.title} variants={fadeUp} className="flex flex-col gap-3">
							<p className="text-lg font-black tracking-[0.28em] text-white/30 uppercase">
								{col.title}
							</p>
							<div className="flex flex-col gap-3">
								{col.links.map((link) =>
									link.href ?
										<NavLink
											prefetch={false}
											key={link.label}
											href={link.href as never}
											className="text-white/45 transition-all duration-300 hover:translate-x-0.5
												hover:text-white/80"
										>
											{link.label}
										</NavLink>
									:	<span
											key={link.label}
											className="text-white/45 transition-all duration-300 hover:translate-x-0.5
												hover:text-white/80"
										>
											{link.label}
										</span>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>

				<div
					className="mb-6 flex flex-wrap items-center justify-center gap-6 border-t border-white/5
						pt-6"
				>
					<Link
						href={siteConfig.social.facebook}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/45 no-underline transition-colors hover:text-twin-accent-main"
					>
						Facebook
					</Link>
					<Link
						href={siteConfig.social.instagram}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/45 no-underline transition-colors hover:text-twin-accent-main"
					>
						Instagram
					</Link>
					<Link
						href={siteConfig.social.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/45 no-underline transition-colors hover:text-twin-accent-main"
					>
						LinkedIn
					</Link>
				</div>

				<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-6">
					<span className="text-[12px] text-white/25">
						© 2025 {siteConfig.name}. All rights reserved.
					</span>
					<NavLink
						href={`mailto:${siteConfig.contact.email}`}
						className="text-[12px] text-white/25 no-underline transition-colors hover:text-white/45"
					>
						{siteConfig.contact.email}
					</NavLink>
				</div>
			</div>
		</footer>
	);
}

export { Footer };
