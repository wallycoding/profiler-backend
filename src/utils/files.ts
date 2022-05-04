import crypto from "crypto";

export const hashFile = (mimeType: string) => {
  const hash = `${crypto.randomBytes(6).toString("hex")}-${Date.now()}`;
  return `${hash}.${mimeType.split("/")[1]}`;
};
