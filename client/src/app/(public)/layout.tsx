import React from "react";
import { Header, Footer } from "@/components";
import Querier from "@/services/querier";

export default function RootLayout(props: any) {
  return (
    <>
      <Querier>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </Querier>
    </>
  );
}
