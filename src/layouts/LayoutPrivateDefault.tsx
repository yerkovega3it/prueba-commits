import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Navbar, Notifications } from '@/components'
import { useStoreAuth, useStoreTheme, useStoreNotification } from '@/stores'
import { darkThemeAction } from '@/actions'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { utils, Sidebar } from 'uikit-3it-react'
import { sidebarCollapseAction, sidebarMobileAction, getNotificactionsAction } from '@/actions'

export default function LayoutPrivateDefault() {
  const ENVIROMENT = import.meta.env.VITE_ENVIROMENT || 'development'
  const storeAuth = useStoreAuth()
  const user = useStoreAuth(state => state.user)

  //Store auth
  const {
    darkTheme,
    sidebarCollapse
  } = useStoreAuth(
    useShallow((state) => ({
      darkTheme: state.config.darkTheme,
      sidebarCollapse: state.sidebar.toggleCollapse
    }))
  )
  //Store theme
  const logotipoState = useStoreTheme(state => state.logotipo)
  const { 
    counter,
    setTab
  } = useStoreNotification(
    useShallow((state) => ({
      counter: state.counter,
      notifications: state.notifications,
      setTab: state.setTab
    }))
  )

  const { logotipo, isotipo } = utils.createLogos(
    { config: { darkTheme } },
    { logotipo: logotipoState }
  )
  const [slideNotificaction, setSlideNotificaction] = useState(false)

  const notificationsQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificactionsAction(),
    staleTime: 30_000
  })

  const toggleNotificaciones = (event: Event) => {
		setSlideNotificaction(!slideNotificaction)
    event.stopPropagation()
  }

  const handleCloseNotificaciones = () => {
    setSlideNotificaction(false)
  }

  return (
    <main className={`layout-private-default ${sidebarCollapse ? 'layout-private-default--sidebar-collapsed' : ''}`}>
      <Sidebar
        store={storeAuth}
        sidebarCollapse={sidebarCollapseAction}
        sidebarMobile={sidebarMobileAction}
        logotipo={logotipo}
        isotipo={isotipo}
        enviroment={ENVIROMENT}
        footer="© 2025 3IT"
      />
      <section className="eit-wrapper">
        <Navbar 
          user={user} 
          toggleDarkTheme={darkThemeAction}
          toggleNotificaciones={toggleNotificaciones}
          slideNotificaction={slideNotificaction} 
        />
        <section 
          className="eit-container"
          data-eit-pt="0"
        >
          <Outlet />
        </section>
      </section>

      <Notifications
        slide={slideNotificaction}
        counter={notificationsQuery.data?.counter || counter}
        notifications={notificationsQuery.data?.notifications || []}
        tabChanged={setTab}
        markAllAsRead={() => {}}
        archiveAll={() => {}}
        archiveNotification={() => {}}
        markAsRead={() => {}}
        markAsNotRead={() => {}}
        closeNotificaciones={handleCloseNotificaciones}
      />
    </main>
  )
}
  