import { schemaVersion } from "../package.json";

type LogseqBaseInfo = {
  baseInfo?: {
    id?: string;
  };
};

const fallbackPluginId = "_logseq-plugin-tabs-scrollable";

export function getStorageKeyId(graph: string) {
  const pluginId = (globalThis as typeof globalThis & { logseq?: LogseqBaseInfo })
    .logseq?.baseInfo?.id || fallbackPluginId;
  return pluginId + ":" + schemaVersion + "/" + graph;
}
