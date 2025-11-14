import { Navigate } from 'react-router-dom'
import { useStoreAuth } from '@/stores'
import type { PropsWithChildren } from 'react'
import { LayoutPrivateLoader } from '@/layouts'

export function AuthenticatedRoutes({children}: PropsWithChildren) {
  const authStatus = useStoreAuth(state => state.authStatus)
 
  if(authStatus === 'checking') return <LayoutPrivateLoader />
  if(authStatus === 'not-authenticated') return <Navigate to="/login" replace />

  return (
    <>{children}</>
  )
}

export function NotAuthenticatedRoutes({children}: PropsWithChildren) {
  const authStatus = useStoreAuth(state => state.authStatus)
 
  if(authStatus === 'checking') return null
  if(authStatus === 'authenticated') return <Navigate to="/" replace />

  return (
    <>{children}</>
  )
}