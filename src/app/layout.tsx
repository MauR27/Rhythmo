import NavbarPageRender from "../components/NavbarPageRender";
import type { Metadata } from "next";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Rhythmo",
  description: "Buy your favorite instrument",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = process.env.ADMIN_ROLE || "";
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavbarPageRender admin={admin} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
