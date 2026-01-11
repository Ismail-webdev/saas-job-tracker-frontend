import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "@/lib/api/applications";
import { Application } from "./types";

export const useApplicationsQuery = () => {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
};
