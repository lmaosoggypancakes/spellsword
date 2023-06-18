import { invoke } from "@tauri-apps/api/tauri";
import { Activity } from "~/types";
export const setDiscordActivity = (a: Activity) => {
  if (!window.__TAURI_IPC__) return;
  invoke("set_discord_activity", { details: a });
};
