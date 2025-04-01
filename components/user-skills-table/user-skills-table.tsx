'use client';

import { Plus } from 'lucide-react';

import { DataTable } from '../skills-table/data-table';
import { userSkillsColumns } from '../skills-table/user-skills-columns';
import { Button } from '../ui/button';

import { UserSkillIncludingSkill } from '@/app/actions';
import { useState } from 'react';
import { ActionType } from './action-type';
import { useTable } from './contexts/table-context';

type UserSkillsTableProps = {
  isCurrentUser: boolean;
};

export const UserSkillsTable = ({ isCurrentUser }: UserSkillsTableProps) => {
  const { action, userSkills, setAction } = useTable();
  const handleAddButtonClick = () => {
    setAction(ActionType.ADD);
  };
  const [editedRow, setEditedRow] = useState<UserSkillIncludingSkill>();

  const handleRowEdit = (
    row: UserSkillIncludingSkill | undefined,
    columnId?: string,
    value?: number,
  ) => {
    if (row && (columnId === 'likeValue' || columnId === 'experienceValue')) {
      setEditedRow({ ...row, [columnId]: value });
    } else {
      setEditedRow(row);
    }
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
        data={userSkills}
        totalRowCount={userSkills.length}
        // TODO: Implement pagination
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPageChange={() => {}}
        withUsers={false}
        action={action}
        canModify={isCurrentUser}
        currentEditedRow={editedRow}
        onRowEditChange={handleRowEdit}
      />
    </>
  );
};
