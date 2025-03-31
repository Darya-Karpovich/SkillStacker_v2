import { HomeList, PAGE_SIZE } from '@/components/home';
import { getAllUserSkills } from './actions';
import React from 'react';
import { redirect } from 'next/navigation';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page =
    'page' in (await searchParams) ? +((await searchParams).page || 1) : 1;
  const data = await getAllUserSkills(page, PAGE_SIZE);
  const totalPages = Math.ceil(data.pagination.totalUserSkills / PAGE_SIZE);
  if (page > totalPages) {
    redirect(`/?page=${totalPages}`);
  }

  return <HomeList data={data} />;
}
