import { useRef } from 'react'

const OVERVIEW_TITLE = 'Overview'

export function OverviewAboutDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        className="aboutOpen aboutOpen--corner"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="About this dashboard"
      >
        Overview
      </button>

      <dialog ref={dialogRef} className="aboutDialog" aria-labelledby="overview-about-title">
        <div className="aboutDialogInner">
          <header className="aboutHeader">
            <h2 id="overview-about-title">{OVERVIEW_TITLE}</h2>
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
            <p>
              We constructed a principled Ontology of Work Activities to serve as the foundation for
              action-based skills analysis. The Ontology was developed by processing tasks from the US
              Department of Labor’s widely used O*NET occupational database into a hierarchical structure.
              O*NET provides detailed descriptions for 900+ occupations, including skills, abilities,
              education, and job duties, assisting job seekers, students, and HR professionals.
            </p>

            <p>
              The Ontology has three key features that make it ideal for differentiating and organizing
              activity-based skills: 1) atomicity, 2) specificity, and 3) deep similarity. Atomicity
              means that compound task descriptions, such as “Design, develop, and evaluate software,” are
              broken into atomic activities: “design software,” “develop software,” and &quot;evaluate
              software.&quot; Specificity means that units in the ontology are based on meaning rather than
              words, combining synonyms and differentiating polysemous words. Deep similarity means that
              activities are organized around two substantive dimensions: functional outcome (e.g.,
              creating, modifying, storing, and transferring) and type of entity acted upon (information,
              physical objects, or other actors).
            </p>

            <p>
              Through mapping AI and robotics datasets onto the Ontology, we provide a bird&apos;s eye view
              of where AI can be used (see our{' '}
              <a
                href="https://arxiv.org/pdf/2603.20619"
                target="_blank"
                rel="noopener noreferrer"
              >
                recent paper
              </a>{' '}
              for details). By combining this AI applicability with occupation-specific task profiles, we
              produce occupation AI applicability profiles that inform PATH curriculum design.
            </p>

            <p>
              Our Ontology is complementary to other taxonomies like Lightcast that organize skills topically
              or thematically. In our upcoming{' '}
              <a
                href="https://docs.google.com/document/d/15Kpsp9NfY8JgDpmZ6VxZ6opgEJaDBTnc/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                FIE paper
              </a>
              , we show how both topical and action-based skills analysis can be used to inform curriculum
              design.
            </p>
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
