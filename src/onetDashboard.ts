export type TrackId = 'retail_data' | 'nurse' | 'media_intern' | 'hvac'

const HVAC_OCCUPATION_ID =
  'Heating, Air Conditioning, and Refrigeration Mechanics and Installers'
export type ViewId =
  | 'task_intensity'
  | 'ai_intensity'
  | 'ai_relevant'
  | 'ai_relevant_predicted'
export type WeightId = 'unweighted' | 'IM' | 'RT' | 'FT'
export type ColorId = 'blue_green' | 'blue_orange' | 'purple_blue' | 'purple_green'

export type Occupation = {
  id: string
  label: string
}

/** O*NET Online summary pages (U.S. Department of Labor), keyed by occupation id in TRACKS. */
export const OCCUPATION_ONET_SUMMARY_URL: Record<string, string> = {
  'Business Intelligence Analysts': 'https://www.onetonline.org/link/summary/15-2051.01',
  'Data Scientists': 'https://www.onetonline.org/link/summary/15-2051.00',
  'Retail Loss Prevention Specialists': 'https://www.onetonline.org/link/summary/33-9099.02',
  'Licensed Practical and Licensed Vocational Nurses': 'https://www.onetonline.org/link/summary/29-2061.00',
  'Registered Nurses': 'https://www.onetonline.org/link/summary/29-1141.00',
  'Nurse Practitioners': 'https://www.onetonline.org/link/summary/29-1171.00',
  [HVAC_OCCUPATION_ID]: 'https://www.onetonline.org/link/summary/49-9021.00',
}

export const TRACKS: { id: TrackId; label: string; occupations: Occupation[] }[] = [
  {
    id: 'retail_data',
    label: 'Retail / Data Analyst',
    occupations: [
      { id: 'Business Intelligence Analysts', label: 'Business Intelligence Analysts' },
      { id: 'Data Scientists', label: 'Data Scientists' },
      { id: 'Retail Loss Prevention Specialists', label: 'Retail Loss Prevention Specialists' },
    ],
  },
  {
    id: 'nurse',
    label: 'Nurse',
    occupations: [
      {
        id: 'Licensed Practical and Licensed Vocational Nurses',
        label: 'Licensed Practical and Licensed Vocational Nurses',
      },
      { id: 'Registered Nurses', label: 'Registered Nurses' },
      { id: 'Nurse Practitioners', label: 'Nurse Practitioners' },
    ],
  },
  {
    id: 'media_intern',
    label: 'Media Intern',
    occupations: [{ id: 'Media intern activities', label: 'Media Intern' }],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    occupations: [{ id: HVAC_OCCUPATION_ID, label: HVAC_OCCUPATION_ID }],
  },
]

export const VIEWS: { id: ViewId; label: string }[] = [
  { id: 'task_intensity', label: 'Occupations task intensity sunburst' },
  { id: 'ai_intensity', label: 'AI intensity sunburst' },
  { id: 'ai_relevant', label: 'AI intensity sunburst (relevant tasks only)' },
  {
    id: 'ai_relevant_predicted',
    label: 'AI intensity sunburst (relevant tasks only) + predictions',
  },
]

export function usesWeightedRelevantPdfs(view: ViewId): boolean {
  return view === 'ai_relevant' || view === 'ai_relevant_predicted'
}

export function usesPredictedColorPdfs(view: ViewId): boolean {
  return view === 'ai_relevant_predicted'
}

export const COLORS: { id: ColorId; label: string }[] = [
  { id: 'blue_green', label: 'blue (observed) + green (predicted)' },
  { id: 'blue_orange', label: 'blue (observed) + orange (predicted)' },
  { id: 'purple_blue', label: 'purple (observed) + blue (predicted)' },
  { id: 'purple_green', label: 'purple (observed) + green (predicted)' },
]

export function colorLabel(color: ColorId): string {
  return COLORS.find((c) => c.id === color)?.label ?? color
}

export const WEIGHTS: { id: WeightId; label: string }[] = [
  { id: 'unweighted', label: 'Unweighted' },
  { id: 'IM', label: 'Importance' },
  { id: 'RT', label: 'Relevance' },
  { id: 'FT', label: 'Frequency' },
]

export function weightLabel(weight: WeightId): string {
  return WEIGHTS.find((w) => w.id === weight)?.label ?? weight
}

function pdfFileName(occupationLabel: string, weight: WeightId) {
  if (weight === 'unweighted') return `${occupationLabel}.pdf`
  return `${occupationLabel}_${weight}.pdf`
}

/**
 * Public URL for files under `public/onet/` after `npm run sync-pdfs`.
 * Honors Vite `base` when the app is deployed under a subpath.
 */
export function onetPublicUrl(pathUnderPublicOnet: string): string {
  const rel = pathUnderPublicOnet.replace(/^\/+/, '')
  const base = import.meta.env.BASE_URL
  if (base === '/') {
    return `/${rel}`
  }
  return `${base}${rel}`
}

export function pdfUrlFor(
  occupationId: string,
  view: ViewId,
  weight: WeightId,
  colorId: ColorId,
): string | null {
  if (view === 'task_intensity') {
    return onetPublicUrl(`onet/occupations/${occupationId}.pdf`)
  }

  if (view === 'ai_intensity') {
    return onetPublicUrl(`onet/occupations_ai_applicability/${occupationId}.pdf`)
  }

  if (view === 'ai_relevant' || view === 'ai_relevant_predicted') {
    const file = pdfFileName(occupationId, weight)
    // PATH_normal: Data Scientists only has an unweighted PDF in the current dataset
    if (view === 'ai_relevant' && occupationId === 'Data Scientists' && weight !== 'unweighted') {
      return null
    }
    // PATH_normal: Media intern activities only has an unweighted PDF in the current dataset
    if (view === 'ai_relevant' && occupationId === 'Media intern activities' && weight !== 'unweighted') {
      return null
    }
    if (
      view === 'ai_relevant_predicted' &&
      occupationId === 'Media intern activities' &&
      weight !== 'unweighted' &&
      colorId !== 'purple_green'
    ) {
      return null
    }
    const subdir = view === 'ai_relevant' ? 'PATH_normal' : colorId
    return onetPublicUrl(`onet/occupations_relevant/${subdir}/${file}`)
  }

  return null
}

