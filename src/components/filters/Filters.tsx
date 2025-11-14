import { useState, useRef, useEffect } from 'react'
import { Input, Select, type FiltersProps } from 'uikit-3it-react'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { es } from 'react-day-picker/locale'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/es'
import '@/components/Components.css'

dayjs.extend(customParseFormat)
dayjs.locale('es')

type CalendarId = string

// Helpers
const fmt = 'DD/MM/YYYY'
function formatDayPicker(date: string | number | Date | null) {
  return dayjs(date).format(fmt)
}
const formatDisabledDayPicker = (date: string | number | Date | null) => {
  return new Date(dayjs(date, fmt).toDate())
}

export default function Filters({ elements = [] }: FiltersProps) {

  // Un solo "quién está abierto" para todos los popovers
  const [openId, setOpenId] = useState<CalendarId | null>(null)
  const popoverRefs = useRef<Record<CalendarId, HTMLDivElement | null>>({})

  const setPopoverRef = (id: CalendarId) => (el: HTMLDivElement | null) => {
    popoverRefs.current[id] = el
  }
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!openId) return
      const current = popoverRefs.current[openId]
      if (!current) return
      if (current.contains(e.target as Node)) return
      setOpenId(null)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [openId])

  return (
    <div data-eit-mt="3">
      <div
        data-eit-display="flex"
        data-eit-flex-direction="column"
        data-eit-gap="2"
      >
        {elements.map((item, index) => {
          const dateId = `date-${index}`
          const rangeStartId = `range-${index}-start`
          const rangeEndId = `range-${index}-end`

          return (
            <div key={index}>
              {item.type === 'select' && (
                <div data-eit-flex="fill">
                  <label data-eit-color="text">{item.filter}</label>
                  <Select
                    data={item.data}
                    selected={item.selected}
                    isDisabled={item.disabled}
                    onValueChange={item.handle}
                  />
                </div>
              )}

              {item.type === 'date' && (
                <div style={{ position: 'relative' }}>
                  <label data-eit-color="text">Fecha</label>

                  <Input
                    type="text"
                    value={item.input}
                    placeholder={item.placeholder}
                    onClick={() => setOpenId(dateId)}
                    onFocus={() => setOpenId(dateId)}
                    onValueChange={item.handle}
                  />

                  {openId === dateId && (
                    <div
                      ref={setPopoverRef(dateId)}
                      className="eit-day-picker-container"
                    >
                      <DayPicker
                        mode="single"
                        locale={es}
                        selected={formatDisabledDayPicker(item.input)}
                        onSelect={(date) => {
                          if (date) item.handle?.(formatDayPicker(date))
                          setOpenId(null)
                        }}
                        disabled={{before: formatDisabledDayPicker(item.minDate), after: formatDisabledDayPicker(item.maxDate) }}
                        classNames={{
                          day: 'eit-day-picker-day',
                          today: 'eit-day-picker-today',
                          selected: 'eit-day-picker-selected',
                          disabled: 'eit-day-picker-disabled'
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {item.type === 'range' && (
                <div data-eit-flex="fill">
                  <h6
                    data-eit-mt="0"
                    data-eit-mb="2"
                    data-eit-color="secondary"
                    data-eit-font-size="x3"
                    data-eit-font-weight="500"
                  >
                    {item.filter}
                  </h6>

                  <div
                    data-eit-display="flex"
                    data-eit-flex-direction="column"
                    data-eit-gap="2"
                    data-eit-p="2"
                    data-eit-border="all"
                    data-eit-border-color="default"
                    data-eit-bg="color-soft"
                    data-eit-border-radius="x3"
                  >
                    {/* Start */}
                    <div
                      data-eit-mb="3"
                      data-eit-flex="fill"
                      style={{ position: 'relative' }}
                    >
                      <Input
                        type="text"
                        value={item.start.input}
                        placeholder={item.start.placeholder}
                        onClick={() => setOpenId(rangeStartId)}
                        onFocus={() => setOpenId(rangeStartId)}
                        onValueChange={item.start.handle}
                      />

                      {openId === rangeStartId && (
                        <div
                          ref={setPopoverRef(rangeStartId)}
                          className="eit-day-picker-container"
                        >
                          <DayPicker
                            mode="single"
                            locale={es}
                            selected={formatDisabledDayPicker(item.start.input)}
                            onSelect={(date) => {
                              if (date) item.start.handle?.(formatDayPicker(date))
                              setOpenId(null)
                            }}
                            disabled={{ after: formatDisabledDayPicker(item.end.input)}}
                            classNames={{
                              day: 'eit-day-picker-day',
                              today: 'eit-day-picker-today',
                              selected: 'eit-day-picker-selected',
                              disabled: 'eit-day-picker-disabled'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* End */}
                    <div
                      data-eit-mb="3"
                      data-eit-flex="fill"
                      style={{ position: 'relative' }}
                    >
                      <Input
                        type="text"
                        value={item.end.input}
                        placeholder={item.end.placeholder}
                        onClick={() => setOpenId(rangeEndId)}
                        onFocus={() => setOpenId(rangeEndId)}
                        onValueChange={item.end.handle}
                      />

                      {openId === rangeEndId && (
                        <div
                          ref={setPopoverRef(rangeEndId)}
                          className="eit-day-picker-container"
                        >
                          <DayPicker
                            mode="single"
                            locale={es}
                            selected={formatDisabledDayPicker(item.end.input)}
                            onSelect={(date) => {
                              if (date) item.end.handle?.(formatDayPicker(date))
                              setOpenId(null)
                            }}
                            disabled={{ before: formatDisabledDayPicker(item.start.input) }}
                            classNames={{
                              day: 'eit-day-picker-day',
                              today: 'eit-day-picker-today',
                              selected: 'eit-day-picker-selected',
                              disabled: 'eit-day-picker-disabled'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {item.type === 'switch' && (
                <div
                  data-eit-display="flex"
                  data-eit-flex-direction="column"
                  data-eit-p="2"
                  data-eit-border="all"
                  data-eit-border-color="default"
                  data-eit-bg="color-soft"
                  data-eit-border-radius="x3"
                >
                  <label
                    className="eit-cursor--pointer"
                    data-eit-display="flex"
                    data-eit-justify="between"
                    data-eit-align="center"
                  >
                    <span data-eit-color="text-soft">{item.filter}</span>
                    <span className="eit-switch">
                      <input
                        type="checkbox"
                        className="eit-switch__input"
                        checked={Boolean(item.input)}
                        onChange={(e) => item.handle?.(e.currentTarget.checked)}
                      />
                      <span className="eit-switch__slider"></span>
                    </span>
                  </label>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}