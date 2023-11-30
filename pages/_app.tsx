import type { AppProps } from "next/app";
import { AuthProvider } from "../utils/authContext";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
