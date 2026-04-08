"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/config/site";
import { fadeUp, VP } from "../../../-components/shared";

const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(siteConfig.contact.address.full)}`;

// If no API key is provided, we use a standard embed URL as a fallback
const fallbackMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address.full)}&output=embed`;

export function MapSection() {
	return (
		<section className="relative w-full bg-twin-light-1 px-6 py-20 lg:px-[8%]">
			<motion.div
				variants={fadeUp}
				initial="hidden"
				whileInView="show"
				viewport={VP}
				className="mx-auto flex w-full max-w-350 flex-col gap-12"
			>
				<div className="flex flex-col gap-4 text-center md:text-start">
					<h2 className="text-3xl font-bold tracking-tight text-twin-primary-main md:text-4xl">
						Our Location
					</h2>
					<p className="max-w-xl text-lg text-twin-primary-main/70">
						Visit us at our central Lancaster office. We're situated in the heart of the city to
						serve you better.
					</p>
				</div>

				<div
					className="relative h-112.5 w-full overflow-hidden rounded-3xl border
						border-twin-primary-main/10 shadow-2xl shadow-twin-primary-main/5"
				>
					<iframe
						title="Office Location"
						width="100%"
						height="100%"
						loading="lazy"
						allowFullScreen={true}
						sandbox="allow-popups"
						referrerPolicy="no-referrer-when-downgrade"
						src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? mapUrl : fallbackMapUrl}
						className="border-none contrast-125 grayscale invert-[0.05] filter transition-all
							duration-700 hover:grayscale-0"
					/>

					<span
						className="pointer-events-none absolute inset-0 rounded-3xl
							shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]"
					/>
				</div>
			</motion.div>
		</section>
	);
}
