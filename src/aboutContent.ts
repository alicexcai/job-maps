import { VIEWS, type ViewId } from './onetDashboard'

const DETAILS: Record<ViewId, string[]> = {
  task_intensity: [
    'Every occupation uses the same category tree; only the colors differ from job to job.',
    'The width of slices just depends on how many activities sit under them in the 5th ring, as all 5th ring activities are the same width.',
    'Color shows where this job’s work is concentrated: each O*NET task is counted once, weighted by how relevant and important it is for that role.',
    'Those intensities are aggregated upwards, meaning the parent intensity is the sum of all its children and its own intensity.',
    'Pale or white means little or none of the job’s work in that branch; deep orange means the most for this occupation. The scale is relative to that job’s max intensity.',
  ],
  ai_intensity: [
    'Every occupation uses the same category tree as the task-intensity view.',
    'The width of slices just depends on how many activities sit under them in the 5th ring, as all 5th ring activities are the same width.',
    'Color blends two signals at each activity: how much of this job’s (relevance x importance) weighted tasks fall there, and how much AI-software and robotics revenue in the wider market is tied to that kind of work. A branch looks strongest when both signals are high.',
    'Again, the intensity is aggregated upwards and normalized from min to max intensity for that job.'
  ],
  ai_relevant: [
    'This chart is built only from activities that appear in this occupation’s O*NET task list.',
    'The inner rings (five levels) follow the usual activity hierarchy. The outermost ring lists this job’s actual task description from O*NET.',
    'Slice width shows how much of the job’s work sits under each branch. Use the Weight control to see every task equally, or to emphasize tasks rated higher on importance, relevance, or frequency.',
    'Color shows market AI intensity for that activity—AI software plus robotics revenue. Width and color answer different questions.',
    'Again, the intensity is aggregated upwards and normalized from min to max intensity for that job.'
  ],
  ai_relevant_predicted: [
    'This chart is built only from activities that appear in this occupation’s O*NET task list.',
    'The inner rings (five levels) follow the usual activity hierarchy. The outermost ring lists this job’s actual task description from O*NET.',
    'Slice width shows how much of the job’s work sits under each branch. Use the Weight control to see every task equally, or to emphasize tasks rated higher on importance, relevance, or frequency.',
    'Purple color shows market AI intensity for that activity—AI software plus robotics revenue.',
    'Again, the intensity is aggregated upwards and normalized from min to max intensity for that job.',
    'Green color shows estimated market AI intensity for that activity, based on parent categories. The predictions are calculated using direct_parent_score × (1 − decay). Decay is set to 0.1.',
  ],
}

export const ABOUT_VIEW_SECTIONS = VIEWS.map((view) => ({
  id: view.id,
  title: view.label,
  details: DETAILS[view.id],
}))
