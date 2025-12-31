import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
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
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React from "react";

const applications = [
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

const statusColor = (status: string) => {
  switch (status) {
    case "Interview":
      return "default";
    case "Applied":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};
const ApplicationsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications</h1>

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
                  <Badge variant={statusColor(app.status)}>{app.status}</Badge>
                </TableCell>
                <TableCell>{app.appliedOn}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="shadow border-gray-400 p-1 px-2 bg-white"
                    >
                      <DropdownMenuItem className="border-b border-gray-300 py-1 hover:cursor-pointer">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 py-1 hover:cursor-pointer">
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
    </div>
  );
};

export default ApplicationsPage;
