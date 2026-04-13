import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { http } from "./http";
import { API_URL } from "../constants/environments";

export const dashboardService = {
  async get(): Promise<Dashboard> {
    const { data } = await http.get<Dashboard>(`${API_URL}/dashboard/get`);
    return data;
  },
};
