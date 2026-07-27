"use client";

import type { UrlObject } from "node:url";
import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { isString, type AnyString } from "@zayne-labs/toolkit-type-helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MainAppRoutes<TAppRoutes extends string = AnyString> =
	TAppRoutes extends `${infer TPrefix}/[${string}]` ? `${TPrefix}/${string}` : TAppRoutes;

type ModifiedHref = "#" | (Omit<UrlObject, "pathname"> & { pathname?: MainAppRoutes }) | MainAppRoutes;

function NavLink(
	props: Omit<InferProps<typeof Link>, "href"> & {
		href: ModifiedHref;
		relative?: boolean;
	}
) {
	const { children, className, href, ...restOfProps } = props;

	const pathname = usePathname();

	const isActive = isString(href) ? pathname === href : pathname === href.pathname;

	return (
		<Link href={href} data-active={isActive} className={className} {...restOfProps}>
			{children}
		</Link>
	);
}

export { NavLink };
