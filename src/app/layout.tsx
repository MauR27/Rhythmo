import Navbar from "../components/Navbar";
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
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
