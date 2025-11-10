"use client";

import { useState, useTransition } from "react";
import { SquarePen } from "lucide-react";
import { editSecretary } from "@/app/actions/secretary";
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
import { Secretary } from "@/app/types";

interface EditSecretaryProps {
  secretary: Secretary;
}

export function EditSecretary({ secretary }: EditSecretaryProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(secretary.name);
  const [isPending, startTransition] = useTransition();

  const isFormValid = name.trim() !== "";

  async function handleSave() {
    if (!isFormValid) return;

    startTransition(async () => {
      await editSecretary(secretary.id, { name });
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) setName(secretary.name);
      }}
      key={secretary.id}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <SquarePen className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Secretary</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="mt-1"
              required
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isPending || !isFormValid} onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
