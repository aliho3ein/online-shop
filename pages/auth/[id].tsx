import Link from "next/link";
import { useRouter } from "next/router";

export default function getRegisterCode() {
  const { id, mail } = useRouter().query;

  return <Link href="./login">Check Verify Code{id}</Link>;
}
