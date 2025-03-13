
import { columns } from '../components/skills-table/columns';
import { DataTable } from '../components/skills-table/data-table';
import { getAllUserSkills } from './actions';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const userSkills = await getAllUserSkills();

  return (
    <div>
      <DataTable columns={columns} data={userSkills}  />
    </div>
  );
};

export default Home;
