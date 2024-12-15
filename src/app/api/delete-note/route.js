import connectDB from "@/database";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const getCurrentId = searchParams.get("id");
    if (!getCurrentId) {
      return NextResponse.json({
        success: false,
        message: "Id is required",
      });
    }
    const deleteCurrentNote = await Note.findOneAndDelete({
      _id: getCurrentId,
    });
    if (deleteCurrentNote) {
      return NextResponse.json({
        success: true,
        message: `${deleteCurrentNote} note deleted successfully...`,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Something went wrong in DETELE API...`,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in DETELE API...",
    });
  }
}
