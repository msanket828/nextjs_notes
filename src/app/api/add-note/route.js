import connectDB from "@/database";
import Note from "@/models/note";

import Joi from "joi";
import { NextResponse } from "next/server";

const addNewNote = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectDB();
    const extractNoteData = await req.json();
    console.log(extractNoteData);
    const { title, description } = extractNoteData;
    const { error } = addNewNote.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: Joi.error[0].message,
      });
    }
    const newlyCreatedNoteItem = await Note.create(extractNoteData);
    console.log("newlyCreatedNoteItem: ", newlyCreatedNoteItem);
    if (newlyCreatedNoteItem) {
      return NextResponse.json({
        success: true,
        message: "Note added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong, please try later",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try later",
    });
  }
}
