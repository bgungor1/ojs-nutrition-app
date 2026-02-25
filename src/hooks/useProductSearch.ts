import { useGetProductsQuery } from '@/services/productsApi'
import type { ApiProduct } from '@/types/api'
import { useEffect, useMemo, useState } from 'react'

const DEBOUNCE_MS = 300

export function useProductSearch() {
    const [searchQuery, setSearchQuery] = useState('')

    const [debouncedQuery, setDebouncedQuery] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery)
        }, DEBOUNCE_MS)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const { data, isLoading, error } = useGetProductsQuery({ page: 1, limit: 100 })

    const filteredProducts: ApiProduct[] = useMemo(() => {
        if (!debouncedQuery.trim()) return []

        const products = data?.data?.results
        if (!products) return []

        const query = debouncedQuery.toLowerCase().trim()

        return products.filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(query)
            const descMatch = product.short_explanation?.toLowerCase().includes(query)
            return nameMatch || descMatch
        })
    }, [debouncedQuery, data])

    return {
        searchQuery,
        setSearchQuery,
        filteredProducts,
        isLoading,
        hasSearched: debouncedQuery.trim().length > 0,
    }
}