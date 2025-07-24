"use client";

import { useState } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useEvents } from '../../usecases/useEvents';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { UnifiedTable, ColumnFilter, RowActionsDropdown } from '@/components/Tables';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus } from 'lucide-react';
import { Event } from '../../models/interfaces/event';
import { Checkbox } from '@/components/ui/checkbox';

export function EventManagementContainer() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data, isLoading, error } = useEvents();

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  // Column definitions for the table
  const columns: ColumnDef<Event>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate") ||
              false
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        )
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Event Name",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground truncate">
            {row.original.short_description}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "published" ? "default" :
                status === "draft" ? "secondary" :
                  status === "cancelled" ? "destructive" :
                    "outline"
            }
          >
            {status}
          </Badge>
        );
      },
      filterFn: "arrIncludes",
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => {
        const date = row.getValue("start_date") as Date;
        return format(new Date(date), "MMM d, yyyy");
      },
    },
    {
      accessorKey: "venue.name",
      header: "Venue",
      cell: ({ row }) => {
        const venue = row.original.venue;
        return (
          <div>
            <div className="font-medium">{venue.name}</div>
            <div className="text-sm text-muted-foreground">
              {venue.city}, {venue.state}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "total_capacity",
      header: "Capacity",
      cell: ({ row }) => {
        const total = row.getValue("total_capacity") as number;
        const sold = row.original.sold_tickets;
        const percentage = total > 0 ? (sold / total) * 100 : 0;

        return (
          <div className="text-right">
            <div className="font-medium">{sold.toLocaleString()} / {total.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {percentage.toFixed(1)}% sold
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "is_featured",
      header: "Featured",
      cell: ({ row }) => {
        const isFeatured = row.getValue("is_featured") as boolean;
        return (
          <Badge variant={isFeatured ? "default" : "outline"}>
            {isFeatured ? "Yes" : "No"}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as boolean;
        const filterValue = value === "true";
        return rowValue === filterValue;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <RowActionsDropdown
          row={row}
          deleteItemName="event"
          onView={(row) => {
            console.log("View event:", row.original);
            // TODO: Navigate to event detail page
          }}
          onEdit={(row) => {
            console.log("Edit event:", row.original);
            // TODO: Navigate to edit event page
          }}
          onCopy={(row) => {
            console.log("Duplicate event:", row.original);
            // TODO: Implement event duplication
          }}
          onDelete={(row) => {
            console.log("Delete event:", row.original);
            // TODO: Implement event deletion
          }}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Column filters configuration
  const columnFilters: ColumnFilter[] = [
    {
      columnId: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      columnId: "is_featured",
      label: "Featured",
      type: "select",
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],
    },
    {
      columnId: "name",
      label: "Event Name",
      type: "text",
      placeholder: "Search events...",
    },
  ];

  const handleRowsDelete = (selectedRows: Row<Event>[]) => {
    console.log("Deleting rows:", selectedRows);
    // TODO: Implement delete functionality
  };

  if (showCreateForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleCreateCancel}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Management
          </Button>
        </div>
        <UpsertEventForm onSuccess={handleCreateSuccess} onCancel={handleCreateCancel} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage your events</p>
        </div>
      </div>

      <UnifiedTable
        data={data || []}
        columns={columns}
        config={{
          showSearch: true,
          showColumnFilters: true,
          showColumnVisibility: true,
          showRowSelection: true,
          showPagination: true,
          showDeleteButton: true,
          showCustomActions: true,
        }}
        columnFilters={columnFilters}
        actionButtons={[
          {
            label: "Create New Event",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => setShowCreateForm(true),
            variant: "default",
          },
        ]}
        onRowsDelete={handleRowsDelete}
        isLoading={isLoading}
        error={error?.message || null}
        searchPlaceholder="Search events..."
        searchColumnKey="name"
        defaultPageSize={10}
      />
    </div>
  );
}
