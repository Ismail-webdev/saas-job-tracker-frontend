import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  applicationSchema,
  ApplicationFormValues,
} from "../application.schema";
import { data } from "react-router-dom";

type Props = {
  defaultValues?: Partial<ApplicationFormValues>;
  onSubmit?: (data: ApplicationFormValues) => void;
};
const ApplicationForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
  });
  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit((data) => {
        onSubmit?.(data);
      })}
    >
      <div className="space-y-1">
        <Label>Company</Label>
        <Input {...form.register("company")} />
        {form.formState.errors.company && (
          <p className="text-sm text-red-600">
            {form.formState.errors.company.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label>Role</Label>
        <Input {...form.register("role")} />
        {form.formState.errors.role && (
          <p className="text-sm text-red-600">
            {form.formState.errors.role.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label>Status</label>
        <Select
          onValueChange={(value) => form.setValue("status", value as any)}
        >
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
        {form.formState.errors.status && (
          <p className="text-sm text-red-600">
            {form.formState.errors.status.message}
          </p>
        )}
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
