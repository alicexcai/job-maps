import { useRef } from 'react'

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
              Each chart is a <strong>sunburst</strong>: a job’s work is sorted into nested rings of
              categories. Move from the center outward to go from broad kinds of work to more
              specific ones. On the “relevant tasks” views, the outer ring shows real{' '}
              <strong>O*NET task sentences</strong>—the same kind of wording used in official job
              profiles—placed where they sit in a shared activity tree.
            </p>

            <section>
              <h3>How to read the numbers (relevant-task views)</h3>
              <p>
                You may see small tags like <code>5.00e-01</code>. That is just another way to write{' '}
                <strong>0.5</strong> (think “halfway up” a 0-to-1 scale).{' '}
                <strong>Higher numbers → stronger alignment</strong> with the AI-related signal we
                attach to that slice; <strong>lower numbers → weaker alignment</strong>.
              </p>
              <p>
                This is <strong>not</strong> the same as “percent of your workday” or “percent of
                all U.S. workers.” It is a <strong>research scale for comparing slices within the
                same chart</strong>.
              </p>
              <p>
                If you see a <code>~</code> in front (for example <code>~7.20e-01</code>), treat it
                as an <strong>estimate</strong>: we did not have a stored score for that exact spot,
                so one was filled in from nearby categories (see below).
              </p>
            </section>

            <section>
              <h3>What slice size represents</h3>
              <p>
                <strong>Bigger wedge</strong> = more of <em>this job’s</em> O*NET tasks (or more
                survey emphasis on those tasks) fall under that branch of the tree.{' '}
                <strong>Smaller wedge</strong> = fewer or less-emphasized tasks there.
              </p>
              <p>
                <strong>Occupations task intensity:</strong> size is driven by how much of the job’s
                task list lives under each category.
              </p>
              <p>
                <strong>AI intensity:</strong> size blends “how much of this job sits here” with
                “how strong the AI-related signal is on that branch,” so a slice can grow because
                the job spends a lot of work there, because the signal is strong there, or both.
              </p>
              <p>
                <strong>Relevant tasks (and + predictions):</strong> the outer ring is sized from
                those task lines. <strong>Unweighted</strong> counts each listed task evenly;{' '}
                <strong>IM / FT / RT</strong> widens tasks that O*NET surveyors rated as more
                important, more frequent, or more central to the role—<em>only the sizes change</em>
                ; the purple “strength” coloring comes from a separate data column.
              </p>
            </section>

            <section>
              <h3>What the colors represent (relevant-task views)</h3>
              <p>
                Think of it like a heat map on the same 0-to-1 idea as the numbers:{' '}
                <strong>lighter = lower</strong>, <strong>deeper purple = higher measured
                strength</strong> for that slice.
              </p>
              <p>
                <strong>Green</strong> means we used an <strong>estimated</strong> strength (see
                below) instead of a stored purple value—often on finer branches where direct data
                was missing.
              </p>
            </section>

            <section>
              <h3>What “AI intensity / applicability” is meant to suggest</h3>
              <p>
                In everyday terms, the purple scale answers something like:{' '}
                <em>
                  “On this kind of work, how much do outside economic signals suggest AI-related
                  tools and business activity show up?”
                </em>{' '}
                It combines information about <strong>AI-related commercial activity</strong> with{' '}
                <strong>robotics-related revenue patterns</strong>, mapped onto the same activity
                tree used in the chart.
              </p>
              <p>
                It is <strong>one structured lens for discussion</strong>—not a forecast of
                layoffs, not a count of chatbots, and not an official government risk score.
              </p>
            </section>

            <section>
              <h3>Why some values are predicted (~ and green)</h3>
              <p>
                When the stored score for a slice was missing or zero, the chart still needs a
                color for readability. The tool then carries information <strong>downward from
                parent categories</strong> to suggest a reasonable value. Treat those as{' '}
                <strong>best guesses</strong> for visualization, not as precisely measured facts.
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
