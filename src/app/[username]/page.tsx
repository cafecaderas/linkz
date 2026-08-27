import { notFound } from "next/navigation";
import { ProfileShell } from "@/components/profile/ProfileShell";
import { getProfileByUsername } from "@/lib/get-profile";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const data = await getProfileByUsername(username);

  if (!data) notFound();

  return <ProfileShell profile={data.profile} theme={data.theme} />;
}
