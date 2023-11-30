import { SideBar } from "@/components/SideBar";
import Head from "next/head";
import React from "react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RunningIcon from "@mui/icons-material/Sports";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "steps", headerName: "Steps", width: 130 },
  { field: "water", headerName: "Water", width: 130 },
  { field: "food", headerName: "Food", width: 130 },
  { field: "notes", headerName: "Notes", width: 130 },
];

const rows = [
  { _id: 1, title: "Snow", description: "Jon" },
  { _id: 2, title: "Lannister", description: "Cersei" },
  { _id: 3, title: "Lannister", description: "Jaime" },
  { _id: 4, title: "Stark", description: "Arya" },
  { _id: 5, title: "Targaryen", description: "Daenerys" },
  { id: 6, title: "Melisandre", description: null },
  { id: 7, title: "Clifford", description: "Ferrara" },
  { id: 8, title: "Frances", description: "Rossini" },
  { id: 9, title: "Roxie", description: "Harvey" },
];

export default function Dashboard() {
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
          <div className="flex flex-row">
            <h1 className="text-3xl font-semibold text-gray-600">
              Welcome, Ryan
            </h1>
          </div>
          {/* Today's stats */}
          <div className="flex flex-row mt-8">
            <h1 className="text-xl font-semibold text-gray-600">
              Here&apos;s your progress for today
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mt-4">
            <div className="flex flex-col p-6 justify-center items-left rounded-lg h-32 bg-gray-100">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <RunningIcon /> Steps
              </h2>
              <h2 className="text-2xl font-bold py-2">600/5000</h2>
            </div>

            <div className="flex flex-col p-6 justify-center items-left rounded-lg h-32 bg-gray-100">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <ShowChartIcon /> Water
              </h2>
              <h2 className="text-2xl font-bold py-2">0/2000 ml</h2>
            </div>

            <div className="flex flex-col p-6 justify-center items-left rounded-lg h-32 bg-gray-100">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <ShowChartIcon /> Food
              </h2>
              <h2 className="text-2xl font-bold py-2">Enter</h2>
            </div>

            <div className="flex flex-col p-6 justify-center items-left rounded-lg h-32 bg-gray-100">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                Today&apos;s entries <ShowChartIcon />
              </h2>
              <h2 className="text-2xl font-bold py-2">10</h2>
            </div>
          </div>
          {/* recent entries & notes */}
          <div className="flex md:flex-row justify-between flex-col gap-10">
            <div className="flex flex-col md:w-1/2 md:pt-10">
              <h1 className="text-xl font-semibold text-gray-600">
                Recent entries
              </h1>
              {/* a list of entries */}
              {rows.map((row, index) => (
                <div key={index} className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-lg font-semibold text-black">
                      {row.title}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-sm font-semibold text-gray-600">
                      {row.description}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:w-1/2 md:pt-10 text-left justify-start items-start">
              <h1 className="text-xl font-semibold text-gray-600">Notes</h1>
              {/* a list of entries */}
              {rows.map((row, index) => (
                <div key={index} className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-row justify-between">
                    <h1 className="text-lg font-semibold text-black">
                      {row.title}
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-sm font-semibold text-gray-600">
                      {row.description}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
