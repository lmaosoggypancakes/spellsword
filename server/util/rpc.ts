import DiscordRPC from "discord-rpc";
import { Activity } from "~/types";

const startTimestamp = new Date();
const clientId = "1117689291120836699";

export let tryConnect = false;
export let rpc: DiscordRPC.Client;
export const rpcActivity = {
  details: Activity.index,
  startTimestamp,
  instance: false,
  largeImageKey: "logo",
};
export const useRpc = (): typeof rpc | null => {
  if (rpc) return rpc;

  DiscordRPC.register(clientId);
  rpc = new DiscordRPC.Client({
    transport: "ipc",
  });
  rpc.login({ clientId }).catch(console.error);
  rpc.on("ready", async () => {
    console.log("Connected!");
    rpc.setActivity(rpcActivity);
    return rpc;
  });
  return null;
};
