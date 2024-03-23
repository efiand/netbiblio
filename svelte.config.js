import path from "path";
import node from "@sveltejs/adapter-node";

const config = {
	kit: {
		adapter: node({
			out: "build"
		}),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve("./src/components"),
					$css: path.resolve("./src/css")
				}
			},
			optimizeDeps: {
				include: ["dayjs"]
			}
		}
	}
};

export default config;
