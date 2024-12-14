import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewBlog = ({
  openNoteDialog,
  setOpenNoteDialog,
  noteFormData,
  setNoteFormData,
  loading,
  setLoading,
  handleSaveNoteData,
}) => {
  return (
    <>
      <Button onClick={() => setOpenNoteDialog(true)}>Add Note</Button>
      <Dialog open={openNoteDialog} onOpenChange={setOpenNoteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={noteFormData.title || ""}
                onChange={(e) =>
                  setNoteFormData({ ...noteFormData, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={noteFormData.description || ""}
                onChange={(e) =>
                  setNoteFormData({
                    ...noteFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveNoteData}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewBlog;
