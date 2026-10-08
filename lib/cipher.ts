import { gcm } from "@noble/ciphers/aes.js";
import {
  bytesToHex,
  bytesToUtf8,
  hexToBytes,
  randomBytes,
  utf8ToBytes,
} from "@noble/ciphers/utils.js";

const IV_LENGTH = 12;

export function encrypt(plaintext: string, keyHex: string): string {
  const iv = randomBytes(IV_LENGTH);
  const ciphertext = gcm(hexToBytes(keyHex), iv).encrypt(utf8ToBytes(plaintext));
  return bytesToHex(iv) + bytesToHex(ciphertext);
}

export function decrypt(payloadHex: string, keyHex: string): string {
  const payload = hexToBytes(payloadHex);
  const plaintext = gcm(
    hexToBytes(keyHex),
    payload.subarray(0, IV_LENGTH),
  ).decrypt(payload.subarray(IV_LENGTH));
  return bytesToUtf8(plaintext);
}
