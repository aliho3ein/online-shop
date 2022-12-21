import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="./auth/register">Register</Link>
      <Link href="./auth/login">Login</Link>
    </>
  );
}
