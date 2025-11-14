import { useState, useRef, useEffect, useMemo, useCallback, type ChangeEvent } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'
import { 
  utils, hooks, 
  Alert, Loading, Select, FieldError, Error, Button, Toast, Input,
  type ToastCore, type ToastExpose 
} from 'uikit-3it-react'
import { useCurrentBreadcrumb } from '@/hooks'
import { useStoreExamples } from '@/stores'
import { 
  getSelectRoleUserAction, 
  getExampleByIdFormAction, 
  mutationCreateExampleFormAction, 
  mutationUpdateExampleFormAction 
} from '@/actions'
import { FaIcon } from '@/components'
import type { ExampleForm } from '@/interfaces'
import { initialExampleForm } from '@/factories'
import { exampleRules } from '@/rules'
import messages from '@/messages/messages'

// Utils
const { 
  validateDefault, 
  validateEmail, 
  validateRut,
  validatePhone 
} = utils.createValidator()
const { 
  inputMaskPhone,
  inputMaskRut,
  inputOnlyLettersAndNumbers
} = utils.createInputMask()
const {
  messageAlertDefault,
  messageToastCreateUpdate
} = utils.createMessage()

export default function ExamplesFormPage() {
  // ============================================================
  // 1. ROUTING & NAVIGATION
  // ============================================================
  const breadcrumb = useCurrentBreadcrumb()
  const { id = null } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const toastRef = useRef<ToastExpose>(null)

  // ============================================================
  // 2. GLOBAL STATE (STORES)
  // ============================================================
  const {
    messageAlert,
    setMessageAlert,
    exampleForm,
    setExampleForm,
    errorBack,
  } = useStoreExamples(
    useShallow((state) => ({
      messageAlert: state.messageAlert,
      setMessageAlert: state.setMessageAlert,
      exampleForm: state.exampleForm,
      setExampleForm: state.setExampleForm,
      errorBack: state.errorBack,
      setErrorBack: state.setErrorBack
    }))
  )

  // ============================================================
  // 3. SERVER STATE (QUERIES)
  // ============================================================
  const queryClient = useQueryClient()

  const selectRoleUser = useQuery({
    queryKey: ['selectRoleUser'],
    queryFn: () => getSelectRoleUserAction(),
    staleTime: 30_000
  })

  const exampleFormQuery = useQuery({
    queryKey: ['userById', id],
    queryFn: () => getExampleByIdFormAction(Number(id)),
    enabled: id != null,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true 
  })

  const mutationCreateExampleForm = useMutation({
    mutationFn: (payload: ExampleForm) => mutationCreateExampleFormAction(payload),
    onSuccess: async () => {
      handleFormSuccess()
      await queryClient.invalidateQueries({ queryKey: ['examples'] })
      await queryClient.invalidateQueries({ queryKey: ['example'] })
    }
  })

  const mutationUpdateExampleForm = useMutation({
    mutationFn: (payload: ExampleForm) => mutationUpdateExampleFormAction(payload),
    onSuccess: () => {
      handleFormSuccess()
      queryClient.invalidateQueries({ queryKey: ['examples'] })
    }
  })

  // ============================================================
  // 4. LOCAL STATE
  // ============================================================
  const [toast, setToast] = useState<ToastCore>({ variant: 'info', title: '', message: '', code: '' })
  const [errorForm, setErrorForm] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  // ============================================================
  // 5. CUSTOM HOOKS
  // ============================================================
  const { isValid, errors } = hooks.useRules(exampleForm, exampleRules)

  // ============================================================
  // 6. DERIVED STATE & MEMOIZED VALUES
  // ============================================================
  const controlFormPending = useMemo(() => {
    return mutationCreateExampleForm.isPending || mutationUpdateExampleForm.isPending
  }, [mutationCreateExampleForm.isPending, mutationUpdateExampleForm.isPending])

  const controlFormSuccess = useMemo(() => {
    return mutationCreateExampleForm.isSuccess || mutationUpdateExampleForm.isSuccess
  }, [mutationCreateExampleForm.isSuccess, mutationUpdateExampleForm.isSuccess])

  // ============================================================
  // 7. INITIALIZATION EFFECTS
  // ============================================================
  useEffect(() => {
    setExampleForm(exampleFormQuery.data ?? initialExampleForm)
  }, [setExampleForm, exampleFormQuery.data])

  useEffect(() => {
    setMessageAlert(messageAlertDefault(messages.example, errorForm, 'EX_FORM'))
  }, [errorForm, setMessageAlert])

  useEffect(() => {
    if (id === null || controlFormSuccess) setSubmitted(true)
    else setSubmitted(false)
  }, [controlFormSuccess, id])


  // ============================================================
  // 8. CALLBACKS & HANDLERS
  // ============================================================
  const handleToastShow = useCallback(() => {
    setToast(messageToastCreateUpdate(
      messages.example,
      Number(id),
      !!errorBack
    ))
    toastRef.current?.handleShowToast()
  }, [id, errorBack])

  const handleFormSuccess = useCallback(() => {
    handleToastShow()
    setExampleForm(initialExampleForm)
    setTimeout(() => navigate('/examples'), 3000)
  }, [handleToastShow, setExampleForm, navigate])

  // Handlers de formulario
  const handleValueIdentification = useCallback((value: string) => {
    setExampleForm({ identification: value })
  }, [setExampleForm])

  const handleSelectedRole = useCallback((value: { id: number; name: string }) => {
    setExampleForm({ roleId: value })
  }, [setExampleForm])

  const handleValueFirstName = useCallback((value: string) => {
    setExampleForm({ firstName: value })
  }, [setExampleForm])

  const handleValueLastName = useCallback((value: string) => {
    setExampleForm({ lastName: value })
  }, [setExampleForm])

  const handleValueEmail = useCallback((value: string) => {
    setExampleForm({ email: value })
  }, [setExampleForm])

  const handleValuePhoneNumber = useCallback((value: string) => {
    setExampleForm({ phoneNumber: value })
  }, [setExampleForm])

  const handleValueLoginViaSso = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setExampleForm({ loginViaSso: event.target.checked })
  }, [setExampleForm])

  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      setErrorForm(true)
      return
    }
    try {
      if (id) await mutationUpdateExampleForm.mutateAsync(exampleForm)
      else await mutationCreateExampleForm.mutateAsync(exampleForm)
    } catch (error) {
      console.error('Error submitting form', error)
    }
  }, [isValid, id, exampleForm, mutationUpdateExampleForm, mutationCreateExampleForm])

  // ============================================================
  // 9. RENDER
  // ============================================================

  return (
    <>
      <h1 
        className="m-0"
        data-eit-font="primary"
        data-eit-font-size="x7"
        data-eit-color="text"
        data-eit-font-weight="900"
        data-eit-my="0"
      >
        {breadcrumb}
      </h1>

      <Alert
        data-eit-mb="3"
        data-eit-variant={messageAlert.variant}
        icon={messageAlert.icon}
        message={messageAlert.message}
      />
      {exampleFormQuery.isFetching ? (
        <Loading
          size="100"
          data-eit-mb="3"
        />
      ) : (
        <>
          <form action="">
              <div 
                className="row"
                data-eit-mb="3"
              >
                <div className="col-12">
                  <h5 
                    data-eit-m="0"
                    data-eit-font-size="x5"
                    data-eit-color="secondary"
                    data-eit-border="bottom"
                    data-eit-border-color="default"
                  >
                    Datos principales
                  </h5>
                </div>
              </div>

            <div className="row">
              <div 
                className="col-12 col-lg-6"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  RUT
                </label>
                <Input
                  type="text"
                  value={exampleForm.identification}
                  validation={validateRut}
                  inputMask={inputMaskRut}
                  maxLength={12}
                  placeholder="12.345.678-9"
                  requiredField={errors.identification?.required}
                  error={errorForm}
                  submitted={submitted}
                  onValueChange={handleValueIdentification}
                />
                <FieldError
                  errorForm={errorForm}
                  errorMessage={errors.identification?.message}
                />
              </div>
              <div
                className="col-12 col-lg-6"
                data-eit-mb="3"
              >
              <label data-eit-color="text">
                Rol de cuenta
              </label>
              <Select
                data={selectRoleUser.data?.data}
                selected={exampleForm.roleId}
                validation={validateDefault}
                requiredField={errors.roleId?.required}
                error={errorForm}
                submitted={submitted}
                onValueChange={handleSelectedRole}
                isDisabled={selectRoleUser.isFetching}
              />
                <FieldError
                  errorForm={errorForm}
                  errorMessage={errors.roleId?.message}
                />
              </div>
            </div>

            <div className="row">
              <div 
                className="col-12 col-lg-6"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  Nombre
                </label>
                  <Input
                    type="text"
                    value={exampleForm.firstName}
                    validation={validateDefault}
                    inputMask={inputOnlyLettersAndNumbers}
                    maxLength={100}
                    placeholder="Ingresa un nombre"
                    requiredField={errors.firstName?.required}
                    error={errorForm}
                    submitted={submitted}
                    onValueChange={handleValueFirstName}
                  />
                  <FieldError
                    errorForm={errorForm}
                    errorMessage={errors.firstName?.message}
                  />
              </div>
              <div 
                className="col-12 col-lg-6"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  Apellido
                </label>
                  <Input
                    type="text"
                    value={exampleForm.lastName}
                    validation={validateDefault}
                    inputMask={inputOnlyLettersAndNumbers}
                    maxLength={100}
                    placeholder="Ingresa un apellido"
                    requiredField={errors.lastName?.required}
                    error={errorForm}
                    submitted={submitted}
                    onValueChange={handleValueLastName}
                  />
                  <FieldError
                    errorForm={errorForm}
                    errorMessage={errors.lastName?.message}
                  />
              </div>
            </div>

            <div className="row">
              <div 
                className="col-12 col-lg-6"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  Correo electrónico
                </label>
                  <Input
                    type="text"
                    value={exampleForm.email}
                    validation={validateEmail}
                    maxLength={200}
                    placeholder="Ingresa un correo"
                    requiredField={errors.email?.required}
                    error={errorForm}
                    submitted={submitted}
                    onValueChange={handleValueEmail}
                  />
                  <FieldError
                    errorForm={errorForm}
                    errorMessage={errors.email?.message}
                  />
              </div>
              <div
                className="col-12 col-lg-6"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  Teléfono
                </label>
                  <Input
                    type="text"
                    value={exampleForm.phoneNumber}
                    validation={validatePhone}
                    inputMask={inputMaskPhone}
                    maxLength={14}
                    placeholder="Ingresa un teléfono"
                    requiredField={errors.phoneNumber?.required}
                    error={errorForm}
                    submitted={submitted}
                    onValueChange={handleValuePhoneNumber}
                  />
                  <FieldError
                    errorForm={errorForm}
                    errorMessage={errors.phoneNumber?.message}
                  />
              </div>
            </div>

            <div
              data-eit-border="all"
              data-eit-border-color="default"
              data-eit-border-radius="x3"
              data-eit-p="2"
              data-eit-mb="3"
            >
              <label 
                className="eit-cursor--pointer"
                data-eit-display='flex'
                data-eit-justify='between'
                data-eit-align='center'
              >
                <span data-eit-color='text-soft'>
                  <FaIcon name="circleInfo" 
                    data-eit-font-size="x4"
                    data-eit-color="blue"
                    data-eit-me="1"
                  />
                  Activar modo SSO
                </span>
                <span className="eit-switch">
                  <input
                    type="checkbox"
                    className="eit-switch__input"
                    checked={exampleForm.loginViaSso}
                    onChange={handleValueLoginViaSso}
                  />
                  <span className="eit-switch__slider"></span>
                </span>
              </label> 
            </div>

            <Error
              data-eit-mb="3"
              data={errorBack?.response?.data?.error?.errorFields}
            />

            <div 
              data-eit-display="flex"
              data-eit-justify="end"
            >
              <Button
                text="Guardar example"
                icon="fa-solid fa-floppy-disk"
                data-eit-variant="primary"
                loading={controlFormPending}
                isDisabled={controlFormPending}
                loadingText="Guardando..."
                onEmitEvent={handleSubmit}
              />
            </div>
          </form>

          <Toast 
            ref={toastRef} 
            data={toast} 
            position="bottom" 
            visible={5000} 
          />
        </>
      )}
    </>
  )
}