"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { TooltipWrapper as Tooltip } from "@/components/atoms/tooltip";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export function EditDoctorPopover({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/user/users/${user.id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Failed to update user");
      setOpen(false);
      console.log("Updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip label="Edit">
        <PopoverTrigger asChild>
          <SquarePen className="cursor-pointer text-blue-500 hover:fill-current" />
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent className="w-64 space-y-3">
        <h3 className="text-sm font-semibold">Edit Doctor</h3>
        <div className="flex flex-col gap-2">
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
