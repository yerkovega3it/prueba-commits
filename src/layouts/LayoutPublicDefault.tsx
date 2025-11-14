import { Outlet } from 'react-router-dom'

export default function LayoutPublicDefault() {
  return (
    <main
      id="layout-public-default"
      className="layout-public-default"
    >
      <Outlet />
    </main>
  )
}