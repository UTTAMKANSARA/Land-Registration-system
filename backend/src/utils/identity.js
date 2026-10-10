import crypto from "crypto";

export const hashAadhaar = (aadhaar) => {
  const normalized = aadhaar.replace(/\s/g, "");

  return crypto.createHash("sha256").update(normalized).digest("hex");
};
