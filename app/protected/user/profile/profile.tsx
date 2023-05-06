import ProfileInfo from "@/components/profile-info";
import { unstable_getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await unstable_getServerSession();
  return <ProfileInfo user={session?.user} />;
}
