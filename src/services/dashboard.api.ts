import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { apiService } from "./api.service";
import { API_URL } from "../constants/environments";

export const dashboardService = {
  async get(): Promise<Dashboard> {
    return apiService.get<Dashboard>({
      endpoint: `${API_URL}/dashboard/get`,
    });
  },
};
