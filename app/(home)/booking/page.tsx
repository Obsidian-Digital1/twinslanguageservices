import type { Metadata } from "next";
import Link from "next/link";
import { Main } from "@/app/-components";
import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	alternates: { canonical: "/booking" },
	description:
		"Request interpretation, translation, or transcription services from Twins Language Services.",
	openGraph: {
		description:
			"Request interpretation, translation, or transcription services from Twins Language Services.",
		title: "Schedule Language Service",
		url: "/booking",
	},
	title: "Schedule Service | Twins Language Services",
};

export default function BookingPage() {
	const hasBookingLink = siteConfig.bookings.url.startsWith("https://");

	return (
		<Main>
			<section className="min-h-[calc(100vh-5rem)] bg-twin-primary-main px-5 pt-36 pb-24 text-white md:px-10 md:pt-44 md:pb-32 lg:px-[8%]">
				<div className="mx-auto grid w-full max-w-350 gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
					<div>
						<p className="flex items-center gap-4 text-sm font-black tracking-[0.24em] text-twin-accent-main uppercase">
							<span aria-hidden="true" className="h-0.5 w-12 bg-current" />
							Schedule Language Support
						</p>
						<h1 className="mt-7 max-w-220 text-balance text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.05em]">
							Let’s plan the
							<span className="block font-serif font-normal text-twin-accent-main italic">
								right service.
							</span>
						</h1>
						<p className="mt-8 max-w-175 text-pretty text-lg/relaxed text-white/75 md:text-xl">
							Share the language, setting, preferred date, and any details that will help us
							understand your request.
						</p>
					</div>

					<div className="border-l-2 border-twin-accent-main bg-white/5 p-7 md:p-10">
						{hasBookingLink ? (
							<>
								<h2 className="text-3xl font-bold">Open the Scheduling Calendar</h2>
								<p className="mt-4 text-lg/relaxed text-white/75">
									The calendar opens in a new tab so you can choose an available time.
								</p>
								<a
									href={siteConfig.bookings.url}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full
										bg-twin-accent-main px-8 font-bold text-twin-primary-main no-underline
										transition-[background-color,transform] duration-160 ease-[var(--ease-out)]
										hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-4
										focus-visible:outline-twin-accent-main active:scale-[0.97]"
								>
									Open Scheduling Calendar
									<IconBox
										aria-hidden="true"
										icon="lucide:external-link"
										className="size-5"
									/>
									<span className="sr-only"> (opens in a new tab)</span>
								</a>
							</>
						) : (
							<>
								<p className="text-sm font-black tracking-[0.22em] text-twin-accent-main uppercase">
									Scheduling Link Coming Soon
								</p>
								<h2 className="mt-4 text-balance text-3xl font-bold">
									Contact our team to request a date.
								</h2>
								<p className="mt-4 text-lg/relaxed text-white/75">
									Our online calendar is being prepared. The contact form includes an optional
									appointment date, or you can call us directly.
								</p>
								<div className="mt-8 flex flex-col gap-4 sm:flex-row">
									<Link
										href="/contact#contact-form"
										className="inline-flex min-h-14 items-center justify-center rounded-full
											bg-twin-accent-main px-7 font-bold text-twin-primary-main no-underline
											transition-[background-color,transform] duration-160
											ease-[var(--ease-out)] hover:bg-white focus-visible:outline-3
											focus-visible:outline-offset-4 focus-visible:outline-twin-accent-main
											active:scale-[0.97]"
									>
										Request a Date
									</Link>
									<a
										href={`tel:${siteConfig.contact.phone}`}
										className="inline-flex min-h-14 items-center justify-center rounded-full border
											border-white/30 px-7 font-bold text-white no-underline
											transition-[background-color,border-color,transform] duration-160
											ease-[var(--ease-out)] hover:border-white/60 hover:bg-white/8
											focus-visible:outline-3 focus-visible:outline-offset-4
											focus-visible:outline-twin-accent-main active:scale-[0.97]"
									>
										Call {siteConfig.contact.phone}
									</a>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</Main>
	);
}
