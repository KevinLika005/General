// Node 25+ ships an experimental global localStorage that is undefined unless Node is started
// with --localstorage-file. Under jsdom it shadows the DOM Storage, so install an in-memory one.
if (typeof window !== 'undefined' && !window.localStorage) {
  const entries = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return entries.size;
    },
    clear: () => entries.clear(),
    getItem: (key) => entries.get(key) ?? null,
    key: (index) => [...entries.keys()][index] ?? null,
    removeItem: (key) => {
      entries.delete(key);
    },
    setItem: (key, value) => {
      entries.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  Object.defineProperty(window, 'localStorage', { configurable: true, value: storage });
}
