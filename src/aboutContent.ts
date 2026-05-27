import { VIEWS, type ViewId } from './onetDashboard'

const DATA_SOURCES_MARKET = "O*NET | There's An AI For That | IFR World Robotics Report"
const DATA_SOURCES_ONET = 'O*NET'

const WHOLE_ONTOLOGY_NOTE =
  'This view shows the whole ontology, even if there are not tasks from the occupation in many parts of the ontology.';

export type AboutViewContent = {
  title: string
  summary: string
  dataSources: string
  colorFormula: string
}

const CONTENT: Record<ViewId, Omit<AboutViewContent, 'title'>> = {
  task_intensity: {
    summary: `This is just showing the concentration of tasks in different parts of the ontology, weighted by their relevance × importance (which are scores that O*NET gives). Darker orange means the activity is more emphasized in the occupation, and the counts aggregate upwards into higher levels of the ontology (slices more toward the center). ${WHOLE_ONTOLOGY_NOTE}`,
    dataSources: DATA_SOURCES_ONET,
    colorFormula: 'color = # of tasks in that activity, weighted by importance x relevance',
  },
  ai_intensity: {
    summary: `This shows the AI applicability profile for the occupation. The color is determined by (1) the number and weight (importance × relevance) of tasks in each part of the ontology (basically the numbers from the (a) task intensity sunburst) and (2) market AI intensity (how much AI and robotics revenue is linked to that activity). The chart multiplies (1) and (2) into one AI applicability color value. The intuition here is that if an activity is important to the occupation and there are AI tools with high revenue for that activity, then it is very AI applicable. ${WHOLE_ONTOLOGY_NOTE}`,
    dataSources: DATA_SOURCES_MARKET,
    colorFormula:
      'task intensity = # of tasks in that activity, weighted by importance x relevance\nmarket AI intenstiy = amount of AI and robotics revenue linked to that activity\n→ color = (task intensity) × (market AI intensity)',
  },
  ai_relevant: {
    summary:
      'This only shows the parts of the ontology which lead to tasks in the occupation. All the tasks listed on the outer ring are from the occupation. The color shows only the market AI intensity (how much AI and robotics revenue is linked to that activity). The width of the slices on the outer ring change slightly based on the weighting choice (importance, relevance, frequency), with higher ratings leading to larger slice sizes. But as @Hanna Adeyema pointed out, these changes are minute and hard to distinguish, so it may not be that useful to us.',
    dataSources: DATA_SOURCES_MARKET,
    colorFormula:
      '→ color = market AI intenstiy = amount of AI and robotics revenue linked to that activity',
  },
  ai_relevant_predicted: {
    summary:
      'The same as the (c) AI intensity (relevant tasks only) view, but with a predicted AI applicability for the atomic activities (second to last outer ring) and O*NET tasks. The predicted AI applicability is indicated in green and is derived using the closest ancestor score × (1 − 0.1 decay for each generation in between). This is a rough estimate—we are estimating AI applicability for a specific activity by looking at its closest ancestor’s score and applying that decay for each generation between them. We are currently working on a more sophisticated prediction model that will replace this formula.',
    dataSources: DATA_SOURCES_MARKET,
    colorFormula:
      '→ observed color = market AI intenstiy = amount of AI and robotics revenue linked to that activity\n→ predicted color = predicted AI intensity = closest ancestor score x (1 - 0.1 decay for each generation in between)',
  },
}

export function aboutForView(viewId: ViewId): AboutViewContent {
  const view = VIEWS.find((v) => v.id === viewId) ?? VIEWS[0]
  const section = CONTENT[view.id]
  return {
    title: view.label,
    ...section,
  }
}
