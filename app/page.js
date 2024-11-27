import { getServerSideProps } from "@/server/session/session";
import Admin from "./admin/layout";
import { redirect } from "next/navigation";
export default async function Home() {
  const { props } = await getServerSideProps();
  if (!props) {
    redirect("/auth");
  }
  return <Admin />;
}
