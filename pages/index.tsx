import Head from "next/head";
import Dashboard from "./dashboard";

export default function Page() {
  return (
    <>
      <Head>
        <title>WellNest</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="WellNest" />
      </Head>
      <Dashboard />
    </>
  );
}
