import { SideBar } from "@/components/SideBar";
import Head from "next/head";
import React from "react";
import PrivateRoute from "../components/privateRoute";
import { useAuth } from "@/utils/authContext";
import { Menu } from "@mui/icons-material";

export default function Settings() {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <PrivateRoute>
      <Head>
        <title>Home | WellNest</title>
      </Head>
      <div className="flex flex-row">
        <div
          className={`md:flex h-screen md:w-[18%] ${
            isSidebarOpen ? "flex" : "hidden"
          } duration-500`}
        >
          <SideBar />
        </div>
        <div className="flex flex-col md:w-[82%] w-screen md:pr-16 px-8 md:px-0 pt-16 bg-white pb-8">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold text-gray-600 pb-8">
              Profile
            </h1>
            <Menu
              className="ml-4 font-bold md:hidden flex"
              onClick={toggleSidebar}
            />
          </div>
          <div className="flex flex-col md:w-1/4 w-full gap-4">
            <input
              type="text"
              placeholder={user?.firstName}
              className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
              readOnly
            />
            <input
              type="text"
              placeholder={user?.lastName}
              className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
              readOnly
            />

            <input
              type="text"
              placeholder={user?.email}
              className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
              readOnly
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
