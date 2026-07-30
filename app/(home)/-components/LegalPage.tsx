import type { ReactNode } from "react";
import { Main } from "@/app/-components";

type LegalSection = {
	content: ReactNode;
	title: string;
};

export function LegalPage({
	eyebrow,
	intro,
	sections,
	title,
}: {
	eyebrow: string;
	intro: ReactNode;
	sections: LegalSection[];
	title: string;
}) {
	return (
		<Main>
			<header className="relative overflow-hidden bg-twin-primary-main px-6 pt-36 pb-20 text-white md:pt-44 md:pb-24 lg:px-[8%]">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(96,216,222,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,216,222,0.08)_1px,transparent_1px)]
						bg-size-[56px_56px]
						opacity-30"
				/>
				<div className="relative mx-auto max-w-275">
					<p className="mb-5 text-sm font-black tracking-[0.28em] text-twin-accent-main uppercase">
						{eyebrow}
					</p>
					<h1 className="max-w-225 text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
						{title}
					</h1>
					<div className="mt-7 max-w-190 text-base/relaxed text-white/70 md:text-lg/relaxed">{intro}</div>
				</div>
			</header>

			<section className="bg-twin-white px-6 py-20 md:py-28 lg:px-[8%]">
				<div className="mx-auto grid max-w-275 gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
					<aside className="lg:sticky lg:top-28 lg:self-start">
						<p className="text-sm font-black tracking-[0.22em] text-twin-accent-darker uppercase">
							Last updated
						</p>
						<p className="mt-2 text-lg font-bold text-twin-primary-main">July 30, 2026</p>
					</aside>

					<div className="space-y-12">
						{sections.map((section) => (
							<section key={section.title} className="scroll-mt-28 border-t border-twin-primary-main/10 pt-8">
								<h2 className="text-2xl font-black tracking-tight text-twin-primary-main md:text-3xl">
									{section.title}
								</h2>
								<div
									className="mt-4 space-y-4 text-base/relaxed text-twin-primary-main/75
										[&_a]:font-semibold [&_a]:text-twin-accent-darker
										[&_a]:underline-offset-4 [&_a:hover]:underline
										[&_li]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2"
								>
									{section.content}
								</div>
							</section>
						))}
					</div>
				</div>
			</section>
		</Main>
	);
}
