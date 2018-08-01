export const FUNDING_STAGES = [
  {
    slug: 'seed'
  },
  {
    slug: 'pre'
  },
  {
    slug: 'post'
  }
]

export const GIVEAWAY_TYPES = [
  {
    slug: 'token'
  },
  {
    slug: 'equity'
  },
  {
    slug: 'both'
  }
]

export const TOKEN_TYPES = [
  {
    slug: 'protocols'
  },
  {
    slug: 'app_tokens'
  },
  {
    slug: 'security_tokens'
  }
]

export const PRODUCT_STAGES = [
  {
    slug: 'pre'
  },
  {
    slug: 'live'
  },
  {
    slug: 'revenue'
  }
]

export const REGION = [
  { slug: 'korea' },
  { slug: 'north_america' },
  { slug: 'south_america' },
  { slug: 'africa' },
  { slug: 'asia' },
  { slug: 'europe' }
]

export const INVESTOR_NATIONALITY = [
  { slug: 'anywhere' },
  { slug: 'exclude_us' },
  { slug: 'korea_only' }
]

export const TICKET_SIZES = [
  { id: 1, min: '0', max: '5000', label: '<5k' },
  { id: 2, min: '5000', max: '25000', label: '5k-25k' },
  { id: 3, min: '25000', max: '100000', label: '25k-100k' },
  { id: 4, min: '100000', max: '500000', label: '100k-1M' },
  { id: 5, min: '500000', max: '1000000', label: '1M-10M' },
  { id: 6, min: '1000000', max: Number.POSITIVE_INFINITY, label: '>10M' }
]
