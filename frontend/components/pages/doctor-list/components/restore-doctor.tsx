"use client";

import { useState } from "react";
import { ArrowUpCircle } from "lucide-react";
import { restoreDoctor } from "@/actions";
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

export function RestoreDoctor({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false);

  const handleRestore = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    await restoreDoctor(formData);
    setLoading(false);
  };

  return (
    <Dialog key={id}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <ArrowUpCircle className="h-4 w-4" />
          Restore
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restore Doctor</DialogTitle>
          <DialogDescription>
            Are you sure you want to restore <strong>{name}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            variant="secondary"
            onClick={handleRestore}
            disabled={loading}
          >
            {loading ? "Restoring..." : "Restore"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
