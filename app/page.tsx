import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ALL_SKILLS } from "@/__mocks__/all-skills";

const Home = async () => {
  return (
    <div>
      <DataTable columns={columns} data={ALL_SKILLS} />
    </div>
  );
};

export default Home;
