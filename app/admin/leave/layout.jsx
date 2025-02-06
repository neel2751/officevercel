import { getEmployeeMenu } from "@/server/selectServer/selectServer";
import { getServerSideProps } from "@/server/session/session";
import { headers } from "next/headers";

export default async function Layout({ employe, admin }) {
  const { props } = await getServerSideProps();
  const { session } = props;
  const { user } = session;
  const { role } = user;
  const res = await getEmployeeMenu();
  const menu = JSON.parse(res?.data);
  const headerList = await headers();
  const pathName = headerList.get("referer") || "";
  const path = pathName.split("/").splice(3).join("/");
  const pathNameArray = path.startsWith("/") ? path : "/" + path;
  const isAllow = menu?.filter((menuPath) => menuPath.path === pathNameArray);
  const isAllowPath = isAllow.length > 0 ? true : false;
  return role === "superAdmin" || isAllowPath ? admin : employe;
}
