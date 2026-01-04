import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { ApplicationFormValues } from "../application.schema";

type Props = {
  open: boolean;
  title: string;
  defaultValue?: Partial<ApplicationFormValues>;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ApplicationFormValues) => void;
};
const ApplicationDialog = ({
  open,
  title,
  defaultValues,
  onOpenChange,
  onSubmit,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ApplicationForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        ></ApplicationForm>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
