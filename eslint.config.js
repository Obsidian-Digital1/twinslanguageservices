import { zayne } from "@zayne-labs/eslint-config";

export default zayne({
	type: "app",
	ignores: [".next/**", "eslint.config.js", "next-env.d.ts"],
	react: true,
	tailwindcssBetter: true,
	typescript: true,
});
