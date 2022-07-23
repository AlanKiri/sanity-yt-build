import Head from "next/head";
import React, { useContext } from "react";
import { Header, Footer } from "../components";

interface props {
  children?: React.ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <Head>
        <title>Games.LL</title>
        <link
          rel="shortcut icon"
          href="images/favicon/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="images/favicon/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Header />
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
