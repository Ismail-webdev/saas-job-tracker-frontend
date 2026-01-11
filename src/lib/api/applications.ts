import { Application } from "@/features/applications/types";

const BASE_URL = "/api/applications";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchApplications = async (): Promise<Application[]> => {
  await wait(500);

  return [
    {
      id: "1",
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
      appliedOn: "2025-11-01",
    },
  ];
};

export const createApplication = async (
  data: Omit<Application, "id" | "appliedOn">
): Promise<Application> => {
  await wait(500);

  return {
    id: crypto.randomUUID(),
    appliedOn: new Date().toISOString().split("T")[0],
    ...data,
  };
};

export const updateApplication = async (
  id: string,
  data: Partial<Application>
): Promise<Application> => {
  await wait(500);

  return {
    id,
    company: data.company ?? "",
    role: data.role ?? "",
    status: data.status ?? "Applied",
    appliedOn: data.appliedOn ?? "",
  };
};

export const deleteApplication = async (id: string): Promise<void> => {
  await wait(300);
};
