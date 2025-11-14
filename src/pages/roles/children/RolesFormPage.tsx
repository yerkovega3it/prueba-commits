import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'
import { icons } from '@/components/icons'
import { FaIcon } from '@/components'
import { 
  utils, hooks, 
  Alert, Loading, Select, FieldError, Error, Button, Toast, Input, TextareaResize,
  type ToastCore, type ToastExpose, type SelectOption
} from 'uikit-3it-react'
import { useCurrentBreadcrumb } from '@/hooks'
import { useStoreRoles } from '@/stores'
import { 
  getSelectModuleAction, 
  getRoleByIdFormAction, 
  mutationCreateRoleFormAction, 
  mutationUpdateRoleFormAction 
} from '@/actions'
import type { 
  RoleForm,
  SubModuleRoleForm
} from '@/interfaces'
import { initialRoleForm, initialRoleFormModules } from '@/factories'
import { roleRules } from '@/rules'
import messages from '@/messages/messages'

// Utils
const { 
  validateDefault, 
} = utils.createValidator()
const { 
  inputOnlyLettersAndNumbers
} = utils.createInputMask()
const {
  messageAlertDefault,
  messageToastCreateUpdate
} = utils.createMessage()

export default function UsersFormPage() {
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
    roleForm,
    setRoleForm,
    errorBack,
  } = useStoreRoles(
    useShallow((state) => ({
      messageAlert: state.messageAlert,
      setMessageAlert: state.setMessageAlert,
      roleForm: state.roleForm,
      setRoleForm: state.setRoleForm,
      errorBack: state.errorBack,
      setErrorBack: state.setErrorBack
    }))
  )

  // ============================================================
  // 3. SERVER STATE (QUERIES)
  // ============================================================
  const queryClient = useQueryClient()

  const selectModules = useQuery({
    queryKey: ['selectorModules'],
    queryFn: () => getSelectModuleAction(),
    staleTime: 30_000
  })

  const roleFormQuery = useQuery({
    queryKey: ['roleById', id],
    queryFn: () => getRoleByIdFormAction(Number(id)),
    enabled: id != null,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true 
  })

  const mutationCreateRoleForm = useMutation({
    mutationFn: (payload: RoleForm) => mutationCreateRoleFormAction(payload),
    onSuccess: () => {
      handleFormSuccess()
      queryClient.invalidateQueries({ queryKey: ['roles', 'role'] })
    }
  })

  const mutationUpdateRoleForm = useMutation({
    mutationFn: (payload: RoleForm) => mutationUpdateRoleFormAction(payload),
    onSuccess: () => {
      handleFormSuccess()
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  // ============================================================
  // 4. LOCAL STATE
  // ============================================================
  const [toast, setToast] = useState<ToastCore>({ variant: 'info', title: '', message: '', code: '' })
  const [errorForm, setErrorForm] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [modulePermissions, setModulePermissions] = useState<SubModuleRoleForm[]>([])

  // ============================================================
  // 5. CUSTOM HOOKS
  // ============================================================
  const { isValid, errors } = hooks.useRules(roleForm, roleRules)

  // ============================================================
  // 6. DERIVED STATE & MEMOIZED VALUES
  // ============================================================
  const controlFormPending = useMemo(() => {
    return mutationCreateRoleForm.isPending || mutationUpdateRoleForm.isPending
  }, [mutationCreateRoleForm.isPending, mutationUpdateRoleForm.isPending])

  const controlFormSuccess = useMemo(() => {
    return mutationCreateRoleForm.isSuccess || mutationUpdateRoleForm.isSuccess
  }, [mutationCreateRoleForm.isSuccess, mutationUpdateRoleForm.isSuccess])

  const displayedModules = useMemo((): SubModuleRoleForm[] => {
    if (!roleForm.subModules?.length) return []
    
    // Crear un mapa de permisos guardados por ID
    const permissionsById = new Map(
      modulePermissions.map(p => [p.id, p])
    )
    
    // Mapear subModules a SubModuleRoleForm
    return roleForm.subModules.map((opt): SubModuleRoleForm => {
      const id = opt.id ?? null
      const name = opt.name
      
      // Si ya tenemos permisos guardados para este módulo, usarlos
      const savedPermissions = id ? permissionsById.get(id) : null
      if (savedPermissions) {
        return { ...savedPermissions, name }
      }
      
      // Si no, usar valores por defecto
      return { ...initialRoleFormModules, id, name }
    })
  }, [roleForm.subModules, modulePermissions])

  // ============================================================
  // 7. INITIALIZATION EFFECTS
  // ============================================================
  useEffect(() => {
    const data = roleFormQuery.data ?? initialRoleForm
    setRoleForm(data)
    // Inicializar permisos si estamos editando
    if (data.subModules) {
      // En runtime, subModules tiene los permisos aunque el tipo diga SelectOption[]
      const permissions = data.subModules.map(sm => {
        const smWithPerms = sm as SelectOption & Partial<SubModuleRoleForm>
        return {
          ...initialRoleFormModules,
          id: sm.id ?? null,
          name: sm.name ?? '',
          canRead: smWithPerms.canRead ?? true,
          canCreate: smWithPerms.canCreate ?? false,
          canUpdate: smWithPerms.canUpdate ?? false,
          canDelete: smWithPerms.canDelete ?? false,
        }
      })
      setModulePermissions(permissions)
    } else {
      setModulePermissions([])
    }
  }, [roleFormQuery.data, setRoleForm])

  useEffect(() => {
    setMessageAlert(messageAlertDefault(messages.role, errorForm, 'USR_FORM'))
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
      messages.role,
      Number(id),
      !!errorBack
    ))
    toastRef.current?.handleShowToast()
  }, [id, errorBack])

  const handleFormSuccess = useCallback(() => {
    handleToastShow()
    setRoleForm(initialRoleForm)
    setTimeout(() => navigate('/roles'), 3000)
  }, [handleToastShow, setRoleForm, navigate])

  // Handlers de formulario
  const handleValueName = useCallback((value: string) => {
    setRoleForm({ name: value })
  }, [setRoleForm])

  const handleValueDescription = useCallback((value: string) => {
    setRoleForm({ description: value })
  }, [setRoleForm])

  const handleSelectModule = (value: SelectOption[]) => {
    setRoleForm({ subModules: value })
    
    // Sincronizar modulePermissions: mantener solo los módulos que siguen seleccionados
    setModulePermissions(prev => {
      const selectedIds = new Set(value.map(v => v.id))
      return prev.filter(p => p.id !== null && p.id !== undefined && selectedIds.has(p.id))
    })
  }

  const handlePermissionChange = useCallback((
    moduleId: number | null,
    permission: 'canRead' | 'canCreate' | 'canUpdate' | 'canDelete'
  ) => {
    setModulePermissions((prev) => {
      const existingIndex = prev.findIndex(p => p.id === moduleId)
      
      if (existingIndex >= 0) {
        // Módulo existe: invertir el permiso
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          [permission]: !updated[existingIndex][permission]
        }
        return updated
      }
      
      // Módulo nuevo: obtener valor actual e invertirlo
      const currentModule = displayedModules.find(m => m.id === moduleId)
      return [...prev, {
        ...initialRoleFormModules,
        id: moduleId,
        [permission]: !currentModule?.[permission]
      }]
    })
  }, [displayedModules])

  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      setErrorForm(true)
      return
    }
    try {
      // Asegurar que todos los módulos seleccionados tengan permisos (incluso los no modificados)
      const allModulesWithPermissions = displayedModules.map(module => ({
        id: module.id,
        name: module.name,
        description: module.description,
        canRead: true,
        canCreate: module.canCreate,
        canUpdate: module.canUpdate,
        canDelete: module.canDelete
      }))

      const data_: RoleForm = {
        ...roleForm,
        subModules: allModulesWithPermissions as unknown as SelectOption[]
      }
      
      if (id) await mutationUpdateRoleForm.mutateAsync(data_)
      else await mutationCreateRoleForm.mutateAsync(data_)
    } catch (error) {
      console.error('Error submitting form', error)
    }
  }, [isValid, id, roleForm, displayedModules, mutationUpdateRoleForm, mutationCreateRoleForm])

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
      {roleFormQuery.isFetching ? (
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
                className="col-12"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  Nombre
                </label>
                <Input
                  type="text"
                  value={roleForm.name}
                  validation={validateDefault}
                  inputMask={inputOnlyLettersAndNumbers}
                  placeholder="Ingresa un nombre"
                  requiredField={errors.name?.required}
                  error={errorForm}
                  submitted={submitted}
                  onValueChange={handleValueName}
                />
                <FieldError
                  errorForm={errorForm}
                  errorMessage={errors.name?.message}
                />
              </div>
            </div>

            <div className="row">
              <div 
                className="col-12"
                data-eit-mb="3"
              >
                <label data-eit-color="text">
                  Descripción
                </label>
                  <TextareaResize
                    type="text"
                    value={roleForm.description}
                    inputMask={inputOnlyLettersAndNumbers}
                    maxLength={200}
                    placeholder="Ingresa una descripción"
                    requiredField={errors.description?.required}
                    submitted={submitted}
                    onValueChange={handleValueDescription}
                  />
                  <FieldError
                    errorForm={errorForm}
                    errorMessage={errors.description?.message}
                  />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h5 
                  data-eit-font-size="x5"
                  data-eit-font-weight="500"
                  data-eit-color="blue"
                  data-eit-mt="0"
                  data-eit-mb="1"
                >
                  Módulos
                </h5>
                <p 
                  data-eit-color="text-soft"
                  data-eit-my="0"
                >
                  Un rol de usuario no quedará activo, hasta asociarle al menos un <strong data-eit-color="text">módulo.</strong>
                </p>
                <div 
                  data-eit-border="all"
                  data-eit-border-color="blue"
                  data-eit-border-radius="x3"
                  data-eit-p="3"
                  data-eit-mb="3"
                >
                  <Select
                    data={selectModules.data?.data}
                    selected={roleForm.subModules}
                    validation={validateDefault}
                    requiredField={errors.subModules?.required}
                    error={errorForm}
                    submitted={submitted}
                    onValueChange={handleSelectModule}
                    isDisabled={selectModules.isFetching}
                    isMulti={true}
                  />
                    <FieldError
                      errorForm={errorForm}
                      errorMessage={errors.subModules?.message}
                    />
                </div>
              </div>
            </div>

            {displayedModules.length === 0 ? (
              <Alert
                data-eit-mb="3"
                data-eit-variant="light"
                icon={icons.info}
                message="Los permisos del módulo aparecerán aquí <strong>cuando lo selecciones.</strong>"
              />
            ) : (
              <>            
                <h5 
                  data-eit-font-size="x3"
                  data-eit-font-weight="500"
                  data-eit-color="text"
                  data-eit-mt="0"
                  data-eit-mb="1"
                >
                  Permisos de módulo
                </h5>
                <p 
                  data-eit-font-size="x2"
                  data-eit-color="text-soft"
                  data-eit-mt="0"
                  data-eit-mb="1"
                >
                  Agrega o quita  <strong data-eit-color="text">permisos específicos</strong> para este rol.
                </p>
                <div className="d-flex flex-column gap-2">
                  {displayedModules.map((item) => (
                    <div 
                      key={item.id}
                      className="eit-box-shadow"
                      data-eit-variant='center'
                      data-eit-border-radius="x3"
                      data-eit-mb="3"
                      data-eit-p="3"
                    >
                      <h5 
                        data-eit-color="text"
                        data-eit-font-size="x4"
                        data-eit-font-weight="500"
                        data-eit-my="0"
                      >
                        <FaIcon name="borderAll" 
                          data-eit-color="text"
                        />
                        { item.name }
                      </h5>

                      <div
                        data-eit-display="flex"
                        data-eit-flex-wrap='wrap'
                        data-eit-gap="2"
                      >
                        <div
                          key={`${item.id}-read`}
                          data-eit-flex="col"
                          data-eit-border="all"
                          data-eit-border-color="default"
                          data-eit-border-radius="x3"
                          data-eit-p="2"
                        >
                          <label 
                            className="eit-cursor--pointer"
                            data-eit-display='flex'
                            data-eit-justify='between'
                            data-eit-align='center'
                          >
                            <span 
                              data-eit-display='flex'
                              data-eit-flex-wrap='nowrap'
                              data-eit-color='text-soft'
                              data-eit-me="2"
                            >
                              <FaIcon name="eye" 
                                data-eit-font-size="x4"
                                data-eit-color="text-soft"
                                data-eit-me="2"
                              /> 
                              Ver
                            </span>
                            <span className="eit-switch">
                              <input
                                type="checkbox"
                                className="eit-switch__input"
                                checked={item.canRead}
                                disabled
                                onChange={() => handlePermissionChange(item.id ?? null, 'canRead')}
                              />
                              <span className="eit-switch__slider"></span>
                            </span>
                          </label>
                        </div>

                        <div
                          key={`${item.id}-create`}
                          data-eit-flex="col"
                          data-eit-border="all"
                          data-eit-border-color="default"
                          data-eit-border-radius="x3"
                          data-eit-p="2"
                        >
                          <label 
                            className="eit-cursor--pointer"
                            data-eit-display='flex'
                            data-eit-justify='between'
                            data-eit-align='center'
                          >
                            <span 
                              data-eit-display='flex'
                              data-eit-flex-wrap='nowrap'
                              data-eit-color='text-soft'
                              data-eit-me="2"
                            >
                              <FaIcon name="squarePlus" 
                                data-eit-font-size="x4"
                                data-eit-color="text-soft"
                                data-eit-me="2"
                              /> 
                              Crear
                            </span>
                            <span className="eit-switch">
                              <input
                                type="checkbox"
                                className="eit-switch__input"
                                checked={item.canCreate}
                                onChange={() => handlePermissionChange(item.id ?? null, 'canCreate')}
                              />
                              <span className="eit-switch__slider"></span>
                            </span>
                          </label>
                        </div>

                        <div
                          key={`${item.id}-update`}
                          data-eit-flex="col"
                          data-eit-border="all"
                          data-eit-border-color="default"
                          data-eit-border-radius="x3"
                          data-eit-p="2"
                        >
                          <label 
                            className="eit-cursor--pointer"
                            data-eit-display='flex'
                            data-eit-justify='between'
                            data-eit-align='center'
                          >
                            <span 
                              data-eit-display='flex'
                              data-eit-flex-wrap='nowrap'
                              data-eit-color='text-soft'
                              data-eit-me="2"
                            >
                              <FaIcon name="squarePen" 
                                data-eit-font-size="x4"
                                data-eit-color="text-soft"
                                data-eit-me="2"
                              /> 
                              Editar
                            </span>
                            <span className="eit-switch">
                              <input
                                type="checkbox"
                                className="eit-switch__input"
                                checked={item.canUpdate}
                                onChange={() => handlePermissionChange(item.id ?? null, 'canUpdate')}
                              />
                              <span className="eit-switch__slider"></span>
                            </span>
                          </label>
                        </div>

                        <div
                          key={`${item.id}-delete`}
                          data-eit-flex="col"
                          data-eit-border="all"
                          data-eit-border-color="default"
                          data-eit-border-radius="x3"
                          data-eit-p="2"
                        >
                          <label 
                            className="eit-cursor--pointer"
                            data-eit-display='flex'
                            data-eit-justify='between'
                            data-eit-align='center'
                          >
                            <span 
                              data-eit-display='flex'
                              data-eit-flex-wrap='nowrap'
                              data-eit-color='text-soft'
                              data-eit-me="2"
                            >
                              <FaIcon name="trashCan" 
                                data-eit-font-size="x4"
                                data-eit-color="text-soft"
                                data-eit-me="2"
                              /> 
                              Eliminar
                            </span>
                            <span className="eit-switch">
                              <input
                                type="checkbox"
                                className="eit-switch__input"
                                checked={item.canDelete}
                                onChange={() => handlePermissionChange(item.id ?? null, 'canDelete')}
                              />
                              <span className="eit-switch__slider"></span>
                            </span>
                          </label>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </>
            )}

            <Error
              data-eit-mb="3"
              data={errorBack?.response?.data?.error?.errorFields}
            />

            <div 
              data-eit-display="flex"
              data-eit-justify="end"
            >
              <Button
                text="Guardar usuario"
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