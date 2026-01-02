import { useState } from "react";

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

type Status = "Applied" | "Interview" | "Offer" | "Rejected";

type Application = {
  id: number;
  company: string;
  role: string;
  status: Status;
  appliedOn: string;
};

const applications: Application[] = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    status: "Interview",
    appliedOn: "2025-11-01",
  },
  {
    id: 2,
    company: "Amazon",
    role: "React Engineer",
    status: "Applied",
    appliedOn: "2025-12-08",
  },
];

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

const ApplicationsPage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>

        <Button onClick={() => setOpenAdd(true)}>Add Application</Button>
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
          {applications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No applications found
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
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

                      <DropdownMenuItem className="text-red-600">
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
          <ApplicationForm />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>

          {/* Later you will pass selectedApplication as props */}
          <ApplicationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsPage;
