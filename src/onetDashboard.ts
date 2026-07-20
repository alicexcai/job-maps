export type TrackId =
  | 'retail_data'
  | 'nurse'
  | 'media_intern'
  | 'hvac'
  | 'software_development'
  | 'accounting'
  | 'business_consulting'
  | 'financial_services'
  | 'it_services'
  | 'retail_supply_chain'
  | 'healthcare'
  | 'robotics_automated'
  | 'airport'

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
  'General and Operations Managers': 'https://www.onetonline.org/link/summary/11-1021.00',
  'Software Developers': 'https://www.onetonline.org/link/summary/15-1252.00',
  'Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products':
    'https://www.onetonline.org/link/summary/41-4012.00',
  'Accountants and Auditors': 'https://www.onetonline.org/link/summary/13-2011.00',
  'Computer Systems Analysts': 'https://www.onetonline.org/link/summary/15-1211.00',
  'Management Analysts': 'https://www.onetonline.org/link/summary/13-1111.00',
  'Loan Officers': 'https://www.onetonline.org/link/summary/13-2072.00',
  'Engineers, All Other': 'https://www.onetonline.org/link/summary/17-2199.00',
  'Shipping, Receiving, and Inventory Clerks':
    'https://www.onetonline.org/link/summary/43-5071.00',
  Logisticians: 'https://www.onetonline.org/link/summary/13-1081.00',
  'Logistics Analysts': 'https://www.onetonline.org/link/summary/13-1081.02',
  'Cargo and Freight Agents': 'https://www.onetonline.org/link/summary/43-5011.00',
  'Stockers and Order Fillers': 'https://www.onetonline.org/link/summary/53-7065.00',
  'Robotics Technicians': 'https://www.onetonline.org/link/summary/17-3024.01',
  'Farm Equipment Mechanics and Service Technicians':
    'https://www.onetonline.org/link/summary/49-3041.00',
  'Electrical and Electronics Installers and Repairers, Transportation Equipment':
    'https://www.onetonline.org/link/summary/49-2093.00',
  'Air Traffic Controllers': 'https://www.onetonline.org/link/summary/53-2021.00',
  'Aircraft Mechanics and Service Technicians':
    'https://www.onetonline.org/link/summary/49-3011.00',
  'Cleaners of Vehicles and Equipment': 'https://www.onetonline.org/link/summary/53-7061.00',
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
  {
    id: 'software_development',
    label: 'Software Development',
    occupations: [
      { id: 'General and Operations Managers', label: 'General and Operations Managers' },
      { id: 'Software Developers', label: 'Software Developers' },
      {
        id: 'Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products',
        label: 'Sales Representatives, Wholesale & Manufacturing',
      },
    ],
  },
  {
    id: 'accounting',
    label: 'Accounting',
    occupations: [
      { id: 'Accountants and Auditors', label: 'Accountants and Auditors' },
      { id: 'Computer Systems Analysts', label: 'Computer Systems Analysts' },
      { id: 'Management Analysts', label: 'Management Analysts' },
    ],
  },
  {
    id: 'business_consulting',
    label: 'Business Consulting & Services',
    occupations: [
      { id: 'Management Analysts', label: 'Management Analysts' },
      { id: 'General and Operations Managers', label: 'General and Operations Managers' },
      { id: 'Computer Systems Analysts', label: 'Computer Systems Analysts' },
    ],
  },
  {
    id: 'financial_services',
    label: 'Financial Services',
    occupations: [
      { id: 'Management Analysts', label: 'Management Analysts' },
      { id: 'General and Operations Managers', label: 'General and Operations Managers' },
      { id: 'Loan Officers', label: 'Loan Officers' },
    ],
  },
  {
    id: 'it_services',
    label: 'IT Services & IT Consulting',
    occupations: [
      { id: 'General and Operations Managers', label: 'General and Operations Managers' },
      { id: 'Engineers, All Other', label: 'Engineers, All Other' },
      { id: 'Computer Systems Analysts', label: 'Computer Systems Analysts' },
    ],
  },
  {
    id: 'retail_supply_chain',
    label: 'Retail Supply Chain and Logistics',
    occupations: [
      {
        id: 'Shipping, Receiving, and Inventory Clerks',
        label: 'DC Supply Chain Associate (WalMart)',
      },
      { id: 'Logisticians', label: 'Logistics Coordinator (JB Hunt)' },
      { id: 'Logistics Analysts', label: 'Transportation Operations Analyst (Tyson Foods)' },
      { id: 'Cargo and Freight Agents', label: 'Transportation Coordinator (WalMart)' },
      { id: 'Stockers and Order Fillers', label: 'Replenishment Associate (WalMart)' },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    occupations: [
      {
        id: 'Registered Nurses',
        label: 'Registered Nurse (AI clinical decision support)',
      },
    ],
  },
  {
    id: 'robotics_automated',
    label: 'Robotics and Automated Systems',
    occupations: [
      {
        id: 'Robotics Technicians',
        label: 'Supply Chain / Micro-Fulfillment Center (MFC) Technician',
      },
      {
        id: 'Farm Equipment Mechanics and Service Technicians',
        label: 'Poultry Genetics & Hatchery Environmental Controls Technician',
      },
      {
        id: 'Electrical and Electronics Installers and Repairers, Transportation Equipment',
        label: 'Logistics Telematics & Autonomous Fleet Technician',
      },
    ],
  },
  {
    id: 'airport',
    label: 'Airport',
    occupations: [
      { id: 'Air Traffic Controllers', label: 'Air Traffic Controllers' },
      {
        id: 'Aircraft Mechanics and Service Technicians',
        label: 'Aircraft Mechanics and Service Technicians',
      },
      {
        id: 'Cleaners of Vehicles and Equipment',
        label: 'Cleaners of Vehicles and Equipment',
      },
    ],
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

