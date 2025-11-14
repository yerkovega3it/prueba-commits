import { utils, type ValidatorRules } from 'uikit-3it-react'
import type { RoleForm } from '@/interfaces'

const { 
  requiredString,
  requiredObject
} = utils.createRequired()

export const roleRules: ValidatorRules<RoleForm> = {
  name: requiredString('Nombre'),
  subModules: requiredObject('Módulos'),
}