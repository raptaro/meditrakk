"use client";

import { useState, useTransition } from "react";
import { SquarePen } from "lucide-react";
import { editService } from "@/app/actions/services";
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
import { Service } from "@/app/types";

interface EditServiceProps {
  service: Service;
}

export function EditService({ service }: EditServiceProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(service.name);
  const [type, setType] = useState(service.type); // <-- add type state
  const [isPending, startTransition] = useTransition();

  const isFormValid = name.trim() !== "" && type.trim() !== "";

  async function handleSave() {
    if (!isFormValid) return;

    startTransition(async () => {
      await editService(service.id, { name, type }); // send type too
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setName(service.name);
          setType(service.type); // reset type when opening
        }
      }}
      key={service.id}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <SquarePen className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter service name"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Service Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            >
              <option value="">Select type</option>
              <option value="Lab">Lab</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Others">Others</option>
            </select>
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
