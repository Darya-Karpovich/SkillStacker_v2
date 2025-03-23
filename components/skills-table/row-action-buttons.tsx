import { Check, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  deleteUserSkill,
  updateUserSkill,
  UserSkillIncludingSkill,
} from '@/app/actions';

type RowActionButtonsProps<T> = {
  currentEditedRow: T;
  onRowEditChange?: (row: T | undefined) => void;
};

export const RowActionButtons = <TData extends UserSkillIncludingSkill>({
  currentEditedRow,
  onRowEditChange,
}: RowActionButtonsProps<TData>) => {
  return (
    <>
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        onClick={(event) => {
          event.stopPropagation();
          if (onRowEditChange) {
            onRowEditChange(undefined);
          }
          updateUserSkill(currentEditedRow.id, {
            experienceValue: currentEditedRow.experienceValue,
            likeValue: currentEditedRow.likeValue,
          });
        }}
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
        onClick={(event) => {
          event.stopPropagation();
          if (onRowEditChange) {
            onRowEditChange(undefined);
          }

          deleteUserSkill(currentEditedRow.id);
        }}
      >
        <Trash2 />
      </Button>
    </>
  );
};
