import { utils } from 'uikit-3it-react'
import type { SelectOption } from 'uikit-3it-react'

//Utils
const { formatCapitalize } = utils.createFormat()

export function mapperSelectRoles(result: SelectOption[]) {
  return result
    .filter((item) => item.name !== 'Founder')
    .map((item) => ({                       
      id: item.id,
      name: formatCapitalize(String(item.name)),
    }))
}

export function mapperSelectModules(result: SelectOption[]) {
  return result.map((item) => ({                       
    id: item.id,
    name: formatCapitalize(String(item.name)),
  }))
}

export function mapperSelectCountries(result: SelectOption[]) {
  return result.map((item) => ({                       
    id: item.id,
    name: formatCapitalize(String(item.name)),
  }))
}