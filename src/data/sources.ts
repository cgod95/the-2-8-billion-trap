import type { Source } from './types'

/**
 * The source registry. Every figure references one of these. Tiers are assigned
 * once, here, so the official-vs-advocacy distinction is applied consistently.
 *
 * Re-fetch all URLs before publishing and update the figures + `DATA` constants
 * if anything has moved (see README → "Refreshing the data").
 */
export const sources = {
  commonsTA: {
    id: 'commonsTA',
    name: 'House of Commons Library, CBP-10421',
    url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-10421/',
    tier: 'official',
    note: 'Impartial parliamentary research briefing on temporary accommodation.',
  },
  commonsLHA: {
    id: 'commonsLHA',
    name: 'House of Commons Library, SN04957',
    url: 'https://commonslibrary.parliament.uk/research-briefings/sn04957/',
    tier: 'official',
    note: 'Impartial parliamentary research briefing on Local Housing Allowance.',
  },
  mhclgRO: {
    id: 'mhclgRO',
    name: 'MHCLG — Local authority revenue expenditure & financing',
    url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing',
    tier: 'official',
    note: 'The raw outturn spend tables. Official statistics.',
  },
  mhclgTA1: {
    id: 'mhclgTA1',
    name: 'MHCLG — Statutory homelessness live tables (TA1)',
    url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-homelessness',
    tier: 'official',
    note: 'Point-in-time temporary-accommodation counts. Official statistics.',
  },
  hansardFunding: {
    id: 'hansardFunding',
    name: 'Hansard — Homelessness Funding debate, 2 Dec 2025',
    url: 'https://hansard.parliament.uk/commons/2025-12-02/debates/6FE137BA-4830-4279-80DE-49AAFFB494FE/HomelessnessFunding',
    tier: 'parliament',
    note: 'Members on the record in the Commons.',
  },
  ifg: {
    id: 'ifg',
    name: 'Institute for Government — Performance Tracker 2025',
    url: 'https://www.instituteforgovernment.org.uk/publication/performance-tracker-2025/local-services/homelessness',
    tier: 'analysis',
    note: 'Independent think-tank analysis of public-service performance.',
  },
  resolution: {
    id: 'resolution',
    name: 'Resolution Foundation',
    url: 'https://www.resolutionfoundation.org/press-releases/affordability-gap-between-local-housing-allowance-and-local-rents-set-to-reach-record-level-next-year/',
    tier: 'analysis',
    note: 'Independent living-standards think-tank.',
  },
  shelter: {
    id: 'shelter',
    name: 'Shelter',
    url: 'https://england.shelter.org.uk/media/press_release/bill_for_homeless_accommodation_soars_by_25_hitting_28_bn_',
    tier: 'advocacy',
    note: 'Housing & homelessness charity. Campaigns for reform — asks are attributed.',
  },
  shelterChildren: {
    id: 'shelterChildren',
    name: 'Shelter — children in temporary accommodation',
    url: 'https://england.shelter.org.uk/media/press_release/eighth_record_in_a_row_of_children_in_temporary_accommodation_as_one_in_three_homeless_households_placed_out_of_area_',
    tier: 'advocacy',
    note: 'Housing & homelessness charity. Campaigning body.',
  },
  cih: {
    id: 'cih',
    name: 'Chartered Institute of Housing',
    url: 'https://www.cih.org/news/cih-responds-to-the-latest-local-authority-expenditure-statistics-on-homelessness-and-temporary-accommodation/',
    tier: 'advocacy',
    note: 'Housing-sector professional body responding to the official statistics.',
  },
  lga: {
    id: 'lga',
    name: 'Local Government Association',
    url: 'https://www.local.gov.uk/about/news/new-lga-analysis-ps3bn-temporary-accommodation-funding-black-hole',
    tier: 'advocacy',
    note: 'Represents councils. Calls for the subsidy peg to be lifted — its ask is attributed.',
  },
  jrf: {
    id: 'jrf',
    name: 'Joseph Rowntree Foundation',
    url: 'https://www.jrf.org.uk/housing/stop-the-freeze-permanently-re-link-housing-benefits-to-private-rents',
    tier: 'advocacy',
    note: 'Anti-poverty body. Campaigns to unfreeze LHA — its ask is attributed.',
  },
  londonCouncils: {
    id: 'londonCouncils',
    name: 'London Councils',
    url: 'https://www.londoncouncils.gov.uk/',
    tier: 'advocacy',
    note: 'Represents London boroughs.',
  },
  jointLetter: {
    id: 'jointLetter',
    name: 'Joint-sector letter (coalition of 40 organisations), Sep 2025',
    url: 'https://www.jrf.org.uk/housing/stop-the-freeze-permanently-re-link-housing-benefits-to-private-rents',
    tier: 'advocacy',
    note: 'A coalition of housing & anti-poverty bodies. The ask is theirs, attributed.',
  },
} as const satisfies Record<string, Source>

export type SourceId = keyof typeof sources
