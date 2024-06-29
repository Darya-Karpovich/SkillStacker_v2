"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";

export type UserSkill = {
  id: number;
  likeValue: number;
  experienceValue: number;
  user: {
    id: number;
    name: string;
  };
  skill: {
    id: number;
    name: string;
    description: string;
  };
};

const SortableColumnHeader = ({
  title,
  column,
}: {
  title: string;
  column: HeaderContext<UserSkill, unknown>["column"];
}) => {
  const onSortingChange = () => {
    const state = column.getIsSorted();
    state === "desc"
      ? column.clearSorting()
      : column.toggleSorting(state === "asc");
  };

  return (
    <Button variant="ghost" onClick={onSortingChange} className="flex gap-1">
      {title}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowUp className="h-4 w-4 transform rotate-180" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </Button>
  );
};
export const columns: ColumnDef<UserSkill>[] = [
  {
    id: "user",
    accessorKey: "user.name",
    header: ({ column }) => (
      <SortableColumnHeader title="User" column={column} />
    ),
  },
  {
    // accessorKey: "skill.name",
    id: "skill",
    accessorFn: (skill) => `${skill.skill.name}`,
    header: ({ column }) => (
      <SortableColumnHeader title="Skill" column={column} />
    ),
    cell: (skill) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p>{skill.row.original.skill.name}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{skill.row.original.skill.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "experienceValue",
    header: ({ column }) => (
      <SortableColumnHeader title="Experience" column={column} />
    ),
  },
  {
    accessorKey: "likeValue",
    header: ({ column }) => (
      <SortableColumnHeader title="Like" column={column} />
    ),
  },
];
