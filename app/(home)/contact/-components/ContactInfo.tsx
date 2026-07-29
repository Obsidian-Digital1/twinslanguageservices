import { IconBox } from "@/components/common";
import { siteConfig } from "@/lib/config/site";

const CONTACT_INFO = [
	{
		href: `tel:${siteConfig.contact.phone}`,
		icon: "lucide:phone",
		label: "Phone",
		value: siteConfig.contact.phone,
	},
	{
		href: `mailto:${siteConfig.contact.email}`,
		icon: "lucide:mail",
		label: "Email",
		value: siteConfig.contact.email,
	},
	{
		href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address.full)}`,
		icon: "lucide:map-pin",
		label: "Address",
		value: siteConfig.contact.address.full,
	},
	{
		icon: "lucide:clock",
		label: "Business Hours",
		value: siteConfig.contact.hours,
	},
] as const;

export function ContactInfo() {
	return (
		<section className="relative w-full overflow-hidden bg-linear-to-br from-twin-primary-main via-twin-primary-main to-[#0a2540] px-5 pt-36 pb-24 md:px-10 md:pt-44 md:pb-32 lg:px-[8%]">
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
				<div className="absolute top-0 right-0 size-150 rounded-full bg-twin-accent-main/20 blur-[120px]" />
			</div>

			<div className="relative mx-auto flex w-full max-w-350 flex-col gap-16">
				<div className="flex flex-col gap-8">
					<p className="flex items-center gap-4 text-sm font-black tracking-[0.24em] text-twin-accent-main uppercase">
						<span aria-hidden="true" className="h-0.5 w-12 bg-current" />
						Let’s Connect
					</p>
					<h1 className="max-w-225 text-balance text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.05em] text-white">
						Start Your
						<span className="block font-serif font-normal text-twin-accent-main italic">
							Conversation.
						</span>
					</h1>
					<p className="max-w-175 text-pretty text-lg/relaxed text-white/80 md:text-xl">
						Whether you need interpretation, translation, or transcription, share the setting
						and timing so we can help identify the right next step.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-4">
					{CONTACT_INFO.map((info) => (
						<div key={info.label} className="min-w-0 bg-twin-primary-main/92 p-7">
							<span className="flex size-12 items-center justify-center rounded-full bg-twin-accent-main/12 text-twin-accent-main">
								<IconBox aria-hidden="true" icon={info.icon} className="size-5" />
							</span>
							<h2 className="mt-6 text-xs font-black tracking-[0.2em] text-twin-accent-lighter uppercase">
								{info.label}
							</h2>
							{"href" in info ? (
								<a
									href={info.href}
									target={info.href.startsWith("http") ? "_blank" : undefined}
									rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
									className="mt-2 block break-words text-base/relaxed font-semibold text-white
										no-underline transition-colors duration-160 hover:text-twin-accent-main
										focus-visible:outline-3 focus-visible:outline-offset-3
										focus-visible:outline-twin-accent-main"
								>
									{info.value}
									{info.href.startsWith("http") && (
										<span className="sr-only"> (opens in a new tab)</span>
									)}
								</a>
							) : (
								<p className="mt-2 break-words text-base/relaxed font-semibold text-white">
									{info.value}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
