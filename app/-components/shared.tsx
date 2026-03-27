/* eslint-disable react-refresh/only-export-components */
"use client";

import { motion } from "motion/react";
import { cnMerge } from "@/lib/utils/cn";

export const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, y: 0 },
} as const;

export const scaleIn = {
	hidden: { opacity: 0, scale: 0.95 },
	show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const;

export const slideLeft = {
	hidden: { opacity: 0, x: -28 },
	show: { opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, x: 0 },
} as const;

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
	hidden: {},
	show: { transition: { delayChildren, staggerChildren } },
});

export const VP = { amount: 0.15, once: true } as const;

export function SectionLabel({ children, className }: { children: string; className?: string }) {
	return (
		<motion.p
			variants={fadeUp}
			className={cnMerge(
				"text-[14px] font-black tracking-[0.28em] text-twin-primary-main uppercase md:text-[18px]",
				className
			)}
		>
			{children}
		</motion.p>
	);
}
