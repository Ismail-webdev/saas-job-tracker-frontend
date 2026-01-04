import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import ApplicationForm from "../components/ApplicationForm";
import { ApplicationFormValues } from "../application.schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- Types ---------------- */

type Status = "Applied" | "Interview" | "Offer" | "Rejected";

type Application = {
  id: string;
  company: string;
  role: string;
  status: Status;
  appliedOn: string;
};

/* ---------------- Helpers ---------------- */

const statusVariant = (status: Status) => {
  switch (status) {
    case "Interview":
      return "default";
    case "Applied":
      return "secondary";
    case "Rejected":
      return "destructive";
    case "Offer":
      return "outline";
    default:
      return "outline";
  }
};

/* ---------------- Page ---------------- */

const ApplicationsPage = () => {
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

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  /* ---------- Handlers ---------- */

  const filteredApplication = applications.filter((app) => {
    const matchStatus = statusFilter === "All" || app.status === statusFilter;

    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchesSearch;
  });

  const handleAdd = (data: ApplicationFormValues) => {
    setApplications((prev) => [
      ...prev,
      {
        id: uuidv4(),
        appliedOn: new Date().toISOString().split("T")[0],
        ...data,
      },
    ]);

    setOpenAdd(false);
  };

  const handleEdit = (data: ApplicationFormValues) => {
    if (!selectedApplication) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id ? { ...app, ...data } : app
      )
    );

    setOpenEdit(false);
    setSelectedApplication(null);
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  /* ---------- UI ---------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Button onClick={() => setOpenAdd(true)}>Add Application</Button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search by company or role.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as Status | "All")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Offer">Offer</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
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
          {filteredApplication.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No matching applications
              </TableCell>
            </TableRow>
          ) : (
            filteredApplication.map((app) => (
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
                      <Button variant="ghost" size="sm">
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

      {/* Add Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Application</DialogTitle>
          </DialogHeader>

          <ApplicationForm onSubmit={handleAdd} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>

          <ApplicationForm
            defaultValues={{
              company: selectedApplication?.company,
              role: selectedApplication?.role,
              status: selectedApplication?.status,
            }}
            onSubmit={handleEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsPage;
