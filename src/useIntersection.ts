import { useEffect, useMemo } from 'react'

export default function useIntersection(
  nodeElements: Array<Element>,
  callbackFunc: ([entry]: IntersectionObserverEntry[], index: number) => void,
  threshold: number
) {
  const observers = useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') return

    return nodeElements.map(
      (_, i) =>
        new IntersectionObserver((entries) => callbackFunc(entries, i), {
          threshold: threshold
        })
    )
  }, [callbackFunc, nodeElements, threshold])

  useEffect(() => {
    observers?.forEach((observer: IntersectionObserver, i: number) => {
      if (nodeElements[i]) observer.observe(nodeElements[i])
    })

    return () =>
      observers?.forEach((observer: IntersectionObserver) => {
        observer.disconnect()
      })
  }, [nodeElements, observers])
}
