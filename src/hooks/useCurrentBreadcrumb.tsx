import { useMatches } from 'react-router-dom'
interface RouteHandle {
  breadcrumb?: string
}
export function useCurrentBreadcrumb(): string | undefined {
  const matches = useMatches()
  return (matches.at(-1)?.handle as RouteHandle | undefined)?.breadcrumb
}