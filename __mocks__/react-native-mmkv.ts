export const storage: Record<string, Record<string, string>> = {};

export const createMMKV = jest.fn(
  (config?: {
    id: string;
    encryptionKey?: string;
    encryptionType?: string;
  }) => {
    const id = config?.id || "default";

    if (!storage[id]) {
      storage[id] = {};
    }

    return {
      getString: jest.fn((key: string) => storage[id][key] ?? undefined),
      set: jest.fn((key: string, value: string) => {
        storage[id][key] = value;
      }),
      remove: jest.fn((key: string) => {
        delete storage[id][key];
      }),
      clearAll: jest.fn(() => {
        storage[id] = {};
      }),
    };
  },
);
