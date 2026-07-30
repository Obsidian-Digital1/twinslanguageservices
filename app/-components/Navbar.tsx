"use client";

import { useToggle } from "@zayne-labs/toolkit-react";
import { motion, useScroll, useTransform } from "motion/react";
import { IconBox, Logo, NavLink } from "@/components/common";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { cnMerge } from "@/lib/utils/cn";

function Navbar() {
	const [isNavShow, toggleNavShow] = useToggle(false);
	const { scrollY } = useScroll();

	const bg = useTransform(scrollY, [0, 60], ["hsl(199, 88%, 18%)", "hsl(199, 88%, 18%, 0.96)"]);
	const blur = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(20px)"]);

	return (
		<>
			<motion.header
				style={{ backdropFilter: blur, backgroundColor: bg }}
				className="fixed inset-x-0 top-0 z-50 flex justify-center border-b border-white/0
					transition-[border-color] duration-300
					[&:not(:where([data-scrolled=false]))]:border-white/6"
			>
				<div className="flex h-20 w-full max-w-290 items-center justify-between px-6">
					<motion.div
						initial={{ opacity: 0, x: -16 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Logo />
					</motion.div>

					<DesktopNavigation className="max-md:hidden" />

					<Button
						unstyled={true}
						type="button"
						aria-label={isNavShow ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isNavShow}
						aria-controls="mobile-navigation"
						className="z-50 flex size-12 items-center justify-center rounded-xl transition-colors
							hover:bg-white/8 focus-visible:outline-3 focus-visible:outline-offset-3
							focus-visible:outline-twin-accent-main md:hidden"
						onClick={toggleNavShow}
					>
						<IconBox
							aria-hidden="true"
							icon={isNavShow ? "lucide:x" : "lucide:menu"}
							className="size-8 text-white"
							strokeWidth={2.5}
						/>
					</Button>
				</div>
			</motion.header>

			<MobileNavigationDrawer
				isNavShow={isNavShow}
				toggleNavShow={toggleNavShow}
				className="md:hidden"
			/>
		</>
	);
}

function DesktopNavigation(props: { className?: string }) {
	const { className } = props;

	return (
		<motion.nav
			aria-label="Primary navigation"
			initial={{ opacity: 0, x: 16 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.1, duration: 0.5 }}
			className={cnMerge("flex items-center gap-8", className)}
		>
			{siteConfig.navigation.map((linkItem) => (
				<NavLink
					key={linkItem.label}
					href={linkItem.href as never}
					className="text-lg font-semibold text-white/55 no-underline transition-colors
						hover:text-white"
				>
					{linkItem.label}
				</NavLink>
			))}

			<Button
				asChild={true}
				theme="accent-gradient"
				size="sm"
				className="transition-transform duration-300 hover:scale-104 active:scale-98"
			>
				<a href={siteConfig.bookings.url}>{siteConfig.bookings.label}</a>
			</Button>
		</motion.nav>
	);
}

function MobileNavigationDrawer(props: {
	className?: string;
	isNavShow: boolean;
	toggleNavShow: () => void;
}) {
	const { className, isNavShow, toggleNavShow } = props;

	return (
		<section
			id="mobile-navigation"
			aria-label="Mobile navigation"
			aria-hidden={!isNavShow}
			className={cnMerge(
				`fixed inset-[0_0_0_auto] z-40 flex flex-col items-center gap-7 overflow-x-hidden
				bg-twin-primary-main/98 pt-24 text-white backdrop-blur-xl transition-[width] ease-[ease]`,
				isNavShow ? "w-full duration-350" : "w-0 duration-500",
				className
			)}
			onClick={(event) => {
				const element = event.target as HTMLElement;
				element.tagName === "A" && toggleNavShow();
			}}
		>
			<nav aria-label="Mobile navigation links" className="mt-5 flex flex-col items-center gap-5 text-nowrap">
				{siteConfig.navigation.map((linkItem) => (
					<NavLink
						key={linkItem.label}
						href={linkItem.href as never}
						className="text-2xl font-bold text-white/60 transition-colors hover:text-white"
					>
						{linkItem.label}
					</NavLink>
				))}
			</nav>

			<Button asChild={true} theme="accent-gradient" size="medium">
				<a href={siteConfig.bookings.url}>{siteConfig.bookings.label}</a>
			</Button>
		</section>
	);
}

export { Navbar };
