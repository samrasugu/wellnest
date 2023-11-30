import { SideBar } from "@/components/SideBar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Head from "next/head";
import React from "react";

export default function Calendar() {
  return (
    <>
      <Head>
        <title>Home | WellNest</title>
      </Head>
      <div className="flex flex-row">
        <div className="flex h-screen md:w-[18%]">
          <SideBar />
        </div>
        <div className="flex flex-grow flex-col h-screen w-screen md:w-[82%] pr-16 pt-16 bg-white pb-8">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                //   make the calendar occupy the entire height & width of the screen
              />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
}
