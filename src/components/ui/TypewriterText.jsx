import { useEffect, useState } from 'react'

export function TypewriterText({
  texts = [],
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}) {
  const [display, setDisplay] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!texts.length) return
    const full = texts[i % texts.length]
    let t

    if (!deleting) {
      if (display.length < full.length) {
        t = setTimeout(() => {
          setDisplay(full.slice(0, display.length + 1))
        }, speed)
      } else {
        t = setTimeout(() => setDeleting(true), pauseTime)
      }
    } else if (display.length > 0) {
      t = setTimeout(() => {
        setDisplay((d) => d.slice(0, -1))
      }, deleteSpeed)
    } else {
      t = setTimeout(() => {
        setDeleting(false)
        setI((v) => v + 1)
      }, 0)
    }

    return () => clearTimeout(t)
  }, [display, deleting, i, texts, speed, deleteSpeed, pauseTime])

  return (
    <p className="font-syne text-2xl text-pink md:text-3xl">
      {display}
      <span className="ml-0.5 inline-block w-2 animate-pulse font-light text-pink">
        |
      </span>
    </p>
  )
}
