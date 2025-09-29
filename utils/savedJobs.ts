import AsyncStorage from "@react-native-async-storage/async-storage";

export type JobStatus = "active" | "applied" | "completed";

export type SavedJob = {
  id: string;
  profileImage: any;
  posterName: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  experience: string;
  // Backward compat: previously used `completed?: boolean`
  completed?: boolean;
  status?: JobStatus; // preferred
};

const STORAGE_KEY = "@saved_jobs";

export async function getSavedJobs(): Promise<SavedJob[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const list: SavedJob[] = raw ? JSON.parse(raw) : [];
    // Normalize legacy records: derive `status` from `completed` or default to active
    return list.map((j) => {
      const derivedStatus: JobStatus = j.status
        ? j.status
        : j.completed
        ? "completed"
        : "active";
      return { ...j, status: derivedStatus, completed: derivedStatus === "completed" };
    });
  } catch {
    return [];
  }
}

export async function addSavedJob(job: SavedJob): Promise<void> {
  const list = await getSavedJobs();
  if (list.some((j) => j.id === job.id)) return;
  const status: JobStatus = job.status
    ? job.status
    : job.completed
    ? "completed"
    : "active";
  const updated = [{ ...job, status, completed: status === "completed" }, ...list];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function removeSavedJob(id: string): Promise<void> {
  const list = await getSavedJobs();
  const updated = list.filter((j) => j.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function isJobSaved(id: string): Promise<boolean> {
  const list = await getSavedJobs();
  return list.some((j) => j.id === id);
}


export async function setJobCompleted(id: string, completed: boolean): Promise<void> {
  const list = await getSavedJobs();
  const updated = list.map((j) => (j.id === id ? { ...j, completed, status: completed ? "completed" : j.status ?? "active" } : j));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function getCompletedJobs(): Promise<SavedJob[]> {
  const list = await getSavedJobs();
  return list.filter((j) => (j.status ?? (j.completed ? "completed" : "active")) === "completed");
}

export async function getActiveSavedJobs(): Promise<SavedJob[]> {
  const list = await getSavedJobs();
  return list.filter((j) => (j.status ?? (j.completed ? "completed" : "active")) === "active");
}

export async function setJobStatus(id: string, status: JobStatus): Promise<void> {
  const list = await getSavedJobs();
  const updated = list.map((j) => (j.id === id ? { ...j, status, completed: status === "completed" } : j));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function getJobsByStatus(status: JobStatus): Promise<SavedJob[]> {
  const list = await getSavedJobs();
  return list.filter((j) => (j.status as JobStatus) === status);
}



