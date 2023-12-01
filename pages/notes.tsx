import { SideBar } from "@/components/SideBar";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import PrivateRoute from "../components/privateRoute";
import { Menu } from "@mui/icons-material";
import { NoteType, UserType } from "@/typing.t";
import { useAuth } from "@/utils/authContext";

type Props = {
  notes: NoteType[];
  user: UserType;
};

export default function Notes() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const [notes, setNotes] = React.useState<NoteType[]>();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { user } = useAuth();

  // fetch notes
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

    fetchNotes();
  }, [user]);

  return (
    <PrivateRoute>
      <Head>
        <title>Notes | WellNest</title>
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
          {notes &&
            notes?.map((row, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 mt-4 shadow-md p-4 rounded-md"
              >
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

// // fetch notes from db
// export const getServerSideProps = async (context: any) => {
//   // get userid from session
//   const { req } = context;

//   const user = await req.user;

//   await connectMongo();

//   const notes = await Note.find({
//     userID: user,
//   });

//   return {
//     props: {
//       notes: JSON.parse(JSON.stringify(notes)),
//     },
//   };
// };
