"use server";

import type { AddSkillFormValues } from "@/components/skills-table/add-skill-form/add-skill-form";
import { authOptions } from "@/lib/configs/auth/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getSkills = async () => {
  const skills = await prisma.skill.findMany();
  return skills.map((skill) => {
    return { value: String(skill.id), label: skill.name };
  });
};

export const addUserSkill = async (formData: AddSkillFormValues) => {
  const session = await getServerSession(authOptions);
  console.log("TEST");
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
