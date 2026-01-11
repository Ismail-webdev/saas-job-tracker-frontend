import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useApplicationsQuery } from "../useApplicationsQuery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ApplicationFormValues } from "../application.schema";
import ApplicationDialog from "../components/ApplicationDialog";

import { Application, Status, SortKey, SortOrder } from "../types";
import { statusVariant } from "../application.utils";
import { useApplicationsView } from "../useApplicationsView";

/* ---------------- Page ---------------- */

const ApplicationsPage = () => {
  const {
    data: serverApplications,
    isLoading: isFetching,
    error,
  } = useApplicationsQuery();
  console.log("Applications from API:", serverApplications);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: uuidv4(),
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
      appliedOn: "2025-11-01",
    },
    {
      id: uuidv4(),
      company: "Amazon",
      role: "React Engineer",
      status: "Applied",
      appliedOn: "2025-12-08",
    },
  ]);

  const [sortKey, setSortKey] = useState<SortKey>("appliedOn");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const viewApplications = useApplicationsView({
    applications,
    search,
    statusFilter,
    sortKey,
    sortOrder,
  });

  /* ---------------- Handlers ---------------- */

  const handleAdd = (data: ApplicationFormValues) => {
    setIsMutating(true);

    setTimeout(() => {
      setApplications((prev) => [
        ...prev,
        {
          id: uuidv4(),
          appliedOn: new Date().toISOString().split("T")[0],
          ...data,
        },
      ]);
      setIsMutating(false);
      setOpenAdd(false);
    }, 800);
  };

  const handleEdit = (data: ApplicationFormValues) => {
    if (!selectedApplication) return;

    setIsMutating(true);

    setTimeout(() => {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApplication.id ? { ...app, ...data } : app
        )
      );
      setIsMutating(false);
      setOpenEdit(false);
      setSelectedApplication(null);
    }, 800);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    setIsMutating(true);

    setTimeout(() => {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      setIsMutating(false);
    }, 600);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Button onClick={() => setOpenAdd(true)} disabled={isMutating}>
          Add Application
        </Button>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as Status | "All")}
        >
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Offer">Offer</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="appliedOn">Applied Date</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(v) => setSortOrder(v as SortOrder)}
        >
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {viewApplications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-muted-foreground"
              >
                {search || statusFilter !== "All"
                  ? "No applications match your filters"
                  : "No applications yet. Add your first one."}
              </TableCell>
            </TableRow>
          ) : (
            viewApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.company}</TableCell>
                <TableCell>{app.role}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(app.status)}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>{app.appliedOn}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={isMutating}>
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedApplication(app);
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/*  Dialogs */}
      <ApplicationDialog
        open={openAdd}
        title="Add Application"
        onOpenChange={setOpenAdd}
        onSubmit={handleAdd}
      />

      <ApplicationDialog
        open={openEdit}
        title="Edit Application"
        defaultValues={{
          company: selectedApplication?.company,
          role: selectedApplication?.role,
          status: selectedApplication?.status,
        }}
        onOpenChange={setOpenEdit}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default ApplicationsPage;
