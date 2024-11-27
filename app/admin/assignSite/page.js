import AssignSite from "./assignSite";

export default async function Home({ searchParams }) {
  const param = await searchParams;
  return <AssignSite searchParams={param} />;
}
