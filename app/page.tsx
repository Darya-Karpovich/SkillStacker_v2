'use client';
import { useEffect, useState } from 'react';
import { columns } from '../components/skills-table/columns';
import { DataTable } from '../components/skills-table/data-table';
import { getAllUserSkills, UserSkillIncludingSkillAndUser } from './actions';
import { PaginationState } from '@tanstack/react-table';

export const dynamic = 'force-dynamic';

const Home = () => {
  const [data, setData] = useState<UserSkillIncludingSkillAndUser[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 7,
  });
  const [totalUserSkills, setTotalUserSkills] = useState(0);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await getAllUserSkills(
        pagination.pageIndex + 1,
        pagination.pageSize,
      );
      setData(response.data);
      setPagination({
        pageIndex: response.pagination.currentPage - 1,
        pageSize: response.pagination.pageSize,
      });
      setTotalUserSkills(response.pagination.totalUserSkills);
    };
    fetchSkills();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        totalRowCount={totalUserSkills}
        pagination={pagination}
        onPageChange={setPagination}
      />
    </div>
  );
};

export default Home;
