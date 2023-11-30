import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import ActivityIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../utils/authContext";

export const SideBar = () => {
  const linkList = [
    {
      id: 1,
      child: (
        <>
          <HomeIcon /> Home
        </>
      ),
      navto: "/",
    },
    {
      id: 2,
      child: (
        <>
          <ActivityIcon /> Activity
        </>
      ),
      navto: "/activity",
    },
    {
      id: 3,
      child: (
        <>
          <NotesIcon /> Notes
        </>
      ),
      navto: "/notes",
    },
    {
      id: 4,
      child: (
        <>
          <CalendarTodayIcon /> Calendar
        </>
      ),
      navto: "/calendar",
    },
    {
      id: 5,
      child: (
        <>
          <SettingsIcon /> Settings
        </>
      ),
      navto: "/settings",
    },
  ];

  const router = useRouter();
    const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex flex-col p-4 justify-between fixed w-60 h-screen bg-white border-r-2">
      <div className="px-2">
        <h1 className="text-sky-500 font-bold text-4xl md:pb-2 pb-8 md:pt-10">
          WellNest
        </h1>
        <div className="flex flex-col justify-between">
          <ul className="list-none pt-7 items-center justify-center">
            {linkList.map((linkL) => (
              <Link key={linkL.id} href={linkL.navto}>
                <li
                  key={linkL.id}
                  className="hover:bg-green-primary flex flex-row gap-2 items-center hover:text-sky-500 text-green-primary font-extrabold cursor-pointer py-3 rounded-lg px-2"
                >
                  {linkL.child}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className="justify-start items-center">
        {/* logout button */}
        <div
          onClick={handleLogout}
          className="text-green-primary justify-center hover:text-red-500 hover:bg-green-primary cursor-pointer font-extrabold py-3 px-3 rounded-lg"
        >
          <LogoutIcon /> Logout
        </div>
      </div>
    </div>
  );
};
