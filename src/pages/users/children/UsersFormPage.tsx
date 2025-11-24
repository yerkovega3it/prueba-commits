import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import {
  utils,
  hooks,
  Alert,
  Loading,
  Select,
  FieldError,
  Error,
  Button,
  Toast,
  Input,
  type ToastCore,
  type ToastExpose,
} from "uikit-3it-react";
import { useCurrentBreadcrumb } from "@/hooks";
import { useStoreUsers } from "@/stores";
import {
  getSelectRoleUserAction,
  getUserByIdFormAction,
  mutationCreateUserFormAction,
  mutationUpdateUserFormAction,
} from "@/actions";
import { FaIcon } from "@/components";
import type { UserForm } from "@/interfaces";
import { initialUserForm } from "@/factories";
import { userRules } from "@/rules";
import messages from "@/messages/messages";

// Utils
const { validateDefault, validateEmail, validateRut, validatePhone } =
  utils.createValidator();
const { inputMaskPhone, inputMaskRut, inputOnlyLettersAndNumbers } =
  utils.createInputMask();
const { messageAlertDefault, messageToastCreateUpdate } = utils.createMessage();

export default function UsersFormPage() {
  // ============================================================
  // 1. ROUTING & NAVIGATION
  // ============================================================
  const breadcrumb = useCurrentBreadcrumb();
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const toastRef = useRef<ToastExpose>(null);

  // ============================================================
  // 2. GLOBAL STATE (STORES)
  // ============================================================
  const { messageAlert, setMessageAlert, userForm, setUserForm, errorBack } =
    useStoreUsers(
      useShallow((state) => ({
        messageAlert: state.messageAlert,
        setMessageAlert: state.setMessageAlert,
        userForm: state.userForm,
        setUserForm: state.setUserForm,
        errorBack: state.errorBack,
        setErrorBack: state.setErrorBack,
      }))
    );

  // ============================================================
  // 3. SERVER STATE (QUERIES)
  // ============================================================
  const queryClient = useQueryClient();

  const selectRoleUser = useQuery({
    queryKey: ["selectRoleUser"],
    queryFn: () => getSelectRoleUserAction(),
    staleTime: 30_000,
  });

  const userFormQuery = useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserByIdFormAction(Number(id)),
    enabled: id != null,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  const mutationCreateUserForm = useMutation({
    mutationFn: (payload: UserForm) => mutationCreateUserFormAction(payload),
    onSuccess: async () => {
      handleFormSuccess();
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const mutationUpdateUserForm = useMutation({
    mutationFn: (payload: UserForm) => mutationUpdateUserFormAction(payload),
    onSuccess: () => {
      handleFormSuccess();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // ============================================================
  // 4. LOCAL STATE
  // ============================================================
  const [toast, setToast] = useState<ToastCore>({
    variant: "info",
    title: "",
    message: "",
    code: "",
  });
  const [errorForm, setErrorForm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // ============================================================
  // 5. CUSTOM HOOKS
  // ============================================================
  const { isValid, errors } = hooks.useRules(userForm, userRules);

  // ============================================================
  // 6. DERIVED STATE & MEMOIZED VALUES
  // ============================================================
  const controlFormPending = useMemo(() => {
    return mutationCreateUserForm.isPending || mutationUpdateUserForm.isPending;
  }, [mutationCreateUserForm.isPending, mutationUpdateUserForm.isPending]);

  const controlFormSuccess = useMemo(() => {
    return mutationCreateUserForm.isSuccess || mutationUpdateUserForm.isSuccess;
  }, [mutationCreateUserForm.isSuccess, mutationUpdateUserForm.isSuccess]);

  // ============================================================
  // 7. INITIALIZATION EFFECTS
  // ============================================================
  useEffect(() => {
    setUserForm(userFormQuery.data ?? initialUserForm);
  }, [setUserForm, userFormQuery.data]);

  useEffect(() => {
    setMessageAlert(messageAlertDefault(messages.user, errorForm, "USR_FORM"));
  }, [errorForm, setMessageAlert]);

  useEffect(() => {
    if (id === null || controlFormSuccess) setSubmitted(true);
    else setSubmitted(false);
  }, [controlFormSuccess, id]);

  // ============================================================
  // 8. CALLBACKS & HANDLERS
  // ============================================================
  const handleToastShow = useCallback(() => {
    setToast(messageToastCreateUpdate(messages.user, Number(id), !!errorBack));
    toastRef.current?.handleShowToast();
  }, [id, errorBack]);

  const handleFormSuccess = useCallback(() => {
    handleToastShow();
    setUserForm(initialUserForm);
    setTimeout(() => navigate("/users"), 3000);
  }, [handleToastShow, setUserForm, navigate]);

  // Handlers de formulario
  const handleValueIdentification = useCallback(
    (value: string) => {
      setUserForm({ identification: value });
    },
    [setUserForm]
  );

  const handleSelectedRole = useCallback(
    (value: { id: number; name: string }) => {
      setUserForm({ roleId: value });
    },
    [setUserForm]
  );

  const handleValueFirstName = useCallback(
    (value: string) => {
      setUserForm({ firstName: value });
    },
    [setUserForm]
  );

  const handleValueLastName = useCallback(
    (value: string) => {
      setUserForm({ lastName: value });
    },
    [setUserForm]
  );

  const handleValueEmail = useCallback(
    (value: string) => {
      setUserForm({ email: value });
    },
    [setUserForm]
  );

  const handleValuePhoneNumber = useCallback(
    (value: string) => {
      setUserForm({ phoneNumber: value });
    },
    [setUserForm]
  );

  const handleValueLoginViaSso = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserForm({ loginViaSso: event.target.checked });
    },
    [setUserForm]
  );

  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      setErrorForm(true);
      return;
    }
    try {
      if (id) await mutationUpdateUserForm.mutateAsync(userForm);
      else await mutationCreateUserForm.mutateAsync(userForm);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  }, [isValid, id, userForm, mutationUpdateUserForm, mutationCreateUserForm]);

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
      {userFormQuery.isFetching ? (
        <Loading size="100" data-eit-mb="3" />
      ) : (
        <>
          <form action="">
            <div className="row" data-eit-mb="3">
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
              <div className="col-12 col-lg-6" data-eit-mb="3">
                <label data-eit-color="text">RUT</label>
                <Input
                  type="text"
                  value={userForm.identification}
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
              <div className="col-12 col-lg-6" data-eit-mb="3">
                <label data-eit-color="text">Rol de cuenta</label>
                <Select
                  data={selectRoleUser.data?.data}
                  selected={userForm.roleId}
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
              <div className="col-12 col-lg-6" data-eit-mb="3">
                <label data-eit-color="text">Nombre</label>
                <Input
                  type="text"
                  value={userForm.firstName}
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
              <div className="col-12 col-lg-6" data-eit-mb="3">
                <label data-eit-color="text">Apellido</label>
                <Input
                  type="text"
                  value={userForm.lastName}
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
              <div className="col-12 col-lg-6" data-eit-mb="3">
                <label data-eit-color="text">Correo electrónico</label>
                <Input
                  type="text"
                  value={userForm.email}
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
              <div className="col-12 col-lg-6" data-eit-mb="3">
                <label data-eit-color="text">Teléfono</label>
                <Input
                  type="text"
                  value={userForm.phoneNumber}
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
                data-eit-display="flex"
                data-eit-justify="between"
                data-eit-align="center"
              >
                <span data-eit-color="text-soft">
                  <FaIcon
                    name="circleInfo"
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
                    checked={userForm.loginViaSso}
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

            <div data-eit-display="flex" data-eit-justify="end">
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

          <Toast ref={toastRef} data={toast} position="bottom" visible={5000} />
        </>
      )}
    </>
  );
}
