import { cnMerge } from "@/lib/utils/cn";

function Main(props: React.ComponentProps<"main">) {
	const { children, className, ...restOfProps } = props;

	return (
		<main
			id="main-content"
			tabIndex={-1}
			className={cnMerge("flex w-full grow flex-col outline-none", className)}
			{...restOfProps}
		>
			{children}
		</main>
	);
}

export { Main };
