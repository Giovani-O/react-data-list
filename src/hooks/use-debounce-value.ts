import { useEffect, useState } from 'react'

// Debounce observa um input e enquanto valores estiverem sendo inseridos, ele não faz nada.
// Quando a inserção para, ele executa algo após um determinado tempo.
export default function useDebounceValue<T = unknown>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
