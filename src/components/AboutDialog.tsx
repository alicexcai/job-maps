import { useRef } from 'react'
import { ABOUT_VIEW_SECTIONS } from '../aboutContent'

export function AboutDialog({ className = '' }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className={`aboutOpen ${className}`.trim()}
        onClick={() => dialogRef.current?.showModal()}
      >
        About
      </button>

      <dialog ref={dialogRef} className="aboutDialog" aria-labelledby="about-title">
        <div className="aboutDialogInner">
          <header className="aboutHeader">
            <h2 id="about-title">About these charts</h2>
            <button
              type="button"
              className="aboutClose"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
            >
              ×
            </button>
          </header>

          <div className="aboutBody">
            <p className="aboutLead">
              These charts are <strong>sunbursts</strong>—rings within rings that go from broad kinds of
              work at the center to more specific work toward the edge. Pick a chart with the{' '}
              <strong>View</strong> menu; each section below explains one of those options.
            </p>

            {ABOUT_VIEW_SECTIONS.map((view) => (
              <section key={view.id} className="aboutViewSection" aria-labelledby={`about-${view.id}`}>
                <h3 id={`about-${view.id}`}>{view.title}</h3>
                <ul className="aboutPoints">
                  {view.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <footer className="aboutFooter">
            <button type="button" className="aboutDone" onClick={() => dialogRef.current?.close()}>
              Close
            </button>
          </footer>
        </div>
      </dialog>
    </>
  )
}
