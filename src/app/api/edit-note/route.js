import connectDB from "@/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";
import Joi from "joi";

const editNote = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    console.log("searchParams: ", searchParams);
    const editNoteID = searchParams.get("id");
    console.log("editNoteID: ", editNoteID);
    if (!editNoteID) {
      return NextResponse.json({
        success: false,
        message: "Note id is required",
      });
    }
    const { title, description } = await req.json();
    const { error } = editNote.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: Joi.error[0].message,
      });
    }
    const editNoteResponse = await Note.findOneAndUpdate(
      { _id: editNoteID },
      {
        title,
        description,
      },
      { new: true }
    );
    console.log("editNoteResponse=> ", editNoteResponse);
    if (editNoteResponse) {
      return NextResponse.json({
        success: true,
        message: `Note edited successfully...`,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong in PUT request...",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong in PUT request...",
    });
  }
}
