import { useMemo, useState } from 'react'
import './App.css'
import {
  OCCUPATION_ONET_SUMMARY_URL,
  TRACKS,
  VIEWS,
  WEIGHTS,
  usesWeightedRelevantPdfs,
  weightLabel,
  type TrackId,
  type ViewId,
  type WeightId,
  pdfUrlFor,
} from './onetDashboard'
import { AboutDialog } from './components/AboutDialog'
import { PdfCanvas } from './components/PdfCanvas'

function App() {
  const [trackId, setTrackId] = useState<TrackId>('retail_data')
  const [viewId, setViewId] = useState<ViewId>('task_intensity')
  const [weightId, setWeightId] = useState<WeightId>('unweighted')
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
      <div className={`aboutCorner${isSingleOccupation ? ' aboutCorner--single' : ''}`}>
        <AboutDialog />
      </div>

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
              <option value="__all__">All 3</option>
              {track.occupations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span className="controlLabel">View</span>
            <select
              value={viewId}
              onChange={(e) => {
                const next = e.target.value as ViewId
                setViewId(next)
                if (!usesWeightedRelevantPdfs(next)) setWeightId('unweighted')
              }}
            >
              {VIEWS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span className="controlLabel">Weight (relevant sunburst views)</span>
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
        </div>
      </header>

      <main className={`grid${isSingleOccupation ? ' single' : ''}`} aria-label="PDF visualizations">
        {occupationsToShow.map((o) => {
          const url = pdfUrlFor(o.label, viewId, weightId)
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
