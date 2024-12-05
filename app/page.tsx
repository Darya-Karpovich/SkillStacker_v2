import prisma from "@/utils/prisma";

import { DataTable } from "../components/skills-table/data-table";
import { UserSkill, columns } from "../components/skills-table/columns";

export const dynamic = "force-dynamic";

const Home = async () => {
  const userSkills = (await prisma.userSkill.findMany({
    include: {
      user: true,
      skill: true,
    },
  })) as unknown as UserSkill[];

  return (
    <div>
      <DataTable columns={columns} data={userSkills} />
    </div>
  );
};

export default Home;
