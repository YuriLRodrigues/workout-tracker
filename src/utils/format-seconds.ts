export const formatSeconds = (seconds: number): string => {
  const isNegative = seconds < 0
  let absSeconds = Math.abs(seconds)

  const hours = Math.floor(absSeconds / 3600)
  absSeconds %= 3600
  const minutes = Math.floor(absSeconds / 60)
  const remainingSeconds = Math.floor(absSeconds % 60)

  const parts = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}min`)
  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    parts.push(`${remainingSeconds}s`)
  }

  const prefix = isNegative ? '-' : ''
  return prefix + parts.join(' ')
}
