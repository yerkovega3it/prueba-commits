import { icons } from '@/components/icons'

export default {
  user: {
    //Toast
    toastCreate: { title: "Usuario creado con éxito", message: "Puedes ver el nuevo usuario desde la lista de usuarios." },
    toastUpdate: { title: "Usuario editado con éxito", message: "Puedes ver la actualización del usuario desde la lista de usuarios." },
    toastEnabled: { title: "Usuario habilitado", message: "El Usuario ha sido habilitado con éxito." },
    toastDisabled: { title: "Usuario deshabilitado", message: "El usuario ha sido deshabilitado con éxito." },
    toastError: { title: "Hubo un error", message: "Revisa tu conexión a internet o contacta con un administrador." },
    //Alerts
    alertInfo: { title: "Nuevo usuario", message: "Completa la información del usuario.", icon: icons.arrowDown },
    alertError: { title: "Nuevo usuario", message: "Debes <strong>llenar la información</strong> del usuario.", icon: icons.arrowDown },
    alertEnabled: { title: "Habilitar usuario", message: "¿Estás seguro <strong>que quieres habilitar</strong> este usuario?", icon: icons.arrowDown },
    alertDisabled: { title: "Deshabilitar usuario", message: "¿Estás seguro <strong>que quieres deshabilitar</strong> este usuario?", icon: icons.arrowDown },
  },
  role: {
    //Toast
    toastCreate: { title: "Rol creado con éxito", message: "Puedes ver el nuevo rol desde la lista de roles." },
    toastUpdate: { title: "Rol editado con éxito", message: "Puedes ver la actualización del rol desde la lista de roles." },
    toastEnabled: { title: "Rol habilitado", message: "El rol ha sido habilitado con éxito." },
    toastDisabled: { title: "Rol deshabilitado", message: "El rol ha sido deshabilitado con éxito." },
    toastError: { title: "Hubo un error", message: "Revisa tu conexión a internet o contacta con un administrador." },
    //Alerts
    alertInfo: { title: "Nuevo rol", message: "Completa la información del rol.", icon: icons.arrowDown },
    alertError: { title: "Nuevo rol", message: "Debes <strong>llenar la información</strong> del rol.", icon: icons.arrowDown },
    alertEnabled: { title: "Habilitar rol", message: "¿Estás seguro <strong>que quieres habilitar</strong> este rol?", icon: icons.arrowDown },
    alertDisabled: { title: "Deshabilitar rol", message: "¿Estás seguro <strong>que quieres deshabilitar</strong> este rol?", icon: icons.arrowDown },
  },
  example: {
    //Toast
    toastCreate: { title: "Example creado con éxito", message: "Puedes ver el nuevo example desde la lista de examples." },
    toastUpdate: { title: "Example editado con éxito", message: "Puedes ver la actualización del example desde la lista de examples." },
    toastEnabled: { title: "Example habilitado", message: "El example ha sido habilitado con éxito." },
    toastDisabled: { title: "Example deshabilitado", message: "El example ha sido deshabilitado con éxito." },
    toastError: { title: "Hubo un error", message: "Revisa tu conexión a internet o contacta con un administrador." },
    //Alerts
    alertInfo: { title: "Nuevo example", message: "Completa la información del example.", icon: icons.arrowDown },
    alertError: { title: "Nuevo example", message: "Debes <strong>llenar la información</strong> del example.", icon: icons.arrowDown },
    alertEnabled: { title: "Habilitar example", message: "¿Estás seguro <strong>que quieres habilitar</strong> este example?", icon: icons.arrowDown },
    alertDisabled: { title: "Deshabilitar example", message: "¿Estás seguro <strong>que quieres deshabilitar</strong> este example?", icon: icons.arrowDown },
  },
}