export default function Photo({ src, srcSet, sizes, width, height, alt, focus, priority = false }) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={focus ? { objectPosition: focus } : undefined}
    />
  )
}
