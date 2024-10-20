import { encryptData, decryptData } from "../utils/cryptography";

export function createCookie({ data, context }) {
  if (!context || !context.cookies) {
    throw new Error("Context or cookies object is not defined");
  }

  context.cookies.set("auth", encryptData(data), {
    path: "/",
    httpOnly: true,
    secure: true,
  });
}
