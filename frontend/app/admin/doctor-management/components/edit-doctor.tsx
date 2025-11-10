"use client";

import { useState, useTransition } from "react";
import { SquarePen } from "lucide-react";
import { editDoctor } from "@/app/actions/doctor";
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
import { Doctor } from "@/app/types";

interface EditDoctorProps {
  doctor: Doctor;
}

export function EditDoctor({ doctor }: EditDoctorProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(doctor.name);
  const [field, setField] = useState(doctor.field);
  const [isPending, startTransition] = useTransition();

  const isFormValid = name.trim() !== "" && field.trim() !== "";

  async function handleSave() {
    if (!isFormValid) return;

    startTransition(async () => {
      await editDoctor(doctor.id, { name, field });
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setName(doctor.name);
          setField(doctor.field);
        }
      }}
      key={doctor.id}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <SquarePen className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name (e.g., Dr. John Doe)"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="field">Field</Label>
            <Input
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Enter specialization (e.g., Pediatrics)"
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
