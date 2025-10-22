import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SquarePen, Archive } from "lucide-react";
import { TooltipWrapper as Tooltip } from "@/components/atoms/tooltip";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
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
    cell: () => {
      return (
        <div className="flex flex-row gap-2">
          <Tooltip label="Edit">
            <SquarePen className="cursor-pointer text-blue-500 hover:fill-current" />
          </Tooltip>

          <Tooltip label="Archive">
            <Archive className="cursor-pointer text-gray-500 hover:fill-current" />
          </Tooltip>
        </div>
      );
    },
  },
];
