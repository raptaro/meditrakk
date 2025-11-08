"use client";

import { useState, useTransition, useEffect } from "react";
import { Plus } from "lucide-react";
import { addDoctor } from "@/actions";
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

export function AddDoctor() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [field, setField] = useState("");
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  const isFormValid = userId && field;

  // Fetch users (for example, only users not yet doctors)
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users"); // <-- Adjust this route if needed
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  async function handleAdd() {
    if (!isFormValid) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("field", field);

      await addDoctor(formData);

      // Reset form
      setUserId("");
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
            <Label htmlFor="user">User</Label>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="field">Field</Label>
            <Input
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Enter specialization (e.g. Pediatrics)"
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
