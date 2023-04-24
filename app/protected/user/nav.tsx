import Navbar from "./navbar";
import { unstable_getServerSession } from "next-auth/next";

export default async function Nav() {
  const session = await unstable_getServerSession();
  return <Navbar user={session?.user} />;
}
