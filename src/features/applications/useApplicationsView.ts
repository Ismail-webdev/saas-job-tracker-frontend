import { Application, SortKey, SortOrder, Status } from "./types";

type Params = {
  applications: Application[];
  search: string;
  statusFilter: Status | "All";
  sortKey: SortKey;
  sortOrder: SortOrder;
};

export const useApplicationsView = ({
  applications,
  search,
  statusFilter,
  sortKey,
  sortOrder,
}: Params) => {
  const filtered = applications.filter((app) => {
    const matchStatus = statusFilter === "All" || app.status === statusFilter;

    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (sortKey === "appliedOn") {
      const aDate = new Date(aVal).getTime();
      const bDate = new Date(bVal).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    }

    return sortOrder === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return sorted;
};
