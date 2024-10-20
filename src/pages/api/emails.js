import { ImapFlow } from "imapflow";
import { decryptData } from "../../utils/cryptography";

export async function GET({ cookies, params, request }) {
  const credentials = decryptData(cookies.get("auth").value); //get login data from cookie -> decrypts them

  const client = new ImapFlow({
    host: credentials[2].host,
    port: credentials[3].port,
    secure: true,
    auth: {
      user: credentials[0].user,
      pass: credentials[1].pass,
    },
  });

  try {
    try {
      await client.connect();
      console.log("Connected to IMAP server");
    } catch (connectError) {
      console.error("Connection Error:", connectError);
      return new Response(
        JSON.stringify({
          error:
            "Failed to connect to IMAP server. Please check your credentials.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    let lock = await client.getMailboxLock("INBOX");

    try {
      let lastMsg = await client.fetchOne("*", {
        uid: true,
        source: true,
        envelope: true,
      });

      return new Response(
        JSON.stringify({
          seq: lastMsg.seq,
          uid: lastMsg.uid,
          content: lastMsg.source.toString(),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } finally {
      lock.release();
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client.logout();
  }
}
