import React from "react";
import Head from "next/head";
import styles from "./Layout.module.scss";
import Header from "components/layouts/Header";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Product Hunt Clone - {props.title}</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dgbdevelopment/image/upload/v1602839916/Logos/Logo-Negro-con-borde.svg"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/static/css/app.css" />
      </Head>

      <Header />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
