import { useEffect, useMemo, useRef, useState } from 'react'
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist'

type Props = {
  url: string
  className?: string
  zoomMultiplier?: number
}

const workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

export function PdfCanvas({ url, className, zoomMultiplier = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const effectiveUrl = useMemo(() => url, [url])

  useEffect(() => {
    let isCancelled = false
    let doc: PDFDocumentProxy | null = null

    async function run() {
      setError(null)
      setLoading(true)

      GlobalWorkerOptions.workerSrc = workerSrc

      const loadingTask = getDocument({ url: effectiveUrl })
      doc = await loadingTask.promise
      const page = await doc.getPage(1)

      const container = containerRef.current
      const canvas = canvasRef.current
      if (!container || !canvas) return

      const unscaledViewport = page.getViewport({ scale: 1 })
      const containerWidth = Math.max(1, container.clientWidth)
      const fitScale = containerWidth / unscaledViewport.width
      const scale = fitScale * zoomMultiplier

      const viewport = page.getViewport({ scale })
      const context = canvas.getContext('2d')
      if (!context) return

      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(viewport.width * dpr)
      canvas.height = Math.floor(viewport.height * dpr)
      canvas.style.width = `${Math.floor(viewport.width)}px`
      canvas.style.height = `${Math.floor(viewport.height)}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const renderTask = page.render({ canvas, canvasContext: context, viewport })
      await renderTask.promise

      if (!isCancelled) setLoading(false)
    }

    run().catch((e) => {
      if (isCancelled) return
      setError(e instanceof Error ? e.message : String(e))
      setLoading(false)
    })

    return () => {
      isCancelled = true
      void doc?.destroy()
    }
  }, [effectiveUrl, zoomMultiplier])

  return (
    <div ref={containerRef} className={className}>
      {loading && <div className="pdfCanvasOverlay">Rendering…</div>}
      {error && <div className="pdfCanvasOverlay">Failed to render PDF: {error}</div>}
      <canvas ref={canvasRef} />
    </div>
  )
}

