import type { Metadata } from "next";
import Link from "next/link";
import { Main } from "@/app/-components";
import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	alternates: { canonical: "/" },
	description: siteConfig.seo.description,
	openGraph: {
		description: siteConfig.seo.description,
		title: siteConfig.seo.title,
		url: "/",
	},
};

const linkFocus =
	"focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-twin-accent-main";

export default function HomePage() {
	return (
		<Main>
			<section className="relative isolate overflow-hidden bg-twin-primary-main px-5 pt-36 pb-24 text-white md:px-10 md:pt-44 md:pb-32 lg:px-[8%]">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(96,216,222,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,216,222,0.08)_1px,transparent_1px)]
						bg-size-[54px_54px]
						opacity-35"
				/>
				<div className="relative mx-auto grid w-full max-w-350 gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
					<div>
						<p className="mb-7 flex items-center gap-4 text-sm font-black tracking-[0.24em] text-twin-accent-main uppercase">
							<span aria-hidden="true" className="h-0.5 w-12 bg-current" />
							Lancaster, Pennsylvania
						</p>
						<h1 className="max-w-245 text-[clamp(3.25rem,8vw,7.25rem)] leading-[0.92] font-bold tracking-[-0.055em] text-balance">
							Communication
							<span className="block font-serif font-normal text-twin-accent-main italic">
								without barriers.
							</span>
						</h1>
						<p className="mt-8 max-w-175 text-lg leading-[1.75] text-pretty text-white/75 md:text-xl">
							Professional interpretation, document translation, and transcription for
							healthcare, legal, business, education, and community settings.
						</p>
						<div className="mt-10 flex flex-col gap-4 sm:flex-row">
							<Link
								href="/booking"
								className={`${linkFocus} inline-flex min-h-14 items-center justify-center gap-3
									rounded-full bg-twin-accent-main px-8 font-bold text-twin-primary-main
									no-underline transition-[background-color,transform] duration-160
									ease-out hover:bg-white active:scale-[0.97]`}
							>
								Schedule Service
								<IconBox aria-hidden="true" icon="lucide:arrow-up-right" className="size-5" />
							</Link>
							<Link
								href="/services"
								className={`${linkFocus} inline-flex min-h-14 items-center justify-center rounded-full
									border border-white/25 px-8 font-bold text-white no-underline
									transition-[background-color,border-color,transform] duration-160
									ease-out hover:border-white/55 hover:bg-white/8
									active:scale-[0.97]`}
							>
								Explore Services
							</Link>
						</div>
					</div>

					<aside className="border-l-2 border-twin-accent-main pl-6 lg:mb-2">
						<p className="text-sm font-black tracking-[0.22em] text-twin-accent-main uppercase">
							Need Help Now?
						</p>
						<a
							href={`tel:${siteConfig.contact.phone}`}
							className={`${linkFocus} mt-3 block text-2xl font-bold text-white no-underline
								transition-colors duration-160 hover:text-twin-accent-main`}
						>
							{siteConfig.contact.phone}
						</a>
						<p className="mt-2 text-base/relaxed text-white/65">
							Call to discuss timing, language, and service details.
						</p>
					</aside>
				</div>
			</section>

			<section className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-[8%]">
				<div className="mx-auto w-full max-w-350">
					<div className="grid gap-10 border-b border-twin-primary-main/12 pb-14 lg:grid-cols-[0.75fr_1.25fr]">
						<div>
							<p className="text-sm font-black tracking-[0.24em] text-twin-accent-darker uppercase">
								Our Services
							</p>
							<h2 className="mt-4 text-4xl/tight font-bold tracking-tight text-balance text-twin-primary-main md:text-5xl">
								Language support shaped around the conversation.
							</h2>
						</div>
						<p className="max-w-180 self-end text-lg/relaxed text-pretty text-twin-secondary-main">
							Every request begins with context. We learn what you need, where the service will
							happen, and which language professional is suited to the setting.
						</p>
					</div>

					<div className="divide-y divide-twin-primary-main/12">
						{siteConfig.services.slice(0, 6).map((service, index) => (
							<article
								key={service.id}
								className="grid gap-5 py-8 md:grid-cols-[72px_1fr_auto] md:items-center md:gap-8"
							>
								<span className="font-mono text-sm font-bold text-twin-accent-darker">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="text-2xl font-bold text-twin-primary-main">{service.title}</h3>
									<p className="mt-2 max-w-190 text-base/relaxed text-twin-secondary-main">
										{service.shortDescription}
									</p>
								</div>
								<Link
									href={`/services#${service.id}`}
									aria-label={`Learn about ${service.title}`}
									className={`${linkFocus} inline-flex size-12 items-center justify-center rounded-full
										border border-twin-primary-main/18 text-twin-primary-main no-underline
										transition-[background-color,color,transform] duration-160
										ease-out hover:bg-twin-primary-main hover:text-white
										active:scale-[0.97]`}
								>
									<IconBox aria-hidden="true" icon="lucide:arrow-right" className="size-5" />
								</Link>
							</article>
						))}
					</div>

					<Link
						href="/services"
						className={`${linkFocus} mt-10 inline-flex items-center gap-3 rounded-md font-bold
							text-twin-primary-main underline decoration-twin-accent-main decoration-2
							underline-offset-6 transition-colors duration-160 hover:text-twin-accent-darker`}
					>
						View All Services
						<IconBox aria-hidden="true" icon="lucide:arrow-right" className="size-5" />
					</Link>
				</div>
			</section>

			<section className="bg-twin-light-1 px-5 py-24 md:px-10 md:py-32 lg:px-[8%]">
				<div className="mx-auto w-full max-w-350">
					<p className="text-sm font-black tracking-[0.24em] text-twin-accent-darker uppercase">
						How It Works
					</p>
					<h2 className="mt-4 max-w-220 text-4xl/tight font-bold tracking-tight text-balance text-twin-primary-main md:text-5xl">
						A clear path from first request to service delivery.
					</h2>
					<ol className="mt-14 grid gap-px overflow-hidden border border-twin-primary-main/12 bg-twin-primary-main/12 lg:grid-cols-4">
						{siteConfig.processSteps.map((step, index) => (
							<li key={step.title} className="bg-twin-light-1 p-7 md:p-8">
								<p className="font-mono text-sm font-bold text-twin-accent-darker">
									{String(index + 1).padStart(2, "0")}
								</p>
								<h3 className="mt-8 text-xl font-bold text-twin-primary-main">{step.title}</h3>
								<p className="mt-3 text-base/relaxed text-twin-secondary-main">{step.description}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section className="bg-twin-primary-main px-5 py-24 text-white md:px-10 md:py-28 lg:px-[8%]">
				<div className="mx-auto grid w-full max-w-350 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
					<div>
						<p className="text-sm font-black tracking-[0.24em] text-twin-accent-main uppercase">
							Start a Conversation
						</p>
						<h2 className="mt-4 max-w-230 text-4xl/tight font-bold tracking-tight text-balance md:text-6xl">
							Tell us what needs to be understood.
						</h2>
						<p className="mt-5 max-w-165 text-lg/relaxed text-white/70">
							Share the language, setting, and timing. We’ll follow up to discuss the right
							service for your request.
						</p>
					</div>
					<Link
						href="/contact"
						className={`${linkFocus} inline-flex min-h-14 items-center justify-center gap-3 rounded-full
							bg-twin-accent-main px-8 font-bold text-twin-primary-main no-underline
							transition-[background-color,transform] duration-160 ease-out
							hover:bg-white active:scale-[0.97]`}
					>
						Contact Our Team
						<IconBox aria-hidden="true" icon="lucide:arrow-up-right" className="size-5" />
					</Link>
				</div>
			</section>
		</Main>
	);
}
