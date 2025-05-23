'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from './button'

type PaginationProps = {
  page: number
  totalCount: number
  totalPages: number
  perPage: number
}

export const Pagination = ({ page, totalCount, totalPages }: PaginationProps) => {
  const { pathname, createQueryString } = useSearchParams()

  const onPageChange = (page: number) => {
    window.location.replace(`${pathname}?${createQueryString('page', String(page))}`)
  }

  // const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="my-3 flex items-center justify-between gap-y-2 max-sm:flex-col">
      <span className="text-muted-foreground text-sm max-sm:order-last max-sm:text-xs">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 max-sm:justify-between lg:gap-8">
        <div className="hidden text-sm font-medium sm:block">
          Página {page} de {totalPages}
        </div>
        <div className="text-sm font-medium sm:hidden">
          {page} de {totalPages}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => onPageChange(1)} disabled={page <= 1}>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page + 1)}
            disabled={totalPages <= page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(totalPages)}
            disabled={totalPages <= page}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
