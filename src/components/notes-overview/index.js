"use client";
import React, { useEffect, useState } from "react";
import AddNewBlog from "../add-new-note";

const initialNoteData = {
  title: "",
  description: "",
};

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotesOverview = ({ allNotes }) => {
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteFormData, setNoteFormData] = useState(initialNoteData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleSaveNoteData = async (e) => {
    try {
      setLoading(true);
      const res = currentEditedId
        ? await fetch(`/api/edit-note?id=${currentEditedId}`, {
            method: "PUT",
            body: JSON.stringify(noteFormData),
          })
        : await fetch("/api/add-note", {
            method: "POST",
            body: JSON.stringify(noteFormData),
          });
      const result = await res.json();
      if (result) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setNoteFormData(initialNoteData);
      setOpenNoteDialog(false);
      setCurrentEditedId(null);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      let response = await fetch(`/api/delete-note?id=${id}`, {
        method: "DELETE",
      });
      response = await response.json();
      if (response) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditNote = async (editedNote) => {
    setCurrentEditedId(editedNote._id);
    setNoteFormData({
      title: editedNote.title,
      description: editedNote.description,
    });
    setOpenNoteDialog(true);
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
          currentEditedId={currentEditedId}
          setCurrentEditedId={setCurrentEditedId}
        />
        <div className="mt-5">
          {allNotes?.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mb-4">View all notes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allNotes?.map((note) => {
                  return (
                    <Card className="p-2" key={note._id}>
                      <CardContent>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>{note.description}</CardDescription>
                        <div className="flex items-center gap-4 mt-5">
                          <Button onClick={() => handleEditNote(note)}>
                            Edit
                          </Button>
                          <Button onClick={() => handleDeleteNote(note._id)}>
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold mb-4">
              No notes found. please add notes.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesOverview;
