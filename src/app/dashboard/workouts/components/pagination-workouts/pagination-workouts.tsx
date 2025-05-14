import { Pagination } from '@/components/ui/pagination'

import { findAllWorkoutsByUserId } from '@/http/kubb-gen'

type PaginationWorkoutsProps = {
  page?: number
  limit?: number
}

export const PaginationWorkouts = async (props: PaginationWorkoutsProps) => {
  const { limit, page } = props
  const { meta } = await findAllWorkoutsByUserId(
    { params: { limit, page } },
    { next: { tags: ['findAllWorkoutsByUserId'] } },
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
