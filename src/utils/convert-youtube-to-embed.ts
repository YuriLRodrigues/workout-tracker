export function convertYoutubeToEmbed(url: string): string {
  try {
    const parsedUrl = new URL(url)
    let videoId: string | null = null

    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1)
    } else if (parsedUrl.hostname.includes('youtube.com')) {
      videoId = parsedUrl.searchParams.get('v')
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }

    return 'https://www.youtube.com/embed/'
  } catch {
    return 'https://www.youtube.com/embed/'
  }
}
