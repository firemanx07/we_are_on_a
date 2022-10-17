import { useEffect, useState } from 'react'

const useSearchDebounce = (delay = 350) => {
  const [search, setSearch] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay)
    return () => clearTimeout(delayFn)
  }, [searchQuery, delay])

  return { search, searchQuery, setSearchQuery }
}
export default useSearchDebounce
