import { useEffect, type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppRouter from './router/app.router'
import { useStoreTheme } from '@/stores'
import { checkAuthAction, startThemeAutoApply } from '@/actions'

// Create a client
const queryClient = new QueryClient()
const TIME_MS = 60 * 60 * 1000

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAction,
    refetchInterval: TIME_MS,
    staleTime: TIME_MS + 5 * 60 * 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    retry: false, 
  })
  return <>{children}</>
}

function App() {
  const getTheme = useStoreTheme(state => state.getTheme)

  useEffect(() => { getTheme() }, [getTheme])
  useEffect(() => {
    const stop = startThemeAutoApply()
    return stop
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <AppRouter />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
