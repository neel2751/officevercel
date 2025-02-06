import Navbar from "../components/nav";

export default async function Page({ params, searchParams }) {
  const slug = (await params).slug;
  const param = await searchParams;

  return <Navbar slug={slug} searchParams={param} />;
}
