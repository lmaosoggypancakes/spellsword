import { useRpc, rpcActivity } from "~/server/util/rpc";
import { Activity } from "~/types";

export default defineEventHandler((event) => {
  const rpc = useRpc();
  rpcActivity.details = Activity.avatar;
  rpc?.setActivity(rpcActivity);
  return rpcActivity;
});
