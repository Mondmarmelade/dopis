import { ImapFlow } from "imapflow";

export async function GET({ params, request }) {
  const client = new ImapFlow({
    host: "imap.ionos.de",
    port: 993,
    secure: true,
    auth: {
      user: import.meta.env.SECRET_USER,
      pass: import.meta.env.SECRET_PASS,
    },
  });

  try {
    await client.connect();

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
