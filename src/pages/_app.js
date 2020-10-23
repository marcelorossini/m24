// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import GlobalStyles from "../styles/global";
import Loading from "../components/Loading";

// Componente
function MyApp({ Component, pageProps }) {
  // Rotas
  const router = useRouter();

  // State
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se mudou de rota
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) => url === router.asPath && setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="HandheldFriendly" content="true" />
      </Head>
      <Loading show={isLoading} />
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
