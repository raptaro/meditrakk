"use client";

import { useState, useTransition } from "react";
import { SquarePen } from "lucide-react";
import { editMedicine } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditMedicine = {
  medicine: {
    id: string;
    name: string;
    description: string | null;
  };
};

export function EditMedicine({ medicine }: EditMedicine) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(medicine.name);
  const [description, setDescription] = useState(medicine.description || "");
  const [isPending, startTransition] = useTransition();

  async function handleSave() {
    startTransition(async () => {
      await editMedicine(medicine.id, { name, description });
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="secondary">
          <SquarePen className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="mt-1 min-h-[100px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter medicine description..."
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
