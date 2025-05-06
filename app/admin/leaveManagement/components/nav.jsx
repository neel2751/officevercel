"use client";
import SiteNavBar from "../components/header";
import { CommonContext } from "@/context/commonContext";

export default function Navbar({
  slug,
  searchParams,
  adminMenu,
  slugComponentmap,
  basePath,
  className,
  className2,
  children,
}) {
  return (
    <CommonContext.Provider value={{ slug, searchParams }}>
      <SiteNavBar
        slug={slug}
        menu={adminMenu}
        basePath={basePath}
        slugComponentMap={slugComponentmap}
        className={className}
        className2={className2}
      >
        {children}
      </SiteNavBar>
    </CommonContext.Provider>
  );
}
