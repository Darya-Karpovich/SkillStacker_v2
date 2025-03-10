import { getServerSession } from 'next-auth/next';
import { UserSkill } from '@prisma/client';

import { UserSkillsTable } from '@/components/user-skills-table/user-skills-table';
import { TableProvider } from '@/components/user-skills-table/contexts/table-context';
import { authOptions } from '@/lib/configs/auth/authOptions';
import prisma from '@/utils/prisma';

const Profile = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);
  const isCurrentUser = session?.user.id == params.slug;

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

  return (
    <TableProvider userSkills={userSkills}>
      <UserSkillsTable isCurrentUser={isCurrentUser} />
    </TableProvider>
  );
};

export default Profile;
