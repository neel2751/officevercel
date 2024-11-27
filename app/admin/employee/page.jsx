import Emplyee from "./employee";

export default async function Home({ searchParams }) {
  const param = await searchParams;
  return <Emplyee searchParams={param} />;
}
