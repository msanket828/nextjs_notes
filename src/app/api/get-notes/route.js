import connectDB from "@/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const extractAllNotes = await Note.find({});
    // console.log(extractAllNotes);
    if (extractAllNotes) {
      return NextResponse.json({
        success: true,
        data: extractAllNotes,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong while fething notes...",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while fething notes...",
    });
  }
}
