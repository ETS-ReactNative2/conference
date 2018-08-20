export const FUNDING_STAGES = [
  {
    slug: 'seed',
    index: 1,
  },
  {
    slug: 'pre',
    index: 2,
  },
  {
    slug: 'post',
    index: 3
  }
]

export const GIVEAWAY_TYPES = [
  {
    slug: 'token',
    index: 1,
  },
  {
    slug: 'equity',
    index: 2,
  }
]

export const GIVEAWAY_TYPES_PROJECT = [
  {
    slug: 'token',
    index: 1,
  },
  {
    slug: 'equity',
    index: 2,
  },
  {
    slug: 'both',
    index: 3,
  }
]

export const TOKEN_TYPES = [
  {
    slug: 'protocols',
    index: 1
  },
  {
    slug: 'app_tokens',
    index: 2,
  },
  {
    slug: 'security_tokens',
    index: 3
  }
]

export const PRODUCT_STAGES = [
  {
    slug: 'pre',
    index: 1
  },
  {
    slug: 'live',
    index: 2
  },
  {
    slug: 'revenue',
    index: 3
  }
]

export const ROLES = [
  { index: 1, slug: 'ceo' },
  { index: 2, slug: 'community_manager' },
  { index: 3, slug: 'designer' },
  { index: 4, slug: 'data_scientist' },
  { index: 5, slug: 'backend_developer' },
  { index: 6, slug: 'frontend_developer' },
  { index: 7, slug: 'full_stack_developer' },
  { index: 8, slug: 'marketing' },
  { index: 9, slug: 'ml_engineer' },
  { index: 10, slug: 'qa_engineer' },
  { index: 11, slug: 'sales' },
  { index: 12, slug: 'other' }
]

//TODO: Remove as soon as search filter alogirthm uses REGIONS enum
export const REGION = [
  { slug: 'korea' },
  { slug: 'north_america' },
  { slug: 'south_america' },
  { slug: 'africa' },
  { slug: 'asia' },
  { slug: 'europe' }
]

export const INVESTOR_INDUSTRIES = [
  {
    slug: 'accounting',
    index: 1
  }, {
    slug: 'agriculture',
    index: 2
  }, {
    slug: 'airlines',
    index: 3
  }, {
    slug: 'architecture',
    index: 4
  }, {
    slug: 'art',
    index: 5
  }, {
    slug: 'automotive',
    index: 6
  }, {
    slug: 'banking',
    index: 7
  }, {
    slug: 'bars_restaurants',
    index: 8
  }, {
    slug: 'broadcasting',
    index: 9
  }, {
    slug: 'casinos',
    index: 10
  }, {
    slug: 'construction',
    index: 11
  }, {
    slug: 'defense',
    index: 12
  }, {
    slug: 'education',
    index: 13
  }, {
    slug: 'electronics',
    index: 14
  }, {
    slug: 'energy',
    index: 15
  }, {
    slug: 'entertainment',
    index: 16
  }, {
    slug: 'environment',
    index: 17
  }, {
    slug: 'finance',
    index: 18
  }, {
    slug: 'green_energy',
    index: 19
  }, {
    slug: 'hardware',
    index: 20
  }, {
    slug: 'health',
    index: 21
  }, {
    slug: 'human_resources',
    index: 22
  }, {
    slug: 'human_rights',
    index: 23
  }, {
    slug: 'insurance',
    index: 24
  }, {
    slug: 'internet',
    index: 25
  }, {
    slug: 'legal',
    index: 26
  }, {
    slug: 'manufacturing',
    index: 27
  }, {
    slug: 'marketing',
    index: 28
  }, {
    slug: 'non_profit',
    index: 29
  }, {
    slug: 'pharmaceuticals',
    index: 30
  }, {
    slug: 'policy',
    index: 31
  }, {
    slug: 'public_relations',
    index: 32
  }, {
    slug: 'publishing',
    index: 33
  }, {
    slug: 'real_estate',
    index: 34
  }, {
    slug: 'retail',
    index: 35
  }, {
    slug: 'sales',
    index: 36
  }, {
    slug: 'sports',
    index: 37
  }, {
    slug: 'supply_chain',
    index: 38
  }, {
    slug: 'transportation',
    index: 39
  }, {
    slug: 'venture_capital',
    index: 40
  }, {
    slug: 'other',
    index: 41
  }
]
export const PAYMENTS = [
  { index: 1, slug: 'fiat' },
  { index: 2, slug: 'tokens' },
  { index: 3, slug: 'equity' }
]

export const TICKET_SIZES = [
  { index: 1, min: '0', max: '5000', label: '<5k' },
  { index: 2, min: '5000', max: '25000', label: '5k-25k' },
  { index: 3, min: '25000', max: '100000', label: '25k-100k' },
  { index: 4, min: '100000', max: '500000', label: '100k-1M' },
  { index: 5, min: '500000', max: '1000000', label: '1M-10M' },
  { index: 6, min: '1000000', max: Number.POSITIVE_INFINITY, label: '>10M' }
]

export const REGIONS = [
  {
    slug: 'anywhere',
    index: 1
  }, {
    slug: 'anywhere_except_us',
    index: 2
  }, {
    slug: 'korea_only',
    index: 3
  }, {
    slug: 'other',
    index: 4
  }
]

export const JOB_LOCATION = [
  { index: 1, slug: 'local' },
  { index: 2, slug: 'remote' }
]
