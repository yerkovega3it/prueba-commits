import { useEffect, type RefObject } from 'react'

export default function useOutsideClick(
  elementRef: RefObject<HTMLElement>,
  callback: () => void
): void {
  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      const target = event.target as Node
      if (elementRef.current && !elementRef.current.contains(target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [elementRef, callback])
}
