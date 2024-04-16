import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css"
import favicon from "../public/favicon.ico";
import AuthProvider from "../context/authContext";


export default function App({Component, pageProps}){

  return (
    <>
      <Head>
        <title>달림</title>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary"/>
        <link rel="shortcut icon" href={favicon.src} />
        <meta property="og:title" content="달림(Dalim)  - 러너들의 커뮤니티"/>
        <meta property="og:description" content="러닝 크루부터 대회, 러닝 일지 작성까지 한 곳에서! 함께 달리고, 함께 성장하는 러닝 플랫폼 '달림'"/>
        {/* <meta property="og:image" content="https://ztajsmqfxrzwblwqdmil.supabase.co/storage/v1/object/public/yutorang/thumbnail_yutorang_osaka.png?t=2023-03-13T10%3A18%3A25.998Z"/> */}
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </AuthProvider>
    </>
  );
}