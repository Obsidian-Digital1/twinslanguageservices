"use client";

import { ProgressProvider } from "@bprogress/next/app";

type ProvidersProps = {
	children: React.ReactNode;
};

function Providers(props: ProvidersProps) {
	const { children } = props;

	return (
		<ProgressProvider
			height="2.5px"
			color="var(--color-twin-primary-darker)"
			options={{ showSpinner: true }}
			shallowRouting={true}
		>
			{children}
		</ProgressProvider>
	);
}

export { Providers };
