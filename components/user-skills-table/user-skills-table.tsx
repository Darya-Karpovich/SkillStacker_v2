"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../skills-table/data-table";
import { userSkillsColumns } from "../skills-table/user-skills-columns";
import { useTable } from "./contexts/table-context";
import { ActionType } from "./action-type";

type UserSkillsTableProps = {
  isCurrentUser: boolean;
};

export const UserSkillsTable = ({ isCurrentUser }: UserSkillsTableProps) => {
  const { action, userSkills, setAction } = useTable();
  const handleAddButtonClick = () => {
    setAction(ActionType.ADD);
  };

  return (
    <>
      {isCurrentUser && (
        <div className="flex items-center justify-end py-4">
          <Button size="icon" onClick={handleAddButtonClick}>
            <Plus />
          </Button>
        </div>
      )}
      <DataTable
        columns={userSkillsColumns}
        data={JSON.parse(JSON.stringify(userSkills))}
        withUsers={false}
        action={action}
      />
    </>
  );
};
