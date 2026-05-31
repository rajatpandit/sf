import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	// The agent has finished its execution loop.
	pi.on("agent_stop", async (_event, ctx) => {
		ctx.shutdown();
	});
}
