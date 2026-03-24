"use client";

import type { InferProps, PolymorphicProps } from "@zayne-labs/toolkit-react/utils";
import type { Prettify } from "@zayne-labs/toolkit-type-helpers";
import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@/components/common/slot";
import { cnJoin } from "@/lib/utils/cn";

export type ButtonProps = InferProps<"button">
	& Prettify<
		VariantProps<typeof buttonVariants> & {
			asChild?: boolean;
			isLoading?: boolean;
			loadingStyle?: "replace-content" | "side-by-side";
			unstyled?: boolean;
		}
	>;

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = tv({
	base: "flex items-center justify-center rounded-2xl",

	compoundVariants: [
		{
			className: "hover:bg-twin-primary-darker active:bg-twin-primary-lighter",
			isDisabled: false,
			theme: "primary",
			withInteractions: true,
		},
		{
			className: "hover:shadow-[0_0_36px_--theme(--color-twin-primary-main/30%)] active:opacity-90",
			isDisabled: false,
			theme: "primary-gradient",
			withInteractions: true,
		},
		{
			className: `hover:border-twin-primary-darker active:border-twin-primary-lighter
			active:text-twin-primary-lighter`,
			isDisabled: false,
			theme: "primary-ghost",
			withInteractions: true,
		},
		{
			className: "hover:shadow-[0_0_36px_theme(--color-twin-accent-main/30%)] active:opacity-90",
			isDisabled: false,
			theme: "accent-gradient",
			withInteractions: true,
		},
		{
			className: "border-2 border-twin-dark-4 bg-twin-disabled-fill text-twin-dark-4",
			isDisabled: true,
			isLoading: false,
		},
		{
			className: "hover:rounded-[50%] hover:shadow-none",
			size: "icon",
			withInteractions: true,
		},
	],

	defaultVariants: {
		size: "medium",
		theme: "primary",
	},

	variants: {
		disabled: {
			true: "cursor-not-allowed opacity-60",
		},

		isDisabled: {
			true: "cursor-not-allowed border-2 border-twin-dark-4 bg-twin-disabled-fill text-twin-dark-4",
		},

		isLoading: {
			true: "grid content-center",
		},

		size: {
			"full-width": "h-14 w-full text-[18px] font-bold",

			icon: "size-14 md:size-20",

			large: "h-16 px-14 text-xl font-extrabold",

			medium: "h-14 px-10 text-[18px] font-bold md:h-15.5 md:px-11",

			sm: "h-11 px-6 text-base font-semibold",
		},

		theme: {
			"accent-gradient": `bg-linear-to-r from-twin-accent-lighter via-twin-accent-main
			to-twin-accent-darker font-bold text-twin-primary-main
			shadow-[0_0_24px_--theme(--color-twin-accent-main/18%)] transition-shadow`,

			"ghost-dark": `border border-white/12 bg-transparent text-white/70 transition-colors
			hover:border-white/25 hover:bg-white/5 hover:text-white`,

			"ghost-light": `border border-twin-dark-1/12 bg-transparent text-twin-dark-1/70 transition-colors
			hover:border-twin-dark-1/25 hover:bg-twin-dark-1/5 hover:text-twin-dark-1`,

			primary: "bg-twin-primary-main font-bold text-twin-white",

			"primary-ghost": "border-2 border-twin-primary-main bg-white text-twin-primary-main",

			"primary-gradient": `bg-linear-to-r from-twin-primary-lighter via-twin-primary-main
			to-twin-primary-darker font-bold text-twin-white
			shadow-[0_0_24px_--theme(--color-twin-primary-main/18%)] transition-shadow`,

			"secondary-dark": `border border-twin-secondary-main/22 bg-twin-secondary-main/8
			text-twin-secondary-lighter transition-colors hover:bg-twin-secondary-main/18`,

			"secondary-ghost":
				"border-2 border-twin-secondary-lighter bg-transparent text-twin-secondary-lighter",
		},

		withInteractions: {
			true: "transition-[box-shadow,background-color,opacity,border-color] duration-300 ease-[ease]",
		},
	},
});

function Button<TElement extends React.ElementType>(props: PolymorphicProps<TElement, ButtonProps>) {
	const {
		as: Element = "button",
		asChild,
		children,
		className,
		isDisabled = false,
		disabled = isDisabled,
		isLoading = false,
		loadingStyle = "replace-content",
		size,
		theme,
		type = "button",
		unstyled,
		withInteractions = true,
		...restOfProps
	} = props;

	const Component = asChild ? Slot.Root : Element;

	const BTN_CLASSES =
		!unstyled ?
			buttonVariants({
				className,
				disabled,
				isDisabled,
				isLoading,
				size,
				theme,
				withInteractions,
			})
		:	className;

	const withIcon = (
		<>
			<Slot.Slottable>
				{loadingStyle === "replace-content" ?
					<div className="invisible [grid-area:1/1]">{children}</div>
				:	children}
			</Slot.Slottable>

			<span
				className={cnJoin(
					"flex size-5 animate-spin justify-center",
					loadingStyle === "replace-content" && "[grid-area:1/1]"
				)}
			>
				<svg className="size-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</span>
		</>
	);

	return (
		<Component type={type} className={BTN_CLASSES} disabled={disabled || isDisabled} {...restOfProps}>
			{isLoading ? withIcon : children}
		</Component>
	);
}

export { Button };
