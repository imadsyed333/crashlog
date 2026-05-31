import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { createMMKV, MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

let secureStorageInstance: MMKV | null = null;
const MMKV_KEY_ALIAS = "crashlog-encryption-key";

const getOrCreateEncryptionKey = async (): Promise<string> => {
  let key = await SecureStore.getItemAsync(MMKV_KEY_ALIAS);

  if (!key) {
    key =
      Crypto.randomUUID().replace(/-/g, "") +
      Crypto.randomUUID().replace(/-/g, "");

    await SecureStore.setItemAsync(MMKV_KEY_ALIAS, key);
  }
  return key;
};

export const initializeSecureStorage = async (): Promise<MMKV> => {
  if (secureStorageInstance) return secureStorageInstance;

  try {
    const encryptionKey = await getOrCreateEncryptionKey();

    secureStorageInstance = createMMKV({
      id: "crashlog-storage",
      encryptionKey,
    });
    return secureStorageInstance;
  } catch (e) {
    console.error("Failed to securely initialize MMKV instance", e);
    throw e;
  }
};

export const getSecureStorage = async (): Promise<MMKV> => {
  if (!secureStorageInstance) {
    throw new Error(
      "Storage has not been initialized. Call initializeSecureStorage first.",
    );
  }
  return secureStorageInstance;
};

export const mmkvStorage: StateStorage = {
  setItem: async (name, value) => {
    return (await getSecureStorage()).set(name, value);
  },
  getItem: async (name) => {
    const value = (await getSecureStorage()).getString(name);
    return value ?? null;
  },
  removeItem: async (name) => {
    return (await getSecureStorage()).remove(name);
  },
};
