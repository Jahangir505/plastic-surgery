import { signOut } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    await signOut({ callbackUrl: "/" });
    res.status(200).end();
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
