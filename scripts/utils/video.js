export function getThumbnailUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function extractVideoId(videoUrl) {
  if (!videoUrl) return null;

  const regex = /embed\/([^?&]+)/;
  const match = videoUrl.match(regex);

  return match ? match[1] : null;
}
