import { utils, type ValidatorRules } from 'uikit-3it-react'
import type { ExampleForm } from '@/interfaces'

const { 
  requiredString,
  requiredObject
} = utils.createRequired()

export const exampleRules: ValidatorRules<ExampleForm> = {
  identification: requiredString('RUT'),
  firstName: requiredString('Nombre'),
  lastName: requiredString('Apellido'),
  email: requiredString('Email'),
  roleId: requiredObject('Rol'),
}
