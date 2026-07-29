import type { Metadata } from "next";
import Link from "next/link";
import { Main } from "@/app/-components";
import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	alternates: { canonical: "/services" },
	description:
		"Explore interpretation, document translation, transcription, and language support services in Lancaster, PA.",
	openGraph: {
		description:
			"Explore interpretation, document translation, transcription, and language support services in Lancaster, PA.",
		title: "Language Services | Twins Language Services",
		url: "/services",
	},
	title: "Language Services | Twins Language Services",
};

export default function ServicesPage() {
	return (
		<Main>
			<section
				className="relative overflow-hidden bg-twin-primary-main px-5 pt-36 pb-24 text-white md:px-10
					md:pt-44 md:pb-32 lg:px-[8%]"
			>
				<div className="mx-auto w-full max-w-350">
					<p
						className="flex items-center gap-4 text-sm font-black tracking-[0.24em]
							text-twin-accent-main uppercase"
					>
						<span aria-hidden="true" className="h-0.5 w-12 bg-current" />
						Language Services
					</p>
					<h1
						className="mt-7 max-w-275 text-[clamp(3.25rem,8vw,7rem)] leading-[0.95] font-bold
							tracking-[-0.05em] text-balance"
					>
						The right support for
						<span className="block font-serif font-normal text-twin-accent-main italic">
							every setting.
						</span>
					</h1>
					<p className="mt-8 max-w-190 text-lg/relaxed text-pretty text-white/75 md:text-xl">
						Choose the service that best matches your request. If you are unsure, contact us and
						we’ll help identify the right starting point.
					</p>
				</div>
			</section>

			<section className="bg-white px-5 py-20 md:px-10 md:py-28 lg:px-[8%]">
				<div
					className="mx-auto w-full max-w-350 divide-y divide-twin-primary-main/14 border-y
						border-twin-primary-main/14"
				>
					{siteConfig.services.map((service, index) => (
						<article
							key={service.id}
							id={service.id}
							className="grid scroll-mt-28 gap-6 py-10 md:grid-cols-[80px_0.8fr_1.2fr_auto]
								md:items-start md:gap-8"
						>
							<span className="font-mono text-sm font-bold text-twin-accent-darker">
								{String(index + 1).padStart(2, "0")}
							</span>
							<div className="flex items-center gap-4">
								<span
									className="flex size-11 shrink-0 items-center justify-center rounded-full
										bg-twin-accent-subtle text-twin-primary-main"
								>
									<IconBox aria-hidden="true" icon={service.icon} className="size-5" />
								</span>
								<h2 className="text-2xl/tight font-bold text-balance text-twin-primary-main">
									{service.title}
								</h2>
							</div>
							<p className="max-w-190 text-lg/relaxed text-twin-secondary-main">
								{service.shortDescription}
							</p>
							<Link
								href="/booking"
								aria-label={`Schedule ${service.title}`}
								className="inline-flex min-h-12 items-center justify-center rounded-full border
									border-twin-primary-main/18 px-5 text-sm font-bold text-twin-primary-main
									no-underline transition-[background-color,color,transform] duration-160 ease-out
									hover:bg-twin-primary-main hover:text-white focus-visible:outline-3
									focus-visible:outline-offset-3 focus-visible:outline-twin-accent-darker
									active:scale-[0.97]"
							>
								Schedule
							</Link>
						</article>
					))}
				</div>
			</section>

			<section className="bg-twin-light-1 px-5 py-24 md:px-10 md:py-28 lg:px-[8%]">
				<div className="mx-auto grid w-full max-w-350 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
					<div>
						<p className="text-sm font-black tracking-[0.24em] text-twin-accent-darker uppercase">
							Not Sure Where to Begin?
						</p>
						<h2
							className="mt-4 max-w-230 text-4xl/tight font-bold tracking-tight text-balance
								text-twin-primary-main md:text-5xl"
						>
							Tell us about the people, place, language, and timing.
						</h2>
						<p className="mt-5 max-w-175 text-lg/relaxed text-twin-secondary-main">
							We’ll review your request and follow up about the service that fits the setting.
						</p>
					</div>
					<Link
						href="/contact"
						className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full
							bg-twin-primary-main px-8 font-bold text-white no-underline
							transition-[background-color,transform] duration-160 ease-out
							hover:bg-twin-secondary-main focus-visible:outline-3 focus-visible:outline-offset-4
							focus-visible:outline-twin-accent-darker active:scale-[0.97]"
					>
						Discuss Your Request
						<IconBox aria-hidden="true" icon="lucide:arrow-up-right" className="size-5" />
					</Link>
				</div>
			</section>
		</Main>
	);
}
