import Image from "next/image";
import Link from "next/link";
import MainLogin from "@/components/mainpagelogin";
import { Suspense } from "react";
import Background from "@/components/background";

export default function Home() {
  return (
    <Suspense fallback="...">
      <Background />
      <div className="flex top-0 absolute">
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <Image
            width={512}
            height={512}
            src="/vcu_logo.svg"
            alt="vcu logo"
            className="w-48 h-36 mb-8"
          />
          <div className="text-center max-w-screen-sm mb-10">
            <h1 className="text-stone-200 font-bold text-2xl">
              Welcome to VCU Carpool!
            </h1>
            <p className="text-stone-50 mt-5">
              Find rides around the city or post your ride to reduce the number
              of vehicles on the road
            </p>
            {/* <p className="text-stone-50 mt-5">Sign in below to start!</p> */}
          </div>
          <MainLogin />
        </div>
      </div>
    </Suspense>
  );
}
