import { useState, useMemo, useRef } from "react"
import { Footer, FaIcon } from '@/components'
import { icons } from '@/components/icons'
import { useStoreTheme, useStoreAuth } from '@/stores'
import { loginAction } from '@/actions'
import { useShallow } from 'zustand/react/shallow'
import { useNavigate } from "react-router-dom"
import { 
  utils,
  //Components
  Button,
  Alert,
  Input
} from 'uikit-3it-react'

interface LoginFormState {
  email: string
  password: string
}
export default function LoginPage() {
  const navigate = useNavigate()
  //Store auth
  const {
    darkTheme,
    loginError,
    setLoginError,
    loginSubmitting,
    messageAlert,
    setMessageAlert
    //login
  } = useStoreAuth(
    useShallow((state) => ({
      darkTheme: state.config.darkTheme,
      loginError: state.loginError,
      setLoginError: state.setLoginError,
      loginSubmitting: state.loginSubmitting,
      messageAlert: state.messageAlert,
      setMessageAlert: state.setMessageAlert
    }))
  )
  //Store theme
  const logotipoState = useStoreTheme(state => state.logotipo)

  const { logotipo } = utils.createLogos(
    { config: { darkTheme } },
    { logotipo: logotipoState }
  )

  //States
  const rememberEmail = localStorage.getItem('rememberEmail') || ''
  const [form, setForm] = useState<LoginFormState>({ email: rememberEmail, password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [remindMe, setRemindMe] = useState<boolean>(rememberEmail !== '')

  const formRef = useRef<HTMLFormElement>(null)

  //Memos
  const controlLoginAlert = useMemo(() => (loginError ? "show" : "hide"), [loginError])
  const controlIsValidForm = useMemo(
    () => Object.entries(form).every(([, value]) => value),
    [form]
  )
  const handleEmailValue = (value: string) => {
    setForm(prev => ({ ...prev, email: value.trim() }))
  }

  const handlePasswordValue = (value: string) => {
    setForm(prev => ({ ...prev, password: value.trim() }))
  }

  const handleRecovery = () => {
    console.log('recovery')
	}

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (controlIsValidForm) {
      const success = await loginAction({ email: form.email, password: form.password })
      if (success) { navigate('/') }
      setForm(prev => ({ ...prev, password: '' }))
      //Remember
      if (remindMe) localStorage.setItem('rememberEmail', form.email)
      else localStorage.removeItem('rememberEmail')
    }
    else {
      setLoginError(true)
      setMessageAlert({
        message: "Ingresa el <strong>usuario y contraseña</strong> para acceder.",
        variant: "error",
        icon: icons.info,
        iconClass: ""
      })
    }
  }

  return (
    <>
      <section 
        id="login" 
        className="public-page"
      >
        <div
          data-eit-mb="3"
          data-eit-text-align='center'
        >
        {logotipo && (
          <img 
            src={logotipo}
            className="public-page__logo"
            alt="Logotipo corporativo"
          />
        )}
          <h2 
            data-eit-font-size="x7"
            data-eit-color="text"
            data-eit-my="0"
          >
            Hola, <strong>inicia sesión</strong>
          </h2>
          <h6 
            data-eit-font-size="x3"
            data-eit-font-weight="500"
            data-eit-font="primary"
            data-eit-color="text-soft"
            data-eit-my="2"
          >
            Ingresando los datos de tu cuenta corporativa
          </h6>
        </div>
        <form ref={formRef} onSubmit={handleLogin}>
          <Alert
            data-eit-variant="error"
            data-eit-animation={controlLoginAlert}
            icon={messageAlert.icon}
            message={messageAlert.message}
          />
         <div data-eit-my="3">
            <Input
              type="text"
              floatLabel="Correo electrónico"
              requiredField={true}
              error={loginError}
              value={form.email}
              onValueChange={handleEmailValue}
            />
          </div>

         <div data-eit-my="3">
            <Input
              type={showPassword ? "text" : "password"}
              floatLabel="Contraseña"
              requiredField={true}
              error={loginError}
              value={form.password}
              onValueChange={handlePasswordValue}
              rightSlot={
                <a 
                  onClick={() => setShowPassword(!showPassword)}
                  href="javascript:"
                  data-eit-color="text-soft"
                  data-eit-link
                >
                {showPassword && (
                  <FaIcon name="eye"/>
                )}
                {!showPassword && (
                  <FaIcon name="eyeSlash"/>
                )}
                </a> 
              }
            />
          </div>

          <div 
            data-eit-mb="3"
            data-eit-display="flex"
            data-eit-justify="between"
            data-eit-align="center"
          >
            <label className="eit-checkbox">
              <input 
                type="checkbox" 
                className="eit-checkbox__input"
                checked={remindMe}
                onChange={(e) => setRemindMe(e.currentTarget.checked)}
              />
              <span className="eit-checkbox__checkmark"></span>
              Recordarme
            </label>
            <a 
              href="javascript:"
              data-eit-font-size="x2"
              data-eit-color="secondary"
              data-eit-link
              onClick={handleRecovery}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button
            type="submit"
            data-eit-w="100"
            data-eit-variant="primary"
            text="Iniciar sesión"
            loadingText="Accediendo..."
            isDisabled={loginSubmitting}
            loading={loginSubmitting}
            onEmitEvent={handleLogin}
          />  
          <div 
            data-eit-border="all"
            data-eit-border-color="default"
            data-eit-border-radius="x3"
            data-eit-p="2"
            data-eit-mb="3"
            data-eit-bg="color-soft"
            data-eit-text-align="center"
            data-eit-mt="3"
          >
            <p 
              data-eit-color="text-soft"
              data-eit-m="0"
            >
              <strong>Admin →</strong> user: <code>adminTest@3it.cl</code> pass: <code>admin2025</code>
            </p>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}