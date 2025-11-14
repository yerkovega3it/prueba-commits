import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { 
  FiltersCore, 
  FilterElement,
  SelectFilter, 
  SwitchFilter, 
  DateFilter, 
  RangeFilter 
} from 'uikit-3it-react'

// Configurar dayjs
dayjs.extend(customParseFormat)
dayjs.locale('es')

type FilterOutputValue = string | boolean | null

const formatDatePicker = (value: string | Date): string => {
  if (typeof value === 'string') {
    const parsed = dayjs(value, ['YYYY-MM-DD', 'DD/MM/YYYY'], true)
    return parsed.isValid() ? parsed.format('DD/MM/YYYY') : ''
  }
  return dayjs(value).format('DD/MM/YYYY')
}

const formatDateForUrl = (date: string | Date): string => {
  if (typeof date === 'string') {
    const parsed = dayjs(date, ['DD/MM/YYYY', 'YYYY-MM-DD'], true)
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : 'Invalid Date'
  }
  return dayjs(date).format('YYYY-MM-DD')
}

const parseBoolean = (value: unknown): boolean | null => {
  if (value === 'true' || value === true) return true
  if (value === 'false' || value === false) return false
  return null
}

const isSelectFilter = (element: FilterElement): element is SelectFilter => {
  return element.type === 'select'
}
const isSwitchFilter = (element: FilterElement): element is SwitchFilter => {
  return element.type === 'switch'
}
const isDateFilter = (element: FilterElement): element is DateFilter => {
  return element.type === 'date'
}
const isRangeFilter = (element: FilterElement): element is RangeFilter => {
  return element.type === 'range'
}

/**
 * Hook para sincronizar filtros con la URL y convertirlos entre representación visual y valores de ruta.
 *
 * Incluye utilidades para:
 * - Sincronizar `filters` reactivos con `searchParams` (`syncFiltersFromUrl`).
 * - Mapear valores desde la URL hacia los filtros (`mapRouteToFilters`).
 * - Convertir filtros seleccionados a formato de query y actualizar estado local (`mapFiltersToRoute`).
 *
 * @example
 * ```tsx
 * import { useFilters } from '@/hooks'
 * import { useState, useEffect, useCallback, useMemo } from 'react'
 * 
 * function MyComponent() {
 *   const { 
 *     syncFiltersFromUrl, 
 *     mapRouteToFilters, 
 *     mapFiltersToRoute
 *   } = useFilters()
 * 
 *   const [filters, setLocalFilters] = useState<FiltersCore>({ })
 *   const filterElements = useMemo<FilterElement[]>(() => [...], [])
 * 
 *   // Sincronizar filtros con la URL al cargar el componente
 *   useEffect(() => {
 *     syncFiltersFromUrl(filters, setLocalFilters)
 *   }, [])
 * 
 *   // Mapear filtros desde la URL hacia los elementos de filtro al cargar
 *   useEffect(() => {
 *     mapRouteToFilters(filterElements, setLocalFilters)
 *   }, [filterElements])
 * 
 *   // Función para aplicar filtros - solo actualiza URL
 *   const handleApplyFilters = useCallback(() => {
 *     mapFiltersToRoute(filterElements)
 *   }, [filterElements, mapFiltersToRoute])
 * 
 *   // Función para aplicar filtros y actualizar estado local
 *   const handleApplyFiltersWithState = useCallback(() => {
 *     mapFiltersToRoute(filterElements, setLocalFilters, true) // resetPage = true
 *   }, [filterElements, mapFiltersToRoute])
 * 
 *   return (
 *     <>
 *       <button onClick={handleApplyFilters}>
 *         Aplicar Filtros (Solo URL)
 *       </button>
 *       <button onClick={handleApplyFiltersWithState}>
 *         Aplicar Filtros (URL + Estado)
 *       </button>
 *     </>
 *   )
 * }
 * ```
 */

export default function useFilters(): {
  syncFiltersFromUrl: <T extends FiltersCore>(filters: T, setFilters: (filters: T) => void) => void
  mapRouteToFilters: <T extends FiltersCore>(elements: FilterElement[], setFilters?: React.Dispatch<React.SetStateAction<T>>) => boolean
  mapFiltersToRoute: <T extends FiltersCore>(elements: FilterElement[], setFilters?: React.Dispatch<React.SetStateAction<T>>, resetPage?: boolean) => void
} {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const syncFiltersFromUrl = useCallback(
    <TFilters extends FiltersCore>(initialFilters: TFilters, setFilters: (filters: TFilters) => void) => {
      const updatedFilters: TFilters = { ...initialFilters }
      let hasChanges = false
      
      for (const [key, value] of searchParams.entries()) {
        if (key in initialFilters && value !== initialFilters[key]) {
          // @ts-expect-error - Dynamic key access
          updatedFilters[key] = value
          hasChanges = true
        }
      }
      
      if (hasChanges) {
        setFilters(updatedFilters)
      }
    },
    [searchParams]
  )
  
  const handleSelectToFilter = (element: SelectFilter, value: unknown): void => {
    if (!value) {
      element.selected = null
      return
    }
    if (typeof value === 'string' && value.includes(',')) {
      const selectedValues = value.split(',').map(v => v.trim())
      element.selected = element.data.filter(item =>
        selectedValues.includes(String(item.id))
      )
      return
    }
    const selected = element.data.find(option =>
      'status' in option
        ? String(option.status) === String(value)
        : String(option.id) === String(value)
    )
    element.selected = selected ?? null
  }

  const handleSwitchToFilter = (element: SwitchFilter, value: unknown): void => {
    element.input = parseBoolean(value)
  }

  const handleDateToFilter = (element: DateFilter, value: unknown): void => {
    element.input = typeof value === 'string' || value instanceof Date
      ? formatDatePicker(value)
      : ''
  }

  const handleSelectToRoute = (
    element: SelectFilter,
    update: (key: string, value: FilterOutputValue) => void
  ): void => {
    let selected: string | null = null

    if (Array.isArray(element.selected)) {
      selected = element.selected
        .map(item => item?.id)
        .filter(id => id !== undefined && id !== null)
        .join(',')
    } else if (element.selected !== null && element.selected !== undefined) {
      selected =
        'status' in element.selected && element.selected.status !== undefined
          ? String(element.selected.status)
          : String(element.selected.id)
    }

    update(element.key, selected)
  }

  const handleSwitchToRoute = (
    element: SwitchFilter,
    update: (key: string, value: FilterOutputValue) => void
  ): void => {
    const value = element.input === true ? 'true' : null
    update(element.key, value)
  }

  const handleDateToRoute = (
    element: DateFilter,
    update: (key: string, value: FilterOutputValue) => void
  ): void => {
    const formatted = element.input && typeof element.input !== 'number'
      ? formatDateForUrl(element.input)
      : null
    update(element.key, formatted)
  }

  const handleRangeToRoute = (
    element: RangeFilter,
    update: (key: string, value: FilterOutputValue) => void
  ): void => {
    const { start, end } = element

    const startValue = start.input && typeof start.input !== 'number'
      ? formatDateForUrl(start.input)
      : null

    const endValue = end.input && typeof end.input !== 'number'
      ? formatDateForUrl(end.input)
      : null

    if (start.key) update(start.key, startValue)
    if (end.key) update(end.key, endValue)
  }

  const mapRouteToFilters = useCallback(
    <TFilters extends FiltersCore>(
      elements: FilterElement[], 
      setFilters?: React.Dispatch<React.SetStateAction<TFilters>>
    ): boolean => {
      let hasChanges = false
      
      elements.forEach(element => {
        const value = searchParams.get(element.key)
        
        if (isSelectFilter(element)) {
          const currentSelected = element.selected
          handleSelectToFilter(element, value)
          if (currentSelected !== element.selected) hasChanges = true
          return
        }
        
        if (isSwitchFilter(element)) {
          const currentInput = element.input
          handleSwitchToFilter(element, value)
          if (currentInput !== element.input) hasChanges = true
          return
        }
        
        if (isDateFilter(element)) {
          const currentInput = element.input
          handleDateToFilter(element, value)
          if (currentInput !== element.input) hasChanges = true
          return
        }
        
        if (isRangeFilter(element)) {
          const currentStartInput = element.start.input
          const currentEndInput = element.end.input
          
          const startValue = searchParams.get(element.start.key || '')
          const endValue = searchParams.get(element.end.key || '')
          
          if (startValue) {
            element.start.input = formatDatePicker(startValue)
          }
          if (endValue) {
            element.end.input = formatDatePicker(endValue)
          }
          
          if (currentStartInput !== element.start.input || currentEndInput !== element.end.input) {
            hasChanges = true
          }
        }
      })
      
      if (hasChanges && setFilters) {
        setFilters(prev => {
          const updated = { ...prev } as TFilters
          
          elements.forEach(element => {
            if (isSelectFilter(element)) {
              // @ts-expect-error - Dynamic key access
              updated[element.key] = element.selected
            } else if (isSwitchFilter(element)) {
              // @ts-expect-error - Dynamic key access
              updated[element.key] = element.input
            } else if (isDateFilter(element)) {
              // @ts-expect-error - Dynamic key access
              updated[element.key] = element.input
            } else if (isRangeFilter(element)) {
              if (element.start.key) {
                // @ts-expect-error - Dynamic key access
                updated[element.start.key] = element.start.input
              }
              if (element.end.key) {
                // @ts-expect-error - Dynamic key access
                updated[element.end.key] = element.end.input
              }
            }
          })
          
          return updated
        })
      }
      
      return hasChanges
    },
    [searchParams]
  )

  const mapFiltersToRoute = useCallback(<TFilters extends FiltersCore>(
    elements: FilterElement[],
    setFilters?: React.Dispatch<React.SetStateAction<TFilters>>,
    resetPage: boolean = false
  ): void => {
      const newParams = new URLSearchParams(searchParams)

      const updateFilter = (key: string, value: FilterOutputValue) => {
        if (value === '' || value === null || value === undefined) {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      }

      elements.forEach(element => {
        if (isSelectFilter(element)) {
          handleSelectToRoute(element, updateFilter)
          return
        }

        if (isSwitchFilter(element)) {
          handleSwitchToRoute(element, updateFilter)
          return
        }

        if (isDateFilter(element)) {
          handleDateToRoute(element, updateFilter)
          return
        }

        if (isRangeFilter(element)) {
          handleRangeToRoute(element, updateFilter)
        }
      })

      // Ordenar parámetros con page primero
      const orderedParams = new URLSearchParams()
    
      // Si resetPage es true, forzar page=1, sino preservar el valor existente
      const pageValue = resetPage ? '1' : newParams.get('page')
      if (pageValue) {
        orderedParams.set('page', pageValue)
      }
      
      // Agregar el resto de parámetros excepto page
      for (const [key, value] of newParams.entries()) {
        if (key !== 'page') {
          orderedParams.set(key, value)
        }
      }
      
      setSearchParams(orderedParams, { replace: true })

      // Si se proporciona setFilters, actualizar también el estado local
      if (setFilters) {
        setFilters(prev => {
          const updated = { ...prev } as TFilters
          
          elements.forEach(element => {
            if (isSelectFilter(element)) {
              // @ts-expect-error - Dynamic key access
              updated[element.key] = element.selected
            } else if (isSwitchFilter(element)) {
              // @ts-expect-error - Dynamic key access
              updated[element.key] = element.input
            } else if (isDateFilter(element)) {
              // @ts-expect-error - Dynamic key access
              updated[element.key] = element.input
            } else if (isRangeFilter(element)) {
              if (element.start.key) {
                // @ts-expect-error - Dynamic key access
                updated[element.start.key] = element.start.input
              }
              if (element.end.key) {
                // @ts-expect-error - Dynamic key access
                updated[element.end.key] = element.end.input
              }
            }
          })
          
          return updated
        })
      }
    },
    [searchParams, setSearchParams]
  )

  return { 
    syncFiltersFromUrl,
    mapRouteToFilters,
    mapFiltersToRoute
  }
}