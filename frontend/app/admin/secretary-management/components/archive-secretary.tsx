"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { archiveSecretary } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ArchiveSecretary({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleArchive = async () => {
    setOpen(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    await archiveSecretary(formData);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash className="h-4 w-4" />
          Archive
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive Secretary</DialogTitle>
          <DialogDescription>
            Are you sure you want to archive <strong>{name}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleArchive}
            disabled={loading}
          >
            {loading ? "Archiving..." : "Archive"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
