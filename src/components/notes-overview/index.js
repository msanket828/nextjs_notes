"use client";
import React, { useState } from "react";
import AddNewBlog from "../add-new-note";

const initialNoteData = {
  title: "",
  description: "",
};

const NotesOverview = () => {
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteFormData, setNoteFormData] = useState(initialNoteData);

  const handleSaveNoteData = async (e) => {
    try {
      setLoading(true);
      const res = await fetch("/api/add-note", {
        method: "POST",
        body: JSON.stringify(noteFormData),
      });
      const result = await res.json();
      if (result) {
        setLoading(false);
        setNoteFormData(noteFormData);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setNoteFormData(initialNoteData);
    }
  };
  return (
    <div className="w-full min-h-screen bg-blue-400 p-6">
      <div className="w-[95%] mx-auto">
        <AddNewBlog
          openNoteDialog={openNoteDialog}
          setOpenNoteDialog={setOpenNoteDialog}
          setNoteFormData={setNoteFormData}
          noteFormData={noteFormData}
          loading={loading}
          setLoading={setLoading}
          handleSaveNoteData={handleSaveNoteData}
        />
        <div>
          <h2>View all notes</h2>
        </div>
      </div>
    </div>
  );
};

export default NotesOverview;
