import { SideBar } from "@/components/SideBar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RunningIcon from "@mui/icons-material/Sports";
import { useAuth } from "@/utils/authContext";
import router from "next/router";
import { Menu } from "@mui/icons-material";
import connectMongo from "@/utils/connectMongo";
import { Note } from "@/models/Notes";
import { EntryType, NoteType, UserType } from "@/typing.t";
import mongoose from "mongoose";
import {
  WaterDropRounded,
  Dining,
  BookOnlineRounded,
  SportsGymnastics,
} from "@mui/icons-material";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [notesList, setNotes] = useState<NoteType[]>([]);

  const [entries, setEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) {
        return;
      }
      const response = await fetch("/api/notes/getNotes", {
        method: "POST",
        body: JSON.stringify({ userID: user._id }),
      });

      const data = await response.json();

      if (data.message === "success") {
        console.log("Notes fetched successfully", data.notes);
        setNotes(data.notes);
      } else {
        console.log("Error fetching notes");
      }
    };

    // fetch entries
    const fetchEntries = async () => {
      if (!user) {
        return;
      }
      const response = await fetch("/api/activity/getEntries", {
        method: "POST",
        body: JSON.stringify({ userID: user._id }),
      });

      const data = await response.json();

      if (data.message === "success") {
        console.log("Entries fetched successfully", data.entries);
        setEntries(data.entries);
      } else {
        console.log("Error fetching entries");
      }
    };

    if (!user) {
      router.push("/auth/login");
    } else {
      fetchNotes();
      fetchEntries();
    }
  }, [user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
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
        <div className="flex flex-col md:w-[82%] w-screen md:mr-16 px-8 md:pt-16 pt-8 bg-white pb-8">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome, {user?.firstName}
            </h1>
            <Menu
              className="ml-4 font-bold md:hidden flex"
              onClick={toggleSidebar}
            />
          </div>
          {/* Today's stats */}
          <div className="flex flex-row mt-8">
            <h1 className="text-xl font-medium text-gray-600">
              Here&apos;s your progress for today
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-10 gap-6 mt-4">
            <div className="flex flex-col p-6 justify-center items-left rounded-lg text-white h-32 bg-sky-500 shadow-md">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <SportsGymnastics /> Steps
              </h2>
              <h2 className="text-2xl font-bold py-2">600/5000</h2>
              <p className="text-xs text-gray-200">
                From your Garmin watch <span className="font-bold">+</span>
              </p>
            </div>

            <div className="flex flex-col p-6 justify-center items-left rounded-lg text-white h-32 bg-sky-500 shadow-md">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <WaterDropRounded /> Water
              </h2>
              <h2 className="text-2xl font-bold py-2">0/2000 ml</h2>
            </div>

            <div className="flex flex-col p-6 justify-center items-left rounded-lg text-white h-32 bg-sky-500 shadow-md">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <Dining /> Food
              </h2>
              <Link href="/activity">
                <h2 className="text-2xl font-bold py-2">Enter</h2>
              </Link>
            </div>

            <div className="flex flex-col p-6 w-full justify-center items-left rounded-lg text-white h-32 bg-sky-500 shadow-md">
              <h2 className="flex flex-row gap-2 w-36 py-2">
                <BookOnlineRounded /> Entries
              </h2>
              <h2 className="text-2xl font-bold py-2">10</h2>
            </div>
          </div>
          {/* recent entries & notes */}
          <div className="flex md:flex-row justify-between flex-col gap-10">
            <div className="flex flex-col md:w-1/2 md:pt-10 pt-6">
              <h1 className="text-lg font-semibold text-gray-600">
                Recent entries
              </h1>
              {/* a list of entries */}
              {entries &&
                entries.map((row, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 mt-4 shadow-md rounded-md p-4"
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-lg font-medium text-black">
                        {row.type}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h1 className="text-sm font-medium text-gray-600">
                        {row.description}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col md:w-1/2 md:pt-10 text-left justify-start items-start">
              <h1 className="text-lg font-semibold text-gray-600">Notes</h1>
              {/* a list of entries */}
              {notesList &&
                notesList.map((row, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 mt-4 shadow-md rounded-md p-4"
                  >
                    <div className="flex flex-row justify-between">
                      <h1 className="text-lg font-medium text-black">
                        {row.title}
                      </h1>
                    </div>
                    <h1 className="text-sm text-gray-600">{row.description}</h1>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: { req: any }) {
  try {
    const { req } = context;
    const user = req.user;

    console.log("first", user);

    const objectId = new mongoose.Types.ObjectId(user._id); // Convert to ObjectId

    await connectMongo();

    const notes = await Note.find({ userID: user._id }).exec();

    // Additional logic to fetch entries

    return {
      props: {
        user,
        notes: JSON.parse(JSON.stringify(notes)),
        entries: [], // Add your logic to fetch entries here
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        user: null,
        notes: [],
        entries: [],
      },
    };
  }
}
