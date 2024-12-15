import NotesOverview from "@/components/notes-overview";
import React from "react";

const fetchNotes = async () => {
  try {
    let response = await fetch("http://localhost:3000/api/get-notes", {
      method: "GET",
      cache: "no-store",
    });
    response = await response.json();
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const Notes = async () => {
  const allNotes = await fetchNotes();
  return <NotesOverview allNotes={allNotes} />;
};

export default Notes;
