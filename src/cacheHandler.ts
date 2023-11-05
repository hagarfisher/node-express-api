import NodeCache from "node-cache";

export let cache: NodeCache;

export const initCache = () => {
  cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });
};
