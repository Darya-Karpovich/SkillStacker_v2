"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, HeaderContext, SortDirection } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import { ReactNode } from "react";

export type UserSkill = {
  id: number;
  likeValue: number;
  experienceValue: number;
  user: {
    id: number;
    name: string;
    surname: string;
  };
  skill: {
    id: number;
    name: string;
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
    accessorFn: (row) => `${row.user.name} ${row.user.surname}`,
    header: "Person",
    cell: (value) => (
      <div className="min-w-[150px]">{value.getValue() as ReactNode}</div>
    ),
  },
  {
    accessorKey: "skill.name",
    header: ({ column }) => (
      <SortableColumnHeader title="Skill" column={column} />
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
