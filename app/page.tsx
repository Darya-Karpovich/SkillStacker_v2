import { DataTable } from "./data-table";
import { UserSkill, columns } from "./columns";
import prisma from "@/utils/prisma";

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
