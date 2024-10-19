import CryptoJS from "crypto-js";

export function encryptData(data) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    import.meta.env.SECRET_KEY
  ).toString();
}

export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, import.meta.env.SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
