export type Status = "Applied" | "Interview" | "Offer" | "Rejected";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: Status;
  appliedOn: string;
};

export type SortKey = "appliedOn" | "company" | "status";
export type SortOrder = "asc" | "desc";
