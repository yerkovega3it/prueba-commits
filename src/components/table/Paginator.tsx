import { useState, type ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import type { PaginatorProps } from 'uikit-3it-react'

export default function Paginator({
  data,
  onValueChange 
}: PaginatorProps) {
  const [input, setInput] = useState<number>(1)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value < 1) return setInput(1)
    if (value > data.finalPage) return setInput(data.finalPage)
    setInput(value)
  }
  const nextPage = () => {
    if(input >= data.finalPage) return
    const next = input + 1
    setInput(next)
    onValueChange(next)
  }

  const prevPage = () => {
    if(input <= 1) return
    const prev = input - 1
    setInput(prev)
    onValueChange(prev)
  }

  const handleSelectInput: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    target.select()
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onValueChange(input)
  }

  return (
    <div 
      className="eit-paginator" 
      data-eit-gap="2"
    >
      <button
        onClick={prevPage}
        disabled={data.currentPage <= 1}
        className="eit-btn"
        data-eit-shape="square"
        data-eit-variant="gray"
        data-eit-outline
        aria-label="Página anterior"
        type="button"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <input
        type="number"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleChange}
        onFocus={handleSelectInput}
        className="eit-input eit-paginator__input"
        data-eit-text-align="center"
        data-eit-font-size="x1"
        aria-label="Número de página"
      />

      <span 
        data-eit-color="text" 
        data-eit-font-size="x1"
      >
        de {data.finalPage} {data.finalPage === 1 ? " página" : " páginas"}
      </span>

      <button
        onClick={nextPage}
        disabled={data.currentPage >= data.finalPage}
        className="eit-btn"
        data-eit-shape="square"
        data-eit-variant="gray"
        data-eit-outline
        aria-label="Página siguiente"
        type="button"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
