"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addDoctor } from "@/app/actions/doctor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function AddDoctor() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [isPending, startTransition] = useTransition();

  const isFormValid = name && field;

  async function handleAdd() {
    if (!isFormValid) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("field", field);

      await addDoctor(formData);

      // Reset form
      setName("");
      setField("");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Doctor
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Doctor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Doctor Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter doctor's name"
              required
            />
          </div>

          <div>
            <Label htmlFor="field">Field</Label>
            <Input
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Enter field (e.g. Pediatrics)"
              required
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isPending || !isFormValid} onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
