import { SideBar } from "@/components/SideBar";
import { useAuth } from "@/utils/authContext";
import { Menu } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";

export default function Activity() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [entryType, setEntryType] = useState("exercise");
  const [entryDescription, setEntryDescription] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { user } = useAuth();

  //   submit entry
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (entryType === "" || !entryDescription) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/activity/addEntry", {
        method: "POST",
        body: JSON.stringify({ entryType, entryDescription, userId: user._id }),
      });

      const data = await response.json();

      if (data.message === "success") {
        console.log("Entry added successfully", data.entry);
        setIsModalOpen(false);
        setIsSubmitting(false);
        setEntryType("");
        setEntryDescription("");
      } else {
        console.log("Error adding entry");
        setIsSubmitting(false);
      }
    } catch (error) {}
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
            <h1 className="text-lg font-semibold text-gray-800">
              Daily Activity Log
            </h1>
            <Menu
              className="ml-4 font-bold md:hidden flex"
              onClick={toggleSidebar}
            />
          </div>
          <div className="flex flex-row pt-4 md:justify-end">
            <button
              className="bg-sky-500 p-2 text-white rounded-lg"
              onClick={toggleModal}
            >
              Add Entry
            </button>
          </div>
          {/* add entry pop up modal */}
          {/* Dark overlay */}
          {isModalOpen && (
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
              }}
            ></div>
          )}
          <div
            className={`${
              isModalOpen ? "flex" : "hidden"
            } flex-col fixed z-10 overflow-y-auto bg-white rounded-md shadow-lg p-4 md:w-1/2 w-[88%] md:h-[40%] h-80`}
          >
            <div className="absolute bg-white rounded-md w-[95%] p-4">
              <div className="flex flex-row justify-between items-center gap-5">
                <h1 className="text-lg font-semibold text-gray-800">
                  Add Activity Entry
                </h1>
                <button onClick={toggleModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800 hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={toggleModal}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                      onClick={toggleModal}
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-between pt-2">
                  <label className="text-sm font-medium text-gray-600 mr-2">
                    Entry Type:
                  </label>
                  <select
                    className="border-none focus:border-none hover:border-none rounded-md p-2 my-2"
                    onChange={(e) => setEntryType(e.target.value)}
                  >
                    <option value="exercise">Exercise</option>
                    <option value="meal">Meal</option>
                    <option value="water">Water</option>
                    <option value="sleep">Sleep</option>
                    <option value="mood">Mood</option>
                  </select>

                  <textarea
                    placeholder="Please describe your activity here"
                    className="outline-none placeholder:items-center border w-full form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                    onChange={(e) => setEntryDescription(e.target.value)}
                  />

                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <button
                      type="submit"
                      className="bg-sky-500 w-full py-2 rounded-lg text-white my-4"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          {/* entries list */}
          <div className="flex flex-col gap-4 mt-4 shadow-md p-4 rounded-md">
            <div className="flex flex-row justify-between">
              <p className="text-lg font-medium text-black">Title</p>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="text-sm font-medium text-gray-600">Description</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
