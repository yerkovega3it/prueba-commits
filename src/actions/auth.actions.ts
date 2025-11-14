import { loginApi, meApi, type LoginCredentials, type LoginDTO } from "@/services"
import { useStoreAuth } from "@/stores/auth.store"
import { icons } from '@/components/icons'
import { authConfig } from "@/data/config.data"

export interface AuthActionDeps {
  navigate?: (path: string) => void
  persistToken?: (token: string) => void
}

const defaultPersistToken = (token: string): void => {
  localStorage.setItem("authToken", token)
}

export async function loginAction(
  credentials: LoginCredentials,
  deps?: AuthActionDeps
): Promise<boolean> {
  const navigate = deps?.navigate
  const persistToken = deps?.persistToken ?? defaultPersistToken

  useStoreAuth.setState({
    loginSubmitting: true,
    loginError: false,
    messageAlert: { message: "", variant: "info", icon: "info", iconClass: "" }
  })

  try {
    const { jwt, user, modules }: LoginDTO = await loginApi(credentials)
    persistToken(jwt)

    await userConfigAction()
    useStoreAuth.setState({
      loginSubmitting: false,
      loginError: false,
      user: user ?? null,
      permissions: modules,
      authStatus: "authenticated"
    })
    if (navigate) navigate("/")

    return true
  } catch (err) {
    useStoreAuth.setState({
      loginSubmitting: false,
      loginError: true,
      errorBack: (err instanceof Error ? err : new Error("Login error")),
      authStatus: "not-authenticated",
      messageAlert: {
        message: "El <strong>usuario o contraseña</strong> son incorrectos.",
        variant: "error",
        icon: icons.info,
        iconClass: ""
      }
    })
    return false
  }
}

export async function userConfigAction() {
  try {
    //const response = await fetch(`/db/config/config.json`)
    //const data = await response.json()
    const data = authConfig
    useStoreAuth.setState({ menu: data.menu })
    if(!localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify(data.config))
    }
  } catch (error) {
    useStoreAuth.setState({ errorBack: error as Error })
  }
}

export async function checkAuthAction(): Promise<boolean> {
  useStoreAuth.setState({ loadingUser: true })

  try {
    const token = localStorage.getItem("authToken")
    if (!token) {
      useStoreAuth.setState({
        user: null,
        permissions: [] as ReadonlyArray<never>,
        authStatus: "not-authenticated"
      })
      return false
    }
    const { user, modules } = await meApi()

    useStoreAuth.setState({
      user,
      permissions: modules,
      authStatus: "authenticated",
      loginError: false
    })
    await userConfigAction()

    return true
  } catch (err) {
    useStoreAuth.setState({
      user: null,
      authStatus: "not-authenticated",
      errorBack: err instanceof Error ? err : new Error("getCurrentUser failed")
    })
    return false
  } finally {
    useStoreAuth.setState({ loadingUser: false })
  }
}

export function logoutAction(): void {
  useStoreAuth.setState({
    authStatus: 'not-authenticated',
    user: null,
    token: null,
    permissions: []
  })
  localStorage.removeItem('user')
  localStorage.removeItem('permissions')
  localStorage.removeItem('menu')
  localStorage.removeItem('authToken')
}

export function sidebarCollapseAction(): void {
  useStoreAuth.setState(state => ({
    sidebar: {
      ...state.sidebar,
      toggleCollapse: !state.sidebar.toggleCollapse
    }
  }))
}

export function sidebarMobileAction(): void {
  useStoreAuth.setState(state => ({
    sidebar: {
      ...state.sidebar,
      toggleMobile: !state.sidebar.toggleMobile
    }
  }))
}

export function darkThemeAction(): void {
  useStoreAuth.setState((state) => {
    const newConfig = {
      ...state.config,
      darkTheme: !state.config.darkTheme
    }
    localStorage.setItem('config', JSON.stringify(newConfig))
    return { config: newConfig }
  })
}

function setDocumentTheme(isDark: boolean) {
  document.documentElement.setAttribute('data-eit-theme', isDark ? 'dark' : 'light')
}

export function startThemeAutoApply(): () => void {
  const unsubscribe = useStoreAuth.subscribe(
    state => state.config.darkTheme,
    (isDark, prev) => { if (isDark !== prev) setDocumentTheme(isDark) }
  )
  return unsubscribe
}