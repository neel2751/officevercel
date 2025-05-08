import { randomBytes, createCipheriv } from "crypto";
export function encryptId(id) {
  const key =
    "52bdc56fb0440989d14fad277de68f2221727ae3501ffe3d37607e5684d4be88"; // Use a securely generated key
  const iv = randomBytes(12); // 12-byte IV for AES-GCM

  const cipherKey = Buffer.from(key, "hex");
  const cipher = createCipheriv("aes-256-gcm", cipherKey, iv);
  let encrypted = cipher.update(JSON.stringify({ id }), "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag(); // Get the authentication tag
  const encrypt = `${encrypted}/${iv.toString("hex")}/${authTag.toString(
    "hex"
  )}`;
  return encrypt;
}
