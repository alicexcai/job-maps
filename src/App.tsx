import { useMemo, useState } from 'react'
import './App.css'
import {
  OCCUPATION_ONET_SUMMARY_URL,
  TRACKS,
  VIEWS,
  WEIGHTS,
  COLORS,
  usesWeightedRelevantPdfs,
  usesPredictedColorPdfs,
  weightLabel,
  colorLabel,
  type TrackId,
  type ViewId,
  type WeightId,
  type ColorId,
  pdfUrlFor,
} from './onetDashboard'
import { AboutDialog } from './components/AboutDialog'
import { PdfCanvas } from './components/PdfCanvas'

function App() {
  const [trackId, setTrackId] = useState<TrackId>('retail_data')
  const [viewId, setViewId] = useState<ViewId>('task_intensity')
  const [weightId, setWeightId] = useState<WeightId>('unweighted')
  const [colorId, setColorId] = useState<ColorId>('blue_green')
  const [occupationFocus, setOccupationFocus] = useState<string>('__all__')

  const track = useMemo(() => TRACKS.find((t) => t.id === trackId) ?? TRACKS[0], [trackId])
  const occupationsToShow = useMemo(() => {
    if (occupationFocus === '__all__') return track.occupations
    return track.occupations.filter((o) => o.id === occupationFocus)
  }, [occupationFocus, track.occupations])
  const isSingleOccupation = occupationsToShow.length === 1

  const occupationTitle = (o: (typeof track.occupations)[number]) => {
    const href = OCCUPATION_ONET_SUMMARY_URL[o.id]
    if (!href) {
      return <h2 className="cardTitle">{o.label}</h2>
    }
    return (
      <h2 className="cardTitle">
        <a
          className="cardTitleLink"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${o.label} — O*NET Online profile (opens in new tab)`}
        >
          {o.label}
        </a>
      </h2>
    )
  }

  return (
    <div className={`page${isSingleOccupation ? ' single' : ''}`}>
      <header className={`header${isSingleOccupation ? ' single' : ''}`}>
        {!isSingleOccupation && (
          <div className="title">
            <h1>O*NET Dashboard</h1>
            <p>Compare the 3 specialized occupation sunbursts side-by-side.</p>
          </div>
        )}

        <div
          className={`controls${isSingleOccupation ? ' compact' : ''}`}
          role="group"
          aria-label="Dashboard controls"
        >
          <label className="control">
            <span className="controlLabel">Track</span>
            <select
              value={trackId}
              onChange={(e) => {
                const next = e.target.value as TrackId
                setTrackId(next)
                setOccupationFocus('__all__')
              }}
            >
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span className="controlLabel">Occupation</span>
            <select value={occupationFocus} onChange={(e) => setOccupationFocus(e.target.value)}>
              <option value="__all__">All {track.occupations.length}</option>
              {track.occupations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <div className="control control--view">
            <span className="controlLabel">View</span>
            <div className="controlRow">
              <select
                id="view-select"
                className="controlSelect"
                value={viewId}
                onChange={(e) => {
                  const next = e.target.value as ViewId
                  setViewId(next)
                  if (!usesWeightedRelevantPdfs(next)) setWeightId('unweighted')
                  if (!usesPredictedColorPdfs(next)) setColorId('blue_green')
                }}
              >
                {VIEWS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
              <AboutDialog viewId={viewId} />
            </div>
          </div>

          <div className="controlGroup controlGroup--weightColor">
            <label className="control control--compact">
              <span className="controlLabel">Weight</span>
              <select
                value={weightId}
                onChange={(e) => setWeightId(e.target.value as WeightId)}
                disabled={!usesWeightedRelevantPdfs(viewId)}
              >
                {WEIGHTS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="control control--compact">
              <span className="controlLabel">Color</span>
              <select
                value={colorId}
                onChange={(e) => setColorId(e.target.value as ColorId)}
                disabled={!usesPredictedColorPdfs(viewId)}
              >
                {COLORS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main className={`grid${isSingleOccupation ? ' single' : ''}`} aria-label="PDF visualizations">
        {occupationsToShow.map((o) => {
          const url = pdfUrlFor(o.id, viewId, weightId, colorId)
          const isUnavailable = url == null
          return (
            <section
              key={o.id}
              className={`card${usesWeightedRelevantPdfs(viewId) ? ' relevant' : ''}${isSingleOccupation ? ' single' : ''}`}
              aria-label={o.label}
            >
              <div className={`cardHeader${isSingleOccupation ? ' cardHeader--single' : ''}`}>
                {occupationTitle(o)}
                <div className="meta">
                  <span className="pill">{track.label}</span>
                  <span className="pill">{VIEWS.find((v) => v.id === viewId)?.label ?? viewId}</span>
                  {usesWeightedRelevantPdfs(viewId) && (
                    <span className="pill">Weight: {weightLabel(weightId)}</span>
                  )}
                  {usesPredictedColorPdfs(viewId) && (
                    <span className="pill">Color: {colorLabel(colorId)}</span>
                  )}
                </div>
              </div>

              {isUnavailable ? (
                <div className="empty">
                  This occupation doesn’t have a PDF for <code>{weightLabel(weightId)}</code> weight in this
                  view.
                </div>
              ) : (
                <>
                  {isSingleOccupation ? (
                    <PdfCanvas className="pdfCanvas" url={url} zoomMultiplier={1.0} />
                  ) : (
                    <iframe className="pdf" title={`${o.label} visualization`} src={url} loading="lazy" />
                  )}
                </>
              )}
            </section>
          )
        })}
      </main>
    </div>
  )
}

export default App
