import { getServerSession } from 'next-auth/next';

import { getUserWithSkills } from '@/app/actions';
import { TableProvider } from '@/components/user-skills-table/contexts/table-context';
import { UserSkillsTable } from '@/components/user-skills-table/user-skills-table';
import { authOptions } from '@/lib/configs/auth/authOptions';

const Profile = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const isCurrentUser = session?.user?.id === slug;
  const userSkills = await getUserWithSkills(slug);

  return (
    <TableProvider userSkills={userSkills}>
      <UserSkillsTable isCurrentUser={isCurrentUser} />
    </TableProvider>
  );
};

export default Profile;
