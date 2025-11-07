"use client";

import { useState, useTransition, useEffect } from "react";
import { Plus } from "lucide-react";
import { addMedicineBatch } from "@/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddMedicineBatch() {
  const [open, setOpen] = useState(false);
  const [medicineTypeId, setMedicineTypeId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [isPending, startTransition] = useTransition();
  const [medicineTypes, setMedicineTypes] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchMedicineTypes() {
      try {
        const res = await fetch("/api/medicine-types");
        if (!res.ok) throw new Error("Failed to fetch medicine types");
        const types = await res.json();
        setMedicineTypes(types);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMedicineTypes();
  }, []);

  const isFormValid =
    medicineTypeId && batchNumber && expiryDate && quantity !== "";

  async function handleAdd() {
    if (!isFormValid) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("medicineTypeId", medicineTypeId);
      formData.append("batchNumber", batchNumber);
      formData.append("expiryDate", expiryDate);
      formData.append("quantity", quantity.toString());

      await addMedicineBatch(formData);

      // reset form
      setMedicineTypeId("");
      setBatchNumber("");
      setExpiryDate("");
      setQuantity("");
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Medicine Batch
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Medicine Batch</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="medicineType">Medicine</Label>
            <Select value={medicineTypeId} onValueChange={setMedicineTypeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select medicine" />
              </SelectTrigger>
              <SelectContent>
                {medicineTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input
              id="batchNumber"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              placeholder="Enter batch number"
              required
            />
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Enter quantity"
              required
              min={1}
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
