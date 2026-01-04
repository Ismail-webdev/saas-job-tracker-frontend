import type { Status } from "./types";
export const statusVariant = (status: Status) => {
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

export const formatToday = () => new Date().toISOString().split("T")[0];
