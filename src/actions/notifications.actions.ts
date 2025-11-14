import { notificationsApi } from "@/services"
import type { CounterNotification, NotificationBase } from '@/interfaces'

export interface NotificationsResponse {
  counter: CounterNotification
  notifications: NotificationBase[]
  meta: { total: number; finalPage: number; currentPage: number }
}

export async function getNotificactionsAction(): Promise<NotificationsResponse> {
  const dto = await notificationsApi()
  const result = {
    counter: dto.counter,
    notifications: dto.notifications,
    meta: {
      total: dto.meta.pagination.total,
      finalPage: dto.meta.pagination.pageCount,
      currentPage: dto.meta.pagination.page + 1,
    },
  }
  return result
}