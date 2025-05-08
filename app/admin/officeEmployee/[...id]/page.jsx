import { AvatarProvider } from "@/components/Avatar/AvatarContext";
import { officeMenu, officeSlugComponentmap } from "../../_components/menu";
import Navbar from "../../leaveManagement/components/nav";
import EmployeeSidebar from "../components/employeeSidebar";

export default async function IdPage({ params }) {
  const slug = (await params).id;
  const popSlug = slug.pop();
  const basePath = `/admin/officeEmployee/${slug.join("/")}`;

  return (
    <AvatarProvider slug={slug}>
      <Navbar
        slug={popSlug}
        adminMenu={officeMenu}
        slugComponentmap={officeSlugComponentmap}
        basePath={basePath}
        className={"flex gap-6"}
        className2={
          "w-2/3 border p-4 rounded-xl border-dashed border-gray-300 max-h-max"
        }
        searchParams={slug}
      >
        <div className="w-1/3">
          <EmployeeSidebar />
        </div>
      </Navbar>
    </AvatarProvider>
  );
}
