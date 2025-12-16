import { internalEndpoints } from "@shared/constants/internalEndpoints/internalEndpoints";
import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { apiService } from "./api.service";

export const dashboardService = {
  async get(): Promise<Dashboard> {
    return apiService.get<Dashboard>({
      endpoint: internalEndpoints.DASHBOARD_GET.pathBase,
    });
  },
};
