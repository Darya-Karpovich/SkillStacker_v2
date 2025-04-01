'use client';

import { addUserSkill, getSkills } from '@/app/actions';
import { Heart } from '@/app/assets/icons/heart';
import { HeartHalf } from '@/app/assets/icons/heart-half';
import { Rating } from '@/components/rating/rating';
import { ActionType } from '@/components/user-skills-table/action-type';
import { useTable } from '@/components/user-skills-table/contexts/table-context';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Combobox } from './combobox';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const formSchema = z.object({
  skill: z.string().trim().min(1, { message: 'This field is required' }),
  like: z.number().min(0).max(5),
  experience: z.number().min(0).max(5),
});

export type AddSkillFormValues = z.infer<typeof formSchema>;

export const AddSkillForm = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skills, setSkills] = useState<{ label: string; value: string }[]>([]);
  const { setAction, userSkills } = useTable();
  const { data } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  useEffect(() => {
    if (data) {
      const filteredSkills = data.filter(
        (skill) =>
          !userSkills.find(
            (userSkill) => String(userSkill.skillId) === skill.value,
          ),
      );
      setSkills(filteredSkills);
    }
  }, [data, userSkills]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddSkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: '',
      like: 0,
      experience: 0,
    },
  });

  const onSubmit = async (values: AddSkillFormValues) => {
    const result = await addUserSkill(values);
    toast[result.success ? 'success' : 'error'](result.message);
    setAction(ActionType.NONE);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
      <Controller
        control={control}
        name="skill"
        render={({ field }) => (
          <div className="flex flex-1 flex-col gap-1 p-2">
            <Combobox
              options={skills}
              value={selectedSkill}
              onChange={(value) => {
                setSelectedSkill(value);
                field.onChange(value);
              }}
              placeholder="Select a skill"
              emptyMessage="No skills found"
            />
            <ErrorMessage
              errors={errors}
              name="skill"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="experience"
        render={({ field }) => (
          <div className="flex flex-1 items-center p-2">
            <Rating
              count={5}
              color="var(--color-yellow)"
              value={field.value}
              setValue={field.onChange}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="like"
        render={({ field }) => (
          <div className="flex flex-1 items-center p-2">
            <Rating
              fullSymbol={<Heart />}
              halfSymbol={<HeartHalf />}
              count={5}
              color="var(--color-red)"
              value={field.value}
              setValue={field.onChange}
            />
          </div>
        )}
      />
      <div className="absolute -top-0.5 -right-[75px] flex h-full items-center gap-2">
        <Button type="submit" size="icon" variant="secondary">
          <Check />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={() => setAction(ActionType.NONE)}
        >
          <X />
        </Button>
      </div>
    </form>
  );
};
