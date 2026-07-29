import Link from "next/link";
import { Logo, NavLink } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

const columns = [
	{
		links: siteConfig.navigation,
		title: "Pages",
	},
	{
		links: siteConfig.services.map((service) => ({
			href: `/services#${service.id}`,
			label: service.title,
		})),
		title: "Services",
	},
] as const;

const focusClasses =
	"rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-twin-accent-main";

function Footer() {
	return (
		<footer className="flex w-full justify-center overflow-hidden border-t border-white/8 bg-twin-primary-main px-5 pt-14 pb-8 md:px-10 lg:px-25">
			<div className="w-full max-w-275">
				<div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.15fr]">
					<div className="flex flex-col gap-4">
						<Logo iconSize={36} />
						<p className="max-w-72 text-base/relaxed text-white/65">{siteConfig.tagline}</p>
					</div>

					{columns.map((column) => (
						<div key={column.title} className="flex flex-col gap-3">
							<h2 className="text-sm font-black tracking-[0.24em] text-white/50 uppercase">
								{column.title}
							</h2>
							<nav aria-label={`${column.title} links`} className="flex flex-col gap-2.5">
								{column.links.map((link) => (
									<NavLink
										key={link.label}
										href={link.href as never}
										className={`${focusClasses} text-base text-white/65 no-underline
											transition-colors duration-160 hover:text-white`}
									>
										{link.label}
									</NavLink>
								))}
							</nav>
						</div>
					))}

					<div className="flex min-w-0 flex-col gap-3">
						<h2 className="text-sm font-black tracking-[0.24em] text-white/50 uppercase">
							Contact
						</h2>
						<a
							href={`tel:${siteConfig.contact.phone}`}
							className={`${focusClasses} text-base text-white/70 no-underline
								transition-colors duration-160 hover:text-white`}
						>
							{siteConfig.contact.phone}
						</a>
						<a
							href={`mailto:${siteConfig.contact.email}`}
							className={`${focusClasses} break-words text-base text-white/70 no-underline
								transition-colors duration-160 hover:text-white`}
						>
							{siteConfig.contact.email}
						</a>
						<p className="text-base/relaxed text-white/65">{siteConfig.contact.address.full}</p>
					</div>
				</div>

				<div className="mb-6 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/8 pt-7">
					{Object.entries(siteConfig.social).map(([network, href]) => (
						<Link
							key={network}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className={`${focusClasses} text-base text-white/65 no-underline
								transition-colors duration-160 hover:text-twin-accent-main`}
						>
							<span className="capitalize">{network}</span>
							<span className="sr-only"> (opens in a new tab)</span>
						</Link>
					))}
				</div>

				<div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6">
					<p className="text-sm text-white/50">
						© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
					</p>
					<NavLink
						href="/contact"
						className={`${focusClasses} text-sm text-white/60 no-underline
							transition-colors duration-160 hover:text-white`}
					>
						Request Language Support
					</NavLink>
				</div>
			</div>
		</footer>
	);
}

export { Footer };
