'use client';

import { Combobox } from './combobox';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserSkill, getSkills } from '@/app/actions';
import { useTable } from '@/components/user-skills-table/contexts/table-context';
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '@hookform/error-message';
import { ActionType } from '@/components/user-skills-table/action-type';
import { Rating } from '@/components/rating/rating';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import { Heart } from '@/app/assets/icons/heart';
import { HeartHalf } from '@/app/assets/icons/heart-half';

const fetchSkills = async () => {
  return await getSkills();
};

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
    queryFn: fetchSkills,
  });

  const fullConfig = resolveConfig(tailwindConfig);

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

  const onSubmit = (values: AddSkillFormValues) => {
    addUserSkill(values);
    setAction(ActionType.NONE);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onError={(errors) => console.log(errors)}
      className="flex w-full"
    >
      <Controller
        control={control}
        name="skill"
        render={({ field }) => (
          <div className="flex flex-1 flex-col gap-1 p-4">
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
          <div className="flex flex-1 items-center p-4">
            <Rating
              count={5}
              color={fullConfig.theme.colors.yellow}
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
          <div className="flex flex-1 items-center p-4">
            <Rating
              fullSymbol={<Heart />}
              halfSymbol={<HeartHalf />}
              count={5}
              color={fullConfig.theme.colors.red}
              value={field.value}
              setValue={field.onChange}
            />
          </div>
        )}
      />
      <div className="absolute -right-[120px] flex gap-2">
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
