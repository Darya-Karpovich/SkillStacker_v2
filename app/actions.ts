"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import type { AddSkillFormValues } from "@/components/skills-table/add-skill-form/add-skill-form";
import { authOptions } from "@/lib/configs/auth/authOptions";
import prisma from "@/utils/prisma";

export const getSkills = async () => {
  const skills = await prisma.skill.findMany();
  return skills.map((skill) => {
    return { value: String(skill.id), label: skill.name };
  });
};

export const addUserSkill = async (formData: AddSkillFormValues) => {
  const session = await getServerSession(authOptions);
  await prisma.userSkill.create({
    data: {
      userId: Number(session?.user.id),
      skillId: Number(formData.skill),
      experienceValue: formData.experience,
      likeValue: formData.like,
    },
  });
  revalidatePath(`/profile/${session?.user.id}`);
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
  })
  return userSkills.map((userSkill) => ({
    ...userSkill,
    experienceValue: Number(userSkill.experienceValue),
    likeValue: Number(userSkill.likeValue),
  }));
}

export const getAllUserSkills = async () => {
  return (await prisma.userSkill.findMany({
    include: {
      user: true,
      skill: true,
    },
  })).map((userSkill) => ({
    ...userSkill,
    experienceValue: Number(userSkill.experienceValue),
    likeValue: Number(userSkill.likeValue),
  }));
}

export type UserSkillIncludingSkillAndUser = Awaited<ReturnType<typeof getAllUserSkills>>[number];
export type UserSkillIncludingSkill = Awaited<ReturnType<typeof getUserWithSkills>>[number];
