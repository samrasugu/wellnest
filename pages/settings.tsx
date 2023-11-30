import { SideBar } from "@/components/SideBar";
import Head from "next/head";
import React from "react";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Home | WellNest</title>
      </Head>
      <div className="flex flex-row">
        <div className="flex h-screen md:w-[18%]">
          <SideBar />
        </div>
        <div className="flex flex-col md:w-[82%] pr-16 pt-16 bg-white pb-8">
          <h1 className="text-xl font-semibold text-gray-600 pb-8">Profile</h1>
          <div className="flex flex-col w-1/4 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
              readOnly
            />
            <input
              type="text"
              placeholder="Last Name"
              className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
              readOnly
            />

            <input
              type="text"
              placeholder="Email"
              className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
}