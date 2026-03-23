import * as Avatar from "@/components/ui/avatar";
import { cnMerge } from "@/lib/utils/cn";

type TestimonialsSectionProps = {
	className?: string;
	description: string;
	testimonials: Array<{
		author: TestimonialAuthor;
		href?: string;
		text: string;
	}>;
	title: string;
};

export function TestimonialsSection({
	className,
	description,
	testimonials,
	title,
}: TestimonialsSectionProps) {
	return (
		<section className={cnMerge("flex w-full justify-center px-6 py-28", className)}>
			<div className="flex w-full max-w-275 flex-col items-center gap-14 sm:gap-16">
				<div className="flex flex-col items-center gap-5 px-4 text-center">
					<p className="mb-5 text-lg font-black tracking-[0.28em] text-webdev-primary-main uppercase">
						Reviews
					</p>
					<h2
						className="mb-5 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.1] font-bold tracking-tight
							text-white"
					>
						{title}
					</h2>
					<p className="max-w-162.5 text-lg/relaxed font-medium text-white/45 md:text-xl">
						{description}
					</p>
				</div>

				<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
					<div
						className="group flex flex-row gap-(--gap) overflow-hidden p-2
							[--animation-duration:100s] [--gap:1rem]"
					>
						<div
							className="flex shrink-0 animate-marquee flex-row justify-around gap-(--gap)
								group-hover:paused"
						>
							{[...Array(4).keys()].map((index) =>
								testimonials.map((testimonial, i) => (
									// eslint-disable-next-line react-x/no-array-index-key
									<TestimonialCard key={`${index}-${i}`} {...testimonial} />
								))
							)}
						</div>
					</div>

					<div
						className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-linear-to-r
							from-webdev-dark-1 sm:block"
					/>
					<div
						className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-linear-to-l
							from-webdev-dark-1 sm:block"
					/>
				</div>
			</div>
		</section>
	);
}

export type TestimonialAuthor = {
	avatar: string;
	handle: string;
	name: string;
};

export type TestimonialCardProps = {
	author: TestimonialAuthor;
	className?: string;
	href?: string;
	text: string;
};

export function TestimonialCard({ author, className, href, text }: TestimonialCardProps) {
	const Element = href ? "a" : "div";

	return (
		<Element
			{...(href ? { href } : {})}
			className={cnMerge(
				"flex flex-col rounded-2xl border",
				"border-white/6 bg-white/2.5",
				"p-6 text-start sm:p-8",
				"hover:border-webdev-primary-main/38 hover:bg-webdev-primary-main/5",
				"max-w-85 sm:max-w-95",
				"transition-colors duration-300",
				className
			)}
		>
			<div className="flex items-center gap-4">
				<Avatar.Root className="size-14">
					<Avatar.Image src={author.avatar} alt={author.name} />
				</Avatar.Root>
				<div className="flex flex-col items-start gap-1">
					<h3 className="text-[17px] leading-none font-bold text-white">{author.name}</h3>
					<p className="text-sm font-medium text-webdev-primary-lighter/80">{author.handle}</p>
				</div>
			</div>
			<p className="mt-6 flex-1 text-base/relaxed text-white/70 italic">"{text}"</p>
		</Element>
	);
}
