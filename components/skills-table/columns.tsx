"use client";

import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import resolveConfig from "tailwindcss/resolveConfig";

import { HeartHalf } from "@/app/assets/icons/heart-half";
import { Heart } from "@/app/assets/icons/heart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import tailwindConfig from "@/tailwind.config";

import { Rating } from "../rating/rating";

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

const fullConfig = resolveConfig(tailwindConfig);

const SortableColumnHeader = ({
  title,
  column,
}: {
  title: string;
  column: HeaderContext<UserSkill, unknown>["column"];
}) => {
  const onSortingChange = () => {
    const state = column.getIsSorted();
    if (state === "desc") {
      column.clearSorting()
    } else {
      column.toggleSorting(state === "asc")
    }
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
    cell: (user) => (
      <Link href={`/profile/${user.row.original.user.id}`}>
        {user.row.original.user.name}
      </Link>
    ),
  },
  {
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
    cell: (experience) => (
      <Rating
        count={5}
        color={fullConfig.theme.colors.yellow}
        value={experience.row.original.experienceValue}
        readOnly
      />
    ),
  },
  {
    accessorKey: "likeValue",
    header: ({ column }) => (
      <SortableColumnHeader title="Like" column={column} />
    ),
    cell: (like) => (
      <Rating
        fullSymbol={<Heart />}
        halfSymbol={<HeartHalf />}
        count={5}
        color={fullConfig.theme.colors.red}
        value={like.row.original.likeValue}
        readOnly
      />
    ),
  },
];
