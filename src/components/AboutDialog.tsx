import { useEffect, useRef } from 'react'
import { aboutForView } from '../aboutContent'
import type { ViewId } from '../onetDashboard'

type Props = {
  viewId: ViewId
}

export function AboutDialog({ viewId }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { title, summary, dataSources, colorFormula } = aboutForView(viewId)

  useEffect(() => {
    dialogRef.current?.close()
  }, [viewId])

  return (
    <>
      <button
        type="button"
        className="aboutOpen aboutOpen--inline"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`About ${title}`}
      >
        About this view
      </button>

      <dialog ref={dialogRef} className="aboutDialog" aria-labelledby="about-title">
        <div className="aboutDialogInner">
          <header className="aboutHeader">
            <h2 id="about-title">{title}</h2>
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
            <p className="aboutSummary">{summary}</p>

            <section className="aboutBlock" aria-labelledby="about-sources-heading">
              <h3 id="about-sources-heading">Data sources</h3>
              <p className="aboutMeta">{dataSources}</p>
            </section>

            <section className="aboutBlock" aria-labelledby="about-formula-heading">
              <h3 id="about-formula-heading">Color formula</h3>
              <p className="aboutFormula">
                <code>{colorFormula}</code>
              </p>
            </section>
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
