import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ConfigProvider } from "antd";
import SidebarLayout from "components/layout/sidebar";
import { publicRoutes } from "middleware";
import { useRouter } from "next/router";
import { Colors } from "utils/colors";
import Cookies from "js-cookie";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [role, setRole] = useState<string | undefined | null>(null);

  const router = useRouter();
  useEffect(() => {
    const getRole = Cookies.get("role");
    setRole(getRole);
  }, [Cookies.get("role")]);

  const getLayout =
    Component.getLayout ??
    ((page: any) => {
      return publicRoutes.includes(router.pathname) ||
        page.type?.name === "Verification" ||
        router.pathname.startsWith("/student") ? (
        page
      ) : (
        <SidebarLayout role={role}>{page}</SidebarLayout>
      );
    });

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Colors.PRIMARY,
          colorPrimaryBg: Colors.COLOR_PRIMARY_BG,
          borderRadius: 2,
          boxShadow: "none",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <NextNProgress color={Colors.PRIMARY} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
