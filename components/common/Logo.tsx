import Image from "next/image";
import { cnMerge } from "@/lib/utils/cn";
import { NavLink } from "./NavLink";

type LogoProps = {
	className?: string;
	iconSize?: number;
	shouldShowText?: boolean;
};

export function Logo(props: LogoProps) {
	const { className, iconSize = 40, shouldShowText = true } = props;

	return (
		<NavLink href="/" className={cnMerge("group flex items-center gap-3", className)}>
			<div
				className="relative shrink-0 overflow-hidden transition-transform group-hover:scale-105"
				style={{ height: iconSize, width: iconSize }}
			>
				<Image
					src="/logo.png"
					alt="Twins Language Services logo"
					width={iconSize}
					height={iconSize}
					className="size-full object-contain"
					priority={true}
					sizes={`${iconSize}px`}
				/>
			</div>

			{shouldShowText && (
				<span className="text-xl font-bold tracking-tight text-white md:text-2xl">
					<span className="text-twin-accent-lighter">Twins</span>{" "}
					<span className="text-white/90">Language Services</span>
				</span>
			)}
		</NavLink>
	);
}
