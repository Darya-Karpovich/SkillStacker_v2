'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ActionType } from '../user-skills-table/action-type';

import { AddSkillForm } from './add-skill-form/add-skill-form';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  withUsers?: boolean;
  action?: ActionType;
  totalRowCount: number;
  pagination: PaginationState;
  onPageChange: Dispatch<SetStateAction<PaginationState>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  withUsers = true,
  action = ActionType.NONE,
  pagination,
  totalRowCount,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    if (columns.find((column) => column.id === 'user')) {
      setColumnFilters([{ value: '', id: 'user' }]);
    }
  }, [columns]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    rowCount: totalRowCount,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: onPageChange,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div>
      {withUsers && columnFilters.length > 0 && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter users..."
            value={columnFilters[0].value as string}
            onChange={(e) =>
              setColumnFilters([{ ...columnFilters[0], value: e.target.value }])
            }
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table className="flex w-full flex-col">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="flex">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex flex-1 items-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {action === ActionType.ADD && (
              <TableRow key="form-row" className="relative flex">
                <TableCell colSpan={columns.length} className="flex w-full p-0">
                  <AddSkillForm />
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="flex"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="flex-1">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalRowCount > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onPageChange((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {pagination.pageIndex + 1} of{' '}
            {Math.ceil(totalRowCount / pagination.pageSize)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onPageChange((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
