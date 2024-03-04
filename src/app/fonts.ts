import { Montserrat, Nunito } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share",
});

export const fonts = {
  montserrat,
  nunito,
};
