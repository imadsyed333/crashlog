import "react-native-get-random-values";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { StateStorage } from "zustand/middleware";
import { decrypt, encrypt } from "./cipher";

const KEY_ALIAS = "crashlog-encryption-key";

let encryptionKey: string | null = null;

const getOrCreateEncryptionKey = async (): Promise<string> => {
  let key = await SecureStore.getItemAsync(KEY_ALIAS);

  if (!key) {
    key =
      Crypto.randomUUID().replace(/-/g, "") +
      Crypto.randomUUID().replace(/-/g, "");

    await SecureStore.setItemAsync(KEY_ALIAS, key);
  }
  return key;
};

export const initializeSecureStorage = async (): Promise<void> => {
  if (encryptionKey) return;

  try {
    encryptionKey = await getOrCreateEncryptionKey();
  } catch (e) {
    console.error("Failed to initialize secure storage", e);
    throw e;
  }
};

const getEncryptionKey = (): string => {
  if (!encryptionKey) {
    throw new Error(
      "Storage has not been initialized. Call initializeSecureStorage first.",
    );
  }
  return encryptionKey;
};

export const secureStorage: StateStorage = {
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, encrypt(value, getEncryptionKey()));
  },
  getItem: async (name) => {
    const stored = await AsyncStorage.getItem(name);
    if (stored == null) return null;
    return decrypt(stored, getEncryptionKey());
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};
