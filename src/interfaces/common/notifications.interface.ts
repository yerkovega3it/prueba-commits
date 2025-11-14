export interface CounterNotification {
  inbox: number
	noread: number
}

export interface ModuleNotification {
  name: string
	record_name: string
}

export interface MakeNotification {
  first_name: string
	last_name: string
	profile_name: string
}

export interface NotificationType {
  type: string
	name: string
	icon: string
	color: string
}

export interface NotificationBase {
  id: number
	date: string
	url: string
  read: boolean
  inbox: boolean
	notification: NotificationType
	module: ModuleNotification
	maker: MakeNotification
}

export interface NotificationsProps {
  slide: boolean
  counter: CounterNotification
  notifications: NotificationBase[]
  tabChanged: (tab: string) => void
  markAllAsRead: () => void
  archiveAll: () => void
  archiveNotification: (record: NotificationBase) => void
  markAsRead: (record: NotificationBase) => void
  markAsNotRead: (record: NotificationBase) => void
  closeNotificaciones: () => void
}

export interface NotificationState {
  slide: boolean
  setSlide: (value: boolean) => void
  counter: CounterNotification
  setCounter: (value: CounterNotification) => void
  notifications: NotificationBase[]
  tab: string
  setTab: (value: string) => void
  errorBack: Error | null
}