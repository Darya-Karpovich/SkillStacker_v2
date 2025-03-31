'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import type { AddSkillFormValues } from '@/components/skills-table/add-skill-form/add-skill-form';
import { authOptions } from '@/lib/configs/auth/authOptions';
import prisma from '@/utils/prisma';

export const getSkills = async () => {
  const skills = await prisma.skill.findMany();
  return skills.map((skill) => {
    return { value: String(skill.id), label: skill.name };
  });
};

export const addUserSkill = async (formData: AddSkillFormValues) => {
  const session = await getServerSession(authOptions);
  try {
    await prisma.userSkill.create({
      data: {
        userId: Number(session?.user.id),
        skillId: Number(formData.skill),
        experienceValue: formData.experience,
        likeValue: formData.like,
      },
    });
    revalidatePath(`/profile/${session?.user.id}`);
    return { success: true, message: 'Skill added successfully!' };
  } catch {
    return { success: false, message: 'Failed to add skill!' };
  }
};

export const updateUserSkill = async (
  id: number,
  data: {
    experienceValue: number;
    likeValue: number;
  },
) => {
  const session = await getServerSession(authOptions);
  try {
    await prisma.userSkill.update({
      where: {
        id,
      },
      data: {
        experienceValue: data.experienceValue,
        likeValue: data.likeValue,
      },
    });
    revalidatePath(`/profile/${session?.user.id}`);
    return { success: true, message: 'Skill updated successfully!' };
  } catch {
    return { success: false, message: 'Failed to update skill!' };
  }
};

export const deleteUserSkill = async (id: number) => {
  const session = await getServerSession(authOptions);
  try {
    await prisma.userSkill.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/profile/${session?.user.id}`);
    return { success: true, message: 'Skill deleted successfully!' };
  } catch {
    return { success: false, message: 'Failed to delete skill!' };
  }
};

export const getUserWithSkills = async (slug: string) => {
  const userSkills = await prisma.userSkill.findMany({
    where: {
      user: {
        id: Number(slug),
      },
    },
    include: {
      skill: true,
    },
  });
  return userSkills.map((userSkill) => ({
    ...userSkill,
    experienceValue: userSkill.experienceValue.toNumber(),
    likeValue: userSkill.likeValue.toNumber(),
  }));
};

export const getAllUserSkills = async (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const userSkills = await prisma.userSkill.findMany({
    skip,
    take,
    include: {
      skill: true,
      user: true,
    },
  });

  const totalUserSkills = await prisma.userSkill.count();
  return {
    data: userSkills.map((userSkill) => ({
      ...userSkill,
      experienceValue: userSkill.experienceValue.toNumber(),
      likeValue: userSkill.likeValue.toNumber(),
    })),
    pagination: {
      currentPage: page,
      pageSize,
      totalUserSkills,
    },
  };
};

export type UserSkillIncludingSkillAndUser = Awaited<
  ReturnType<typeof getAllUserSkills>
>['data'][number];
export type UserSkillIncludingSkill = Awaited<
  ReturnType<typeof getUserWithSkills>
>[number];
