import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Archive } from "lucide-react";
import { TooltipWrapper as Tooltip } from "@/components/atoms/tooltip";
import { EditDoctorPopover } from "./edit-doctor-popover";

type User = {
  id: string;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_joined: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    accessorFn: (row) =>
      `${row.first_name} ${row.middle_name ? row.middle_name + " " : ""}${
        row.last_name
      }`,
    cell: ({ row }) => {
      const { first_name, middle_name, last_name } = row.original;
      return (
        <span>
          {first_name} {middle_name ? `${middle_name} ` : ""}
          {last_name}
        </span>
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "date_joined",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_joined"));
      const formatted = format(date, "MMM d, yyyy");
      return <span>{formatted}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-row items-center gap-2">
          <EditDoctorPopover user={user} />
          <Tooltip label="Archive">
            <Archive className="cursor-pointer text-gray-500 hover:fill-current" />
          </Tooltip>
        </div>
      );
    },
  },
];
