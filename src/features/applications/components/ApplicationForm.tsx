import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const ApplicationForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="company">Company</Label>
        <Input id="company" placeholder="Company name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="role">Role</Label>
        <Input id="role" placeholder="Frontend Developer" />
      </div>

      <div className="space-y-1">
        <label>Status</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Offer">Offer</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
