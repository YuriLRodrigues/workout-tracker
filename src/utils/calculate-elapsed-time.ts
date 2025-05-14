import { differenceInSeconds } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'

type ElapsedTimeParams = {
  startTime?: string | Date
  endTime?: string | Date
}

export const calculateElapsedTime = ({ startTime, endTime }: ElapsedTimeParams) => {
  if (!startTime) {
    return {
      totalSeconds: 0,
      formatted: '0s',
    }
  }

  const timeZone = 'America/Sao_Paulo'

  const startDate = fromZonedTime(new Date(startTime), timeZone)
  const endDate = fromZonedTime(endTime ? new Date(endTime) : new Date(), timeZone)

  const differenceSeconds = differenceInSeconds(endDate, startDate)

  const hours = Math.floor(differenceSeconds / 3600)
  const minutes = Math.floor((differenceSeconds % 3600) / 60)
  const seconds = differenceSeconds % 60

  let formatted = ''
  if (hours > 0) formatted += `${hours}h `
  if (minutes > 0) formatted += `${minutes}min `
  formatted += `${seconds}s`

  return {
    totalSeconds: differenceSeconds,
    formatted: formatted.trim(),
  }
}
