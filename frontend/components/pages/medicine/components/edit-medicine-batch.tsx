"use client";

import { useState, useTransition } from "react";
import { SquarePen } from "lucide-react";
import { editMedicineBatch } from "@/actions"; // make sure this updates a batch
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
import { MedicineBatch } from "@/app/types";

export function EditMedicineBatch({ batch }: { batch: MedicineBatch }) {
  const [open, setOpen] = useState(false);
  const [batchNumber, setBatchNumber] = useState(batch.batchNumber);
  const [quantity, setQuantity] = useState(batch.quantity);
  const [expiryDate, setExpiryDate] = useState(
    batch.expiryDate.toISOString().split("T")[0]
  ); // yyyy-mm-dd
  const [isPending, startTransition] = useTransition();

  async function handleSave() {
    startTransition(async () => {
      await editMedicineBatch(batch.id, {
        batchNumber,
        quantity: Number(quantity),
        expiryDate: new Date(expiryDate),
      });
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
          <DialogTitle>Edit Medicine Batch</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input
              id="batchNumber"
              className="mt-1"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              className="mt-1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              className="mt-1"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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
