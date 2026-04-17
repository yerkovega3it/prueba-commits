import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type { PersonOnSite } from "@/interfaces/dashboard/listEntities.interface";
import { http } from "../../http";

export interface PeopleOnSiteParams {
  companyName: string;
  page: number;
  size?: number;
  search?: string;
  sortKey?: string | null;
  sortDir?: "asc" | "desc" | null;
}

export async function getPeopleOnSite(
  params: PeopleOnSiteParams,
): Promise<PaginatedResponse<PersonOnSite>> {
  const { data } = await http.get<PaginatedResponse<PersonOnSite>>(
    `/dashboard/get-people-on-site`,
    { params },
  );
  return data;
}
