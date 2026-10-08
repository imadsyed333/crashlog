import assert from "node:assert/strict";
import { decrypt, encrypt } from "../lib/cipher.ts";

const key = "a".repeat(64);
const plaintext = '{"collisions":[{"id":"1"}]}';

const sealed = encrypt(plaintext, key);
assert.notEqual(sealed, plaintext);
assert.equal(decrypt(sealed, key), plaintext);

const again = encrypt(plaintext, key);
assert.notEqual(sealed, again);
assert.equal(decrypt(again, key), plaintext);

assert.throws(() => decrypt("00".repeat(28), key));

console.log("ok");
