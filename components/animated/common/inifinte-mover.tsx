"use client";

import { useEffect, useRef } from "react";
import { cnMerge } from "@/lib/utils/cn";

function InfiniteMover(props: {
	children: React.ReactNode;
	className?: string;
	direction?: "left" | "right";
	pauseOnHover?: boolean;
	speed?: "fast" | "normal" | "slow";
}) {
	const { children, className, direction = "left", pauseOnHover = true, speed = "fast" } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const getDirection = () => {
			if (containerRef.current) {
				if (direction === "left") {
					containerRef.current.style.setProperty("--animation-direction", "forwards");
				} else {
					containerRef.current.style.setProperty("--animation-direction", "reverse");
				}
			}
		};
		const getSpeed = () => {
			if (containerRef.current) {
				if (speed === "fast") {
					containerRef.current.style.setProperty("--animation-duration", "20s");
				} else if (speed === "normal") {
					containerRef.current.style.setProperty("--animation-duration", "40s");
				} else {
					containerRef.current.style.setProperty("--animation-duration", "80s");
				}
			}
		};
		const addAnimation = () => {
			if (containerRef.current && scrollerRef.current) {
				const scroller = scrollerRef.current;

				if (scroller.dataset.cloned !== "true") {
					const scrollerContent = [...scroller.children];
					scrollerContent.forEach((item) => {
						scroller.append(item.cloneNode(true));
					});
					scroller.dataset.cloned = "true";
				}

				getDirection();
				getSpeed();
			}
		};

		addAnimation();
	}, [direction, speed]);

	return (
		<div
			ref={containerRef}
			className={cnMerge(
				`relative z-20 max-w-7xl overflow-hidden
				mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]`,
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cnMerge(
					"flex w-max min-w-full shrink-0 animate-scroll flex-nowrap gap-4 py-4",
					pauseOnHover && "hover:paused"
				)}
			>
				{children}
			</ul>
		</div>
	);
}

export { InfiniteMover };
