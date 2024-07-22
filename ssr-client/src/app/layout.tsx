import "antd/dist/reset.css";
import type { Metadata } from "next";
import "./index.css";
import Header from "./components/Header";
import StoreProvider from "./storeProvider";
import Footer from "./components/footer";
import Loading from "./components/Loading"; // Добавлен импорт Loading
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Loading />
        <StoreProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
