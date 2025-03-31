'use client';

import { getAllUserSkills } from '@/app/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { allUserSkillsColumns } from '../components/skills-table/columns';
import { DataTable } from '../components/skills-table/data-table';

export const HomeList = ({
  data,
  pageSize,
}: {
  data: Awaited<ReturnType<typeof getAllUserSkills>>;
  pageSize: number;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [pagination, setPagination] = useState(() => ({
    pageIndex: params.get('page') ? Number(params.get('page')) - 1 : 0,
    pageSize,
  }));

  useEffect(() => {
    router.push(`?page=${pagination.pageIndex + 1}`);
  }, [pagination.pageIndex, router]);

  return (
    <DataTable
      columns={allUserSkillsColumns}
      data={data.data}
      totalRowCount={data.pagination.totalUserSkills}
      pagination={{
        pageIndex: data.pagination.currentPage - 1,
        pageSize: data.pagination.pageSize,
      }}
      onPageChange={setPagination}
    />
  );
};
