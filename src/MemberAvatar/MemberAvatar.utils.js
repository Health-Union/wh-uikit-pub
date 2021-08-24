export function getRelativeDistanceOnSegment(num, segmentStart, segmentEnd) {
  if (segmentEnd <= segmentStart) {
    throw Error("segmentEnd must be greater than segmentStart");
  }
  const segmentSize = segmentEnd - segmentStart;

  return (num - segmentStart) / segmentSize;
}

export function getPictureUrl(picture, imageSize) {
  const sources = getAvailableSources(picture);
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const nextSource = sources[i + 1];
    if (!nextSource) {
      return source.url;
    }
    const dist = getRelativeDistanceOnSegment(
      imageSize,
      source.size,
      nextSource.size
    );
    if (dist <= 0.25) {
      return source.url;
    }
  }
}

export function getAvailableSources(picture) {
  const sources = [];
  if (picture.urls.micro) {
    sources.push({ size: 40, url: picture.urls.micro });
  }
  sources.push({ size: 100, url: picture.urls.thumb });
  if (picture.urls.small) {
    sources.push({ size: 256, url: picture.urls.small });
  }
  sources.push({ size: 350, url: picture.urls.medium });
  return sources;
}
