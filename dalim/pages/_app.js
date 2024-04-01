import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css"
import favicon from "../public/favicon.ico";


export default function App({Component, pageProps}){

  return (
    <>
      <Head>
        <title>달림</title>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary"/>
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </>
  );
}