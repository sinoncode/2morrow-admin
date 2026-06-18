import { fetchDashboardStats } from "@/api/services/dashboard.service";

let statsCache: any = null;

export async function loadDashboardStats() {
  statsCache = await fetchDashboardStats();
  return statsCache;
}

export function getDashboardStats() {
  return statsCache;
}
