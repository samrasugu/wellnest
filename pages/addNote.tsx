import { SideBar } from "@/components/SideBar";
import PrivateRoute from "@/components/privateRoute";
import { Menu } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function AddNote() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [addingNote, setAddingNote] = React.useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const [addNoteError, setAddNoteError] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      return;
    }

    setAddingNote(true);

    try {
      const response = await fetch("/api/notes/addNote", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (data.message === "success") {
        console.log("Note added successfully", data.note);
        setAddNoteError("");
        setAddingNote(false);
        // Redirect the user to the desired page after login
        router.replace("/notes");
      } else {
        setAddNoteError(data.message);
        setAddingNote(false);
      }
    } catch (error) {}
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <PrivateRoute>
      <Head>
        <title>Add Note | WellNest</title>
      </Head>
      <div className="flex md:flex-row flex-col">
        <div
          className={`md:flex h-screen md:w-[18%] ${
            isSidebarOpen ? "flex" : "hidden"
          } duration-500`}
        >
          <SideBar />
        </div>
        <div className="flex flex-col md:w-[82%] w-screen md:pr-16 px-8 md:px-0 md:pt-16 pt-8 bg-white pb-8">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">Add a Note</h1>
            <Menu
              className="ml-4 font-bold md:hidden flex"
              onClick={toggleSidebar}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center md:items-start py-8 gap-4 md:py-10">
              <input
                type="text"
                placeholder="Title"
                className="outline-none border md:w-96 w-full form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                maxLength={200}
                className="outline-none border md:w-96 w-full form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                onChange={(e) => setDescription(e.target.value)}
              />

              {addingNote ? (
                <CircularProgress className="m-4" />
              ) : (
                <button
                  type="submit"
                  className="bg-sky-500 md:w-96 w-full py-2 rounded-lg text-white"
                >
                  Submit
                </button>
              )}
              {addNoteError && (
                <p className="text-red-500 text-sm pt-3">{addNoteError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
