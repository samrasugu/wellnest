import Head from "next/head";
import Login from "./auth/login";

export default function Page() {
  return (
    <>
      <Head>
        <title>WellNest</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="WellNest" />
      </Head>
      <Login />
    </>
  );
}
