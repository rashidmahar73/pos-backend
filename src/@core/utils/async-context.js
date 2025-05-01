import { AsyncLocalStorage } from "node:async_hooks";

const contexts = new Map();

export const setContext = (key, context) => {
  const store = contexts.get(key) || new AsyncLocalStorage();

  if (!contexts.has(key)) contexts.set(key, store);

  return (cb) => store.run(context, cb);
};

export const getContext = (key) => {
  const store = contexts.get(key);

  if (store) return store.getStore();
};
