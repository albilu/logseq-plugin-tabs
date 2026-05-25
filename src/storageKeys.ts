import manifest from "../package.json";
import { schemaVersion } from "../package.json";

type LogseqBaseInfo = {
  baseInfo?: {
    id?: string;
  };
};

const fallbackPluginId = manifest.logseq.id;

export function getStorageKeyId(graph: string) {
  const pluginId = (globalThis as typeof globalThis & { logseq?: LogseqBaseInfo })
    .logseq?.baseInfo?.id || fallbackPluginId;
  return pluginId + ":" + schemaVersion + "/" + graph;
}
