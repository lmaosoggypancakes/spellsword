import DiscordRPC from "discord-rpc";

const clientId = "1117689291120836699";

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: "ipc" });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc) {
    return;
  }

  rpc.setActivity({
    details: "losing to a mf rn",
    startTimestamp,
    instance: false,
  });
}
rpc.on("ready", () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);

export default defineNuxtPlugin((nuxtApp) => {});
