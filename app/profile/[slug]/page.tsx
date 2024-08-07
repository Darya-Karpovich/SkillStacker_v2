import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { UserSkill } from "@prisma/client";
import { DataTable } from "@/components/skills-table/data-table";
import { userSkillsColumns } from "@/components/skills-table/user-skills-columns";

const Profile = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);
  const isProfileOwner = session?.user?.id == Number(params.slug);

  const userSkills = (await prisma.userSkill.findMany({
    where: {
      user: {
        id: Number(params.slug),
      },
    },
    include: {
      user: true,
      skill: true,
    },
  })) as unknown as UserSkill[];
  const skills = await prisma.skill.findMany();

  return (
    <div>
      <DataTable
        columns={userSkillsColumns}
        data={JSON.parse(JSON.stringify(userSkills))}
        withUsers={false}
        isEditable={isProfileOwner}
      />
    </div>
  );
};

export default Profile;
