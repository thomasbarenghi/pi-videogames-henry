"use client";
import "./globals.scss";
import React from "react";
import Provider from "@/services/provider";
import Head from "next/head";

export default function RootLayout(props: any) {
  return (
    <html lang="es">
      <body className="">
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}
