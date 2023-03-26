import "@/styles/globals.css";
import "@code-hike/mdx/dist/index.css";
import type { AppProps } from "next/app";
import { Nunito_Sans } from "next/font/google";
import "react-tooltip/dist/react-tooltip.css";

const font = Nunito_Sans({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
