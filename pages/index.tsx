import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="./auth/register">Register</Link>
      <Link href="./portal">Portal</Link>
      <Link href="./../app/component/singleC">Portalbse</Link>
    </>
  );
}
