import { utils, type ValidatorRules } from 'uikit-3it-react'
import type { UserForm } from '@/interfaces'

const { 
  requiredString,
  requiredObject
} = utils.createRequired()

export const userRules: ValidatorRules<UserForm> = {
  identification: requiredString('RUT'),
  firstName: requiredString('Nombre'),
  lastName: requiredString('Apellido'),
  email: requiredString('Email'),
  roleId: requiredObject('Rol'),
}