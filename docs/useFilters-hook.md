# useFilters Hook - Guía de Uso

## Descripción

El hook `useFilters` es una versión React del composable de Vue que permite sincronizar filtros con la URL y convertir entre representación visual y valores de ruta. Está optimizado para trabajar con React Router DOM v7 y React 19.

## Características

- ✅ **Sincronización con URL**: Los filtros se sincronizan automáticamente con los query parameters de la URL
- ✅ **Sincronización al cargar**: Los valores de la URL se cargan en los filtros al montar el componente
- ✅ **Actualización por eventos**: Los filtros solo se aplican a la URL cuando hay un evento de clic (no automáticamente)
- ✅ **Soporte completo de tipos**: Completamente tipado con TypeScript
- ✅ **Compatibilidad**: Funciona con todos los tipos de filtros: Select, Switch, Date, Range

## API

```tsx
const {
  syncFiltersFromUrl,
  mapRouteToFilters,
  mapFiltersToRoute
} = useFilters()
```

### Métodos

#### `syncFiltersFromUrl(filters, setFilters)`
Sincroniza los filtros desde los query parameters de la URL al cargar el componente (solo una vez).

**Parámetros:**
- `filters: FiltersCore` - Estado inicial de los filtros
- `setFilters: (filters: FiltersCore) => void` - Función para actualizar los filtros

#### `mapRouteToFilters(elements, filters)`
Mapea los valores de la URL hacia los elementos de filtro (actualiza los elementos visual).

**Parámetros:**
- `elements: FilterElement[]` - Array de elementos de filtro
- `filters: FiltersCore` - Estado actual de los filtros

#### `mapFiltersToRoute(elements)`
Convierte los filtros seleccionados a formato de query parameters y actualiza la URL.

**Parámetros:**
- `elements: FilterElement[]` - Array de elementos de filtro

## Ejemplo de Uso Completo

```tsx
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useFilters } from '@/hooks'
import type { FiltersCore, FilterElement } from 'uikit-3it-react'

function MyComponent() {
  const { 
    syncFiltersFromUrl, 
    mapRouteToFilters, 
    mapFiltersToRoute 
  } = useFilters()

  // Estado inicial de filtros
  const initialFilters = useMemo(() => ({
    status: null,
    roleUser: null,
    dateFilter: null,
    startKey: null,
    endKey: null,
    enabled: null
  }), [])

  // Estado de filtros
  const [filters, setFilters] = useState<FiltersCore>(initialFilters)

  // Elementos de filtro
  const filterElements = useMemo<FilterElement[]>(() => [
    {
      key: 'status',
      type: 'select',
      label: 'Estado',
      data: statusOptions,
      selected: null
    },
    {
      key: 'enabled',
      type: 'switch',
      label: 'Habilitado',
      input: null
    },
    // ... más elementos
  ], [statusOptions])

  // 1. Sincronizar filtros desde URL al cargar el componente (solo una vez)
  useEffect(() => {
    syncFiltersFromUrl(initialFilters, setFilters)
  }, [syncFiltersFromUrl]) // Solo cuando el hook esté listo

  // 2. Mapear filtros desde la URL hacia los elementos al cargar/cambiar
  useEffect(() => {
    mapRouteToFilters(filterElements, filters)
  }, [filterElements, filters, mapRouteToFilters])

  // 3. Función para aplicar filtros (llamar en eventos de clic)
  const handleApplyFilters = useCallback(() => {
    mapFiltersToRoute(filterElements)
  }, [filterElements, mapFiltersToRoute])

  // 4. Función para limpiar filtros
  const handleClearFilters = useCallback(() => {
    // Resetear elementos de filtro
    filterElements.forEach(element => {
      if (element.type === 'select') {
        element.selected = null
      } else if (element.type === 'switch') {
        element.input = null
      } else if (element.type === 'date') {
        element.input = ''
      } else if (element.type === 'range') {
        element.start.input = ''
        element.end.input = ''
      }
    })
    
    // Aplicar cambios a la URL
    mapFiltersToRoute(filterElements)
  }, [filterElements, mapFiltersToRoute])

  return (
    <div>
      <Filters elements={filterElements} />
      <button onClick={handleApplyFilters}>
        Aplicar Filtros
      </button>
      <button onClick={handleClearFilters}>
        Limpiar Filtros
      </button>
    </div>
  )
}
```

## Diferencias con Vue

### Vue (Anterior)
```js
// Vue - Reactivo automático
const { syncFiltersWithRoute, mapRouteToFilters, mapFiltersToRoute } = useFilters()
syncFiltersWithRoute(filters.value) // Se ejecutaba automáticamente
watch(filters, () => updateURL()) // Reactivo automático
```

### React (Nuevo)
```tsx
// React - Control manual con useEffect
const { syncFiltersWithRoute, mapRouteToFilters, mapFiltersToRoute } = useFilters()

useEffect(() => {
  syncFiltersWithRoute(filters, setFilters) // Control manual
}, [filters, syncFiltersWithRoute])

// Actualización manual en eventos de clic
const handleApplyFilters = () => {
  mapFiltersToRoute(filterElements) // Solo cuando el usuario hace clic
}
```

## Notas Importantes

1. **No sincronización automática**: A diferencia de Vue, los filtros NO se sincronizan automáticamente con la URL. Esto es intencional para mejor rendimiento y control del usuario.

2. **Eventos de clic**: Los filtros solo se aplican a la URL cuando se llama explícitamente a `mapFiltersToRoute()`, típicamente en un evento de clic de botón.

3. **Sincronización al cargar**: La sincronización desde URL hacia filtros SÍ ocurre automáticamente al cargar el componente.

4. **Evitar bucles infinitos**: 
   - Usa `initialFilters` constante en `syncFiltersFromUrl()`
   - No incluyas `filters` como dependencia en el `useEffect` de sincronización inicial
   - El hook maneja internamente la prevención de bucles

5. **Preservación en refresh**: Los parámetros de URL se preservan automáticamente al hacer refresh del navegador.

## Correcciones de Problemas Comunes

### ❌ Maximum update depth exceeded
**Problema**: Bucle infinito en `useEffect`
```tsx
// MAL - Causa bucle infinito
useEffect(() => {
  syncFiltersFromUrl(filters, setFilters) // ❌ filters cambia → re-ejecuta
}, [filters, syncFiltersFromUrl])
```

**Solución**: Usa filtros iniciales constantes
```tsx
// BIEN - Solo se ejecuta una vez
const initialFilters = useMemo(() => ({ ...defaultFilters }), [])

useEffect(() => {
  syncFiltersFromUrl(initialFilters, setFilters) // ✅ initialFilters no cambia
}, [syncFiltersFromUrl])
```

### ❌ URL se limpia en refresh
**Problema**: Los parámetros se pierden al recargar
**Solución**: El hook ahora preserva automáticamente los parámetros existentes

### ❌ URLs de fechas codificadas y mal formateadas
**Problema**: URLs como `?dateFilter=2025%2F09%2F10` con encoding y formato incorrecto
```tsx
// MAL - Encoding de barras y formato confuso
?dateFilter=2025%2F09%2F10&endDate=2025%2F10%2F15

// BIEN - Formato limpio estándar ISO
?dateFilter=2025-10-09&endDate=2025-10-15
```
**Solución**: Usar formato `YYYY-MM-DD` (ISO 8601) para fechas en URL

## Tipos Soportados

- **SelectFilter**: Filtros de selección (dropdown, multi-select)
- **SwitchFilter**: Filtros de toggle/switch
- **DateFilter**: Filtros de fecha
- **RangeFilter**: Filtros de rango de fechas

## Migración desde Vue

Si estás migrando desde el composable de Vue:

1. Cambia `syncFiltersWithRoute(filters.value)` por `useEffect(() => syncFiltersWithRoute(filters, setFilters), [...])`
2. Cambia las llamadas directas a funciones por llamadas en `useEffect` o event handlers
3. Agrega las dependencias correctas a los arrays de `useEffect`
4. Usa `useState` en lugar de `ref` para el estado de filtros