// RootLayout.js
"use client";
import Head from "next/head"
import Sidebar from "@/components/sideBar";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'
import Providers from "../components/Providers";
interface Props {
  session: Session | null
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children, session }) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta charSet="UTF-8"></meta>
          <title>B2Bmatch.ch</title>
          <meta name="google" content="notranslate"></meta>
        </Head>
        <body className="overflow-hidden ">
          <Providers>
            <div className="flex w-screen">
              <Sidebar />
              <ToastContainer />
              <div className="flex-1 h-screen w-screen">{children}</div>
            </div>
          </Providers>
        </body>
      </html >
    </>
  );
}
export default RootLayout