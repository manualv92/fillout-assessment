"use client"
import Image from "next/image";
import Navbar from "./ui/navbar";
import './lib/fontawesome'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

// import { NextPage } from 'next';

// interface HomeProps {
//   Component: NextPage;
//   pageProps: any;
// }

export default function Home() {
  return (
      <div className="flex h-full relative">
        <div className="flex flex-col justify-between h-full w-full relative min-w-0">
          <div className="flex p-5 w-full pb-3 relative" />
          <Navbar />
        </div>
      </div>
  );

  // return (
  //   <GeistProvider>
  //     <CssBaseline />
  //     <Navbar />
  //   </GeistProvider>
  // );
}
