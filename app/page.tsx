import Image from "next/image";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ALL_SKILLS } from "@/__mocks__/all-skills";

export default function Home() {
  return (
    <div>
      <DataTable columns={columns} data={ALL_SKILLS} />
    </div>
  );
}
