import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { dashboardService } from "@/services/dashboard.api";

interface DashboardState {
  dashboard: Dashboard | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;

  // Actions
  fetchDashboard: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  dashboard: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useStoreDashboard = create<DashboardState>()(
  devtools(
    (set) => ({
      ...initialState,

      fetchDashboard: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await dashboardService.get();
          set({
            dashboard: data,
            isLoading: false,
            lastUpdated: new Date(),
            error: null,
          });
        } catch (error) {
          set({
            error: error as Error,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    { name: "Dashboard Store" }
  )
);
