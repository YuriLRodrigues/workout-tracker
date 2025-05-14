import { Pagination } from '@/components/ui/pagination'

import { findWorkoutsHistoryByUserId } from '@/http/kubb-gen'

type PaginationHistoryProps = {
  page?: number
  limit?: number
  query?: string
}

export const PaginationHistory = async (props: PaginationHistoryProps) => {
  const { limit, page, query } = props
  const { meta } = await findWorkoutsHistoryByUserId(
    { params: { limit, page, query } },
    { next: { tags: ['findWorkoutsHistoryByUserId'] } },
  )

  if (meta?.perPage > meta?.totalCount) return null

  return (
    <Pagination
      page={meta.page || 1}
      totalCount={meta.totalCount || 0}
      totalPages={meta.totalPages || 0}
      perPage={meta.perPage || 0}
    />
  )
}
