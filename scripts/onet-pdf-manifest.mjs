/**
 * Relative paths under the O*NET output root (same layout as repo `data/ONet/output/`).
 * Used to sync PDFs into `public/onet/` and to copy a self-contained bundle into `data/onet-output/`.
 */
export const ONET_PDF_REL_PATHS = [
  // View 1: Occupations task intensity sunburst
  'occupations/Business Intelligence Analysts.pdf',
  'occupations/Data Scientists.pdf',
  'occupations/Retail Loss Prevention Specialists.pdf',
  'occupations/Licensed Practical and Licensed Vocational Nurses.pdf',
  'occupations/Registered Nurses.pdf',
  'occupations/Nurse Practitioners.pdf',
  'occupations/Media intern activities.pdf',
  'occupations/Heating, Air Conditioning, and Refrigeration Mechanics and Installers.pdf',

  // View 2: AI intensity sunburst
  'occupations_ai_applicability/Business Intelligence Analysts.pdf',
  'occupations_ai_applicability/Data Scientists.pdf',
  'occupations_ai_applicability/Retail Loss Prevention Specialists.pdf',
  'occupations_ai_applicability/Licensed Practical and Licensed Vocational Nurses.pdf',
  'occupations_ai_applicability/Registered Nurses.pdf',
  'occupations_ai_applicability/Nurse Practitioners.pdf',
  'occupations_ai_applicability/Media intern activities.pdf',
  'occupations_ai_applicability/Heating, Air Conditioning, and Refrigeration Mechanics and Installers.pdf',

  // View 3: relevant tasks only (PATH_normal)
  'occupations_relevant/PATH_normal/Business Intelligence Analysts.pdf',
  'occupations_relevant/PATH_normal/Business Intelligence Analysts_IM.pdf',
  'occupations_relevant/PATH_normal/Business Intelligence Analysts_RT.pdf',
  'occupations_relevant/PATH_normal/Business Intelligence Analysts_FT.pdf',
  'occupations_relevant/PATH_normal/Data Scientists.pdf',
  'occupations_relevant/PATH_normal/Retail Loss Prevention Specialists.pdf',
  'occupations_relevant/PATH_normal/Retail Loss Prevention Specialists_IM.pdf',
  'occupations_relevant/PATH_normal/Retail Loss Prevention Specialists_RT.pdf',
  'occupations_relevant/PATH_normal/Retail Loss Prevention Specialists_FT.pdf',
  'occupations_relevant/PATH_normal/Licensed Practical and Licensed Vocational Nurses.pdf',
  'occupations_relevant/PATH_normal/Licensed Practical and Licensed Vocational Nurses_IM.pdf',
  'occupations_relevant/PATH_normal/Licensed Practical and Licensed Vocational Nurses_RT.pdf',
  'occupations_relevant/PATH_normal/Licensed Practical and Licensed Vocational Nurses_FT.pdf',
  'occupations_relevant/PATH_normal/Registered Nurses.pdf',
  'occupations_relevant/PATH_normal/Registered Nurses_IM.pdf',
  'occupations_relevant/PATH_normal/Registered Nurses_RT.pdf',
  'occupations_relevant/PATH_normal/Registered Nurses_FT.pdf',
  'occupations_relevant/PATH_normal/Nurse Practitioners.pdf',
  'occupations_relevant/PATH_normal/Nurse Practitioners_IM.pdf',
  'occupations_relevant/PATH_normal/Nurse Practitioners_RT.pdf',
  'occupations_relevant/PATH_normal/Nurse Practitioners_FT.pdf',
  'occupations_relevant/PATH_normal/Media intern activities.pdf',
  'occupations_relevant/PATH_normal/Heating, Air Conditioning, and Refrigeration Mechanics and Installers.pdf',
  'occupations_relevant/PATH_normal/Heating, Air Conditioning, and Refrigeration Mechanics and Installers_IM.pdf',
  'occupations_relevant/PATH_normal/Heating, Air Conditioning, and Refrigeration Mechanics and Installers_RT.pdf',
  'occupations_relevant/PATH_normal/Heating, Air Conditioning, and Refrigeration Mechanics and Installers_FT.pdf',
]

/** View 4 color schemes — synced as whole directories (see sync-onet-pdfs.mjs). */
export const ONET_COLOR_SCHEME_DIRS = ['blue_green', 'blue_orange', 'purple_blue', 'purple_green']
