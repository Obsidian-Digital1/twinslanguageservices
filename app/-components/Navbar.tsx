"use client";

import { useEffect, useRef, useState } from "react";
import { IconBox, Logo, NavLink } from "@/components/common";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { cnMerge } from "@/lib/utils/cn";

const MOBILE_MENU_ID = "mobile-navigation";

function Navbar() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const drawerRef = useRef<HTMLDivElement>(null);

	const closeMenu = () => {
		setIsNavOpen(false);
		requestAnimationFrame(() => menuButtonRef.current?.focus());
	};

	useEffect(() => {
		if (!isNavOpen) return;

		const main = document.querySelector<HTMLElement>("#main-content");
		const footer = document.querySelector<HTMLElement>("footer");
		const previousOverflow = document.body.style.overflow;

		document.body.style.overflow = "hidden";
		main?.setAttribute("inert", "");
		footer?.setAttribute("inert", "");
		drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeMenu();
				return;
			}

			if (event.key !== "Tab" || !drawerRef.current) return;

			const focusable = [
				...drawerRef.current.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
				),
			];
			const first = focusable[0];
			const last = focusable.at(-1);

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			main?.removeAttribute("inert");
			footer?.removeAttribute("inert");
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isNavOpen]);

	return (
		<>
			<header
				className="fixed inset-x-0 top-0 z-50 flex justify-center border-b border-white/8
					bg-twin-primary-main/96 backdrop-blur-xl"
			>
				<div className="flex h-20 w-full max-w-290 items-center justify-between px-5 md:px-6">
					<Logo />

					<DesktopNavigation className="max-md:hidden" />

					<Button
						ref={menuButtonRef}
						unstyled={true}
						type="button"
						aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isNavOpen}
						aria-controls={MOBILE_MENU_ID}
						className="z-50 flex size-12 items-center justify-center rounded-xl text-white
							transition-[background-color,transform] duration-160 ease-out
							hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-3
							focus-visible:outline-twin-accent-main active:scale-[0.97] md:hidden"
						onClick={() => setIsNavOpen((current) => !current)}
					>
						<IconBox
							icon={isNavOpen ? "lucide:x" : "lucide:menu"}
							aria-hidden="true"
							className="size-8"
							strokeWidth={2.5}
						/>
					</Button>
				</div>
			</header>

			{isNavOpen && (
				<MobileNavigationDrawer ref={drawerRef} closeMenu={closeMenu} />
			)}
		</>
	);
}

function DesktopNavigation(props: { className?: string }) {
	const { className } = props;

	return (
		<nav aria-label="Primary navigation" className={cnMerge("flex items-center gap-7", className)}>
			{siteConfig.navigation.map((linkItem) => (
				<NavLink
					key={linkItem.label}
					href={linkItem.href as never}
					className="rounded-md text-base font-semibold text-white/70 no-underline
						transition-colors duration-160 hover:text-white focus-visible:outline-3
						focus-visible:outline-offset-4 focus-visible:outline-twin-accent-main
						data-[active=true]:text-twin-accent-main"
				>
					{linkItem.label}
				</NavLink>
			))}

			<Button
				asChild={true}
				theme="accent-gradient"
				size="sm"
				className="rounded-full transition-transform duration-160 ease-out
					focus-within:outline-3 focus-within:outline-offset-3
					focus-within:outline-twin-accent-main active:scale-[0.97]"
			>
				<NavLink href="/booking">{siteConfig.bookings.label}</NavLink>
			</Button>
		</nav>
	);
}

function MobileNavigationDrawer({
	closeMenu,
	ref,
}: {
	closeMenu: () => void;
	ref: React.RefObject<HTMLDivElement | null>;
}) {
	return (
		<div
			ref={ref}
			id={MOBILE_MENU_ID}
			role="dialog"
			aria-modal="true"
			aria-label="Site navigation"
			className="fixed inset-0 z-40 flex flex-col overscroll-contain bg-twin-primary-main pt-24
				text-white"
		>
			<button
				type="button"
				aria-label="Close navigation menu"
				className="absolute inset-0 -z-10 cursor-default bg-twin-primary-main"
				onClick={closeMenu}
			/>
			<nav aria-label="Mobile navigation" className="flex flex-col items-center gap-2 px-6 pt-8">
				{siteConfig.navigation.map((linkItem) => (
					<NavLink
						key={linkItem.label}
						href={linkItem.href as never}
						onClick={closeMenu}
						className="w-full max-w-sm rounded-xl px-5 py-3 text-center text-2xl font-bold
							text-white/75 no-underline transition-[background-color,color,transform]
							duration-160 ease-out hover:bg-white/8 hover:text-white
							focus-visible:outline-3 focus-visible:outline-offset-2
							focus-visible:outline-twin-accent-main active:scale-[0.97]
							data-[active=true]:bg-white/8 data-[active=true]:text-twin-accent-main"
					>
						{linkItem.label}
					</NavLink>
				))}
			</nav>

			<Button
				asChild={true}
				theme="accent-gradient"
				size="medium"
				className="mx-auto mt-6 rounded-full transition-transform duration-160
					ease-out focus-within:outline-3 focus-within:outline-offset-3
					focus-within:outline-white active:scale-[0.97]"
			>
				<NavLink href="/booking" onClick={closeMenu}>
					{siteConfig.bookings.label}
				</NavLink>
			</Button>
		</div>
	);
}

export { Navbar };
