import { useEffect, useRef } from 'react'

type Dot = { x: number; y: number; vx: number; vy: number; r: number }

const LINK_DISTANCE = 150

/** A slow network of drifting dots and thin links, drawn behind the page. */
export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = 0
    let height = 0
    let dots: Dot[] = []
    let frame = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = width < 900 ? 26 : Math.min(70, Math.round((width * height) / 22000))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      dots.forEach((a, i) => {
        for (let j = i + 1; j < dots.length; j += 1) {
          const b = dots[j]
          if (!b) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < LINK_DISTANCE) {
            context.strokeStyle = `rgba(95, 214, 228, ${(0.2 * (1 - distance / LINK_DISTANCE)).toFixed(3)})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
        context.fillStyle = 'rgba(143, 226, 236, 0.55)'
        context.beginPath()
        context.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        context.fill()
      })
    }

    const tick = () => {
      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < -20) dot.x = width + 20
        if (dot.x > width + 20) dot.x = -20
        if (dot.y < -20) dot.y = height + 20
        if (dot.y > height + 20) dot.y = -20
      }
      draw()
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      window.cancelAnimationFrame(frame)
      if (!motion.matches && !document.hidden) frame = window.requestAnimationFrame(tick)
    }
    const onResize = () => {
      resize()
      draw()
    }

    resize()
    draw()
    start()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', start)
    motion.addEventListener('change', start)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', start)
      motion.removeEventListener('change', start)
    }
  }, [])

  return <canvas ref={canvasRef} className="network" aria-hidden="true" />
}
