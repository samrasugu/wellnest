import { SideBar } from "@/components/SideBar";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import PrivateRoute from "../components/privateRoute";
import { Menu } from "@mui/icons-material";
import connectMongo from "@/utils/connectMongo";
import { Note } from "@/models/Notes";
import { NoteType } from "@/typing.t";

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

type Props = {
  notes: NoteType[];
};

export default function Notes({ notes }: Props) {
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
        <div className="flex flex-col md:w-[82%] w-screen px-8 md:px-0 md:pr-16 pt-16 bg-white pb-8">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold text-gray-600">
              Recent notes
            </h1>

            <div className="flex flex-col gap-4 justify-end items-end">
              <Menu
                className="ml-4 font-bold md:hidden flex"
                onClick={toggleSidebar}
              />
              <Link href="/addNote">
                <button className="bg-sky-500 p-3 text-white rounded-lg">
                  Add Note
                </button>
              </Link>
            </div>
          </div>
          {/* a list of note entries */}
          {notes.map((row, index) => (
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
    </PrivateRoute>
  );
}

// fetch notes from db
export const getServerSideProps = async () => {
  await connectMongo();

  const notes = await Note.find({});

  return {
    props: {
      notes: JSON.parse(JSON.stringify(notes)),
    },
  };
};
