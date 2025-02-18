import React, { useState, useMemo, useEffect } from 'react';
import { Sheet, Table, Avatar, Stack, Button, IconButton } from '@mui/joy';
import { Outlet, useLoaderData } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { debounce } from 'lodash';
import SearchIcon from '@heroicons/react/solid/SearchIcon';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('profile', {
    id: 'profile',
    header: ({ table }) => (
      <Stack alignItems={'center'} direction="row" spacing={2}>
        <Button
          onClick={table.getToggleAllRowsExpandedHandler()}
          color="warning"
          size="sm"
          style={{ fontSize: 16 }}
        >
          {table.getIsAllRowsExpanded() ? '👇' : '👉'}
        </Button>
        <span>Profile Picture</span>
      </Stack>
    ),
    cell: ({ row, getValue }) => (
      <Stack
        sx={{ paddingLeft: `${row.depth * 2}rem` }}
        direction="row"
        spacing={2}
      >
        {row.getCanExpand() ? (
          <Button
            onClick={row.getToggleExpandedHandler()}
            color="warning"
            size="sm"
            style={{ fontSize: 16 }}
          >
            {row.getIsExpanded() ? '👇' : '👉'}
          </Button>
        ) : (
          <Button
            size="sm"
            disabled
            color="neutral"
            sx={{ filter: 'grayscale(1)' }}
          >
            🔵
          </Button>
        )}
        <Avatar src={`${axios.defaults.baseURL}/${getValue()}`} />
      </Stack>
    ),
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: 'ROUTE',
  }),
  columnHelper.accessor('detime', {
    id: 'detime',
    header: 'DEPARTURE TIME',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'ARRIVAL TIME',
  }),
  columnHelper.accessor('phone', {
    id: 'phone',
    header: 'BUS NUMBER',
  }),
  columnHelper.accessor('action', {
    id: 'action',
    header: <p style={{ textAlign: 'center' }}>ACTION</p>,
    cell: ({ row }) => (
      <Stack justifyContent={'center'} direction={'row'} spacing={1}>
        <IconButton component={Link} to={`${row.original._id}/create`}>
          <AddIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`${row.original._id}/edit`}
          color="success"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`${row.original._id}/delete`}
          color="danger"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
  }),
];

const Bus = () => {
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const data = useLoaderData();

  // Debounce the search term to reduce the number of re-renders
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      expanded,
    },
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      <Outlet />
      <Button component={Link} to="create" className="mb-4">
        Create bus schedule
      </Button>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <input
          type="text"
          placeholder="Search route"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="block w-full pl-4 pr-12 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 placeholder-gray-400"
        />
      
          {/* You can add a search icon here if needed */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width={50}
            height={50}


          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a4 4 0 11-8 0 4 4 0 018 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.5 17.5l4.5 4.5"
            />
          </svg>
        </div>
      
      <Sheet sx={{ borderRadius: 5 }}>
        <Table size="lg">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ backgroundColor: 'BROWN', color: 'yellow' }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
};

export default Bus;
