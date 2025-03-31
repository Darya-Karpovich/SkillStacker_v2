import { Check, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  deleteUserSkill,
  updateUserSkill,
  UserSkillIncludingSkill,
} from '@/app/actions';
import { toast } from 'sonner';

type RowActionButtonsProps<T> = {
  currentEditedRow: T;
  onRowEditChange?: (row: T | undefined) => void;
};

export const RowActionButtons = <TData extends UserSkillIncludingSkill>({
  currentEditedRow,
  onRowEditChange,
}: RowActionButtonsProps<TData>) => {
  const handleUpdateUserSkill = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    if (onRowEditChange) {
      onRowEditChange(undefined);
    }
    const result = await updateUserSkill(currentEditedRow.id, {
      experienceValue: currentEditedRow.experienceValue,
      likeValue: currentEditedRow.likeValue,
    });
    toast[result.success ? 'success' : 'error'](result.message);
  };

  const handleDeleteUserSkill = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    if (onRowEditChange) {
      onRowEditChange(undefined);
    }
    const result = await deleteUserSkill(currentEditedRow.id);
    toast[result.success ? 'success' : 'error'](result.message);
  };
  return (
    <>
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        onClick={handleUpdateUserSkill}
      >
        <Check />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        onClick={(event) => {
          event.stopPropagation();
          if (onRowEditChange) {
            onRowEditChange(undefined);
          }
        }}
      >
        <X />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        onClick={handleDeleteUserSkill}
      >
        <Trash2 />
      </Button>
    </>
  );
};
