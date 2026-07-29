import type { Metadata } from "next";
import Link from "next/link";
import { Main } from "@/app/-components";
import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	alternates: { canonical: "/about-us" },
	description:
		"Meet Twins Language Services and learn about our approach to clear, culturally aware communication.",
	openGraph: {
		description:
			"Meet Twins Language Services and learn about our approach to clear, culturally aware communication.",
		title: "About Twins Language Services",
		url: "/about-us",
	},
	title: "About Us | Twins Language Services",
};

const principles = [
	{
		description:
			"We listen for context, intent, and cultural nuance—not only the words being spoken.",
		title: "Human Understanding",
	},
	{
		description:
			"We prepare for each setting and communicate clearly about scope, timing, and next steps.",
		title: "Professional Care",
	},
	{
		description:
			"We treat sensitive conversations and documents with discretion appropriate to the engagement.",
		title: "Thoughtful Handling",
	},
] as const;

export default function AboutPage() {
	return (
		<Main>
			<section className="relative overflow-hidden bg-twin-primary-main px-5 pt-36 pb-24 text-white md:px-10 md:pt-44 md:pb-32 lg:px-[8%]">
				<div className="mx-auto w-full max-w-350">
					<p className="flex items-center gap-4 text-sm font-black tracking-[0.24em] text-twin-accent-main uppercase">
						<span aria-hidden="true" className="h-0.5 w-12 bg-current" />
						About Twins Language Services
					</p>
					<h1 className="mt-7 max-w-260 text-balance text-[clamp(3.25rem,8vw,7rem)] leading-[0.95] font-bold tracking-[-0.05em]">
						Language work is
						<span className="block font-serif font-normal text-twin-accent-main italic">
							people work.
						</span>
					</h1>
					<p className="mt-8 max-w-190 text-pretty text-lg/relaxed text-white/75 md:text-xl">
						We help people, organizations, and communities communicate across languages with
						clarity, respect, and attention to context.
					</p>
				</div>
			</section>

			<section className="bg-white px-5 py-24 md:px-10 md:py-32 lg:px-[8%]">
				<div className="mx-auto grid w-full max-w-350 gap-14 lg:grid-cols-[0.7fr_1.3fr]">
					<div>
						<p className="text-sm font-black tracking-[0.24em] text-twin-accent-darker uppercase">
							Our Approach
						</p>
						<h2 className="mt-4 text-balance text-4xl leading-tight font-bold tracking-tight text-twin-primary-main md:text-5xl">
							Clear communication begins before the appointment.
						</h2>
					</div>
					<div className="space-y-6 text-lg/relaxed text-twin-secondary-main">
						<p>
							Every setting has its own language, expectations, and stakes. A medical visit
							differs from a school conference; a business meeting differs from a legal
							proceeding. We begin by understanding that context.
						</p>
						<p>
							From there, we align the language, format, timing, and logistics so the people
							involved can focus on the conversation itself.
						</p>
					</div>
				</div>
			</section>

			<section className="bg-twin-light-1 px-5 py-24 md:px-10 md:py-32 lg:px-[8%]">
				<div className="mx-auto w-full max-w-350">
					<p className="text-sm font-black tracking-[0.24em] text-twin-accent-darker uppercase">
						What Guides Us
					</p>
					<div className="mt-10 divide-y divide-twin-primary-main/14 border-y border-twin-primary-main/14">
						{principles.map((principle, index) => (
							<article
								key={principle.title}
								className="grid gap-5 py-9 md:grid-cols-[80px_0.75fr_1.25fr] md:items-start"
							>
								<span className="font-mono text-sm font-bold text-twin-accent-darker">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h2 className="text-2xl font-bold text-twin-primary-main">{principle.title}</h2>
								<p className="text-lg/relaxed text-twin-secondary-main">
									{principle.description}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-twin-primary-main px-5 py-24 text-white md:px-10 md:py-28 lg:px-[8%]">
				<div className="mx-auto flex w-full max-w-350 flex-col justify-between gap-10 lg:flex-row lg:items-end">
					<div>
						<p className="text-sm font-black tracking-[0.24em] text-twin-accent-main uppercase">
							Work With Us
						</p>
						<h2 className="mt-4 max-w-220 text-balance text-4xl leading-tight font-bold tracking-tight md:text-6xl">
							Let’s make the next conversation clearer.
						</h2>
					</div>
					<Link
						href="/booking"
						className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full
							bg-twin-accent-main px-8 font-bold text-twin-primary-main no-underline
							transition-[background-color,transform] duration-160 ease-[var(--ease-out)]
							hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-4
							focus-visible:outline-twin-accent-main active:scale-[0.97]"
					>
						Schedule Service
						<IconBox aria-hidden="true" icon="lucide:arrow-up-right" className="size-5" />
					</Link>
				</div>
			</section>
		</Main>
	);
}
