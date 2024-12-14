import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Note = mongoose.models.Note || mongoose.model("Note", NotesSchema);

export default Note;
