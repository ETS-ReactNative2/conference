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
  { index: 1, slug: 'ceo'},
  { index: 2, slug: 'community_manager'},
  { index: 3, slug: 'designer' },
  { index: 4, slug: 'data_scientist'},
  { index: 5, slug: 'backend_developer'},
  { index: 6, slug: 'frontend_developer'},
  { index: 7, slug: 'full_stack_developer' },
  { index: 8, slug: 'marketing'},
  { index: 9, slug: 'ml_engineer'},
  { index: 10, slug: 'qa_engineer'},
  { index: 11, slug: 'sales'},
  { index: 12, slug: 'other'}
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
  { slug: 'fiat'},
  { slug: 'tokens'},
  { slug: 'equity'}
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
  }
]

export const TRAITS =  [
  { id: 1, text: 'Accomplished' },
{ id: 2, text: 'Accurate' },
{ id: 3, text: 'Action Focused' },
{ id: 4, text: 'Adaptable' },
{ id: 5, text: 'Administered' },
{ id: 6, text: 'Advanced' },
{ id: 7, text: 'Agile' },
{ id: 8, text: 'Ambitious' },
{ id: 9, text: 'Autonomous' },
{ id: 10, text: 'Balanced' },
{ id: 11, text: 'Calm' },
{ id: 12, text: 'Capable' },
{ id: 13, text: 'Charismatic' },
{ id: 14, text: 'Clear spoken' },
{ id: 15, text: 'Collaborative' },
{ id: 16, text: 'Collected' },
{ id: 17, text: 'Communicative' },
{ id: 18, text: 'Competitive' },
{ id: 19, text: 'Confident' },
{ id: 20, text: 'Consistent' },
{ id: 21, text: 'Cool under pressure' },
{ id: 22, text: 'Cooperative' },
{ id: 23, text: 'Creative' },
{ id: 24, text: 'Critical Thinker' },
{ id: 25, text: 'Culturally Conscious' },
{ id: 26, text: 'Inspiring' },
{ id: 27, text: 'Curious' },
{ id: 28, text: 'Detail Oriented' },
{ id: 29, text: 'Determined' },
{ id: 30, text: 'Diplomatic' },
{ id: 31, text: 'Directed' },
{ id: 32, text: 'Dynamic' },
{ id: 33, text: 'Effective' },
{ id: 34, text: 'Efficient' },
{ id: 35, text: 'Energized' },
{ id: 36, text: 'Enthusiastic' },
{ id: 37, text: 'Entrepreneurial Thinking' },
{ id: 38, text: 'Ethical' },
{ id: 39, text: 'Excellent Problem Solver' },
{ id: 40, text: 'Extroverted' },
{ id: 41, text: 'Fearless' },
{ id: 42, text: 'Flexible' },
{ id: 43, text: 'Fluent' },
{ id: 44, text: 'Focused' },
{ id: 45, text: 'Go Getter' },
{ id: 46, text: 'Goal Oriented' },
{ id: 47, text: 'Hardworking' },
{ id: 48, text: 'High Endurance' },
{ id: 49, text: 'Innovative' },
{ id: 50, text: 'Integral' },
{ id: 51, text: 'Integrity' },
{ id: 52, text: 'Intelligent' },
{ id: 53, text: 'Introverted' },
{ id: 54, text: 'Intuitive' },
{ id: 55, text: 'Investigative' },
{ id: 56, text: 'Judgmental' },
{ id: 57, text: 'Leadership' },
{ id: 58, text: 'Mindful' },
{ id: 59, text: 'Motivated' },
{ id: 60, text: 'Motivating' },
{ id: 61, text: 'Objective' },
{ id: 62, text: 'Optimized' },
{ id: 63, text: 'Ordered' },
{ id: 64, text: 'Organized' },
{ id: 65, text: 'Passionate' },
{ id: 66, text: 'Persuasive' },
{ id: 67, text: 'Proactive' },
{ id: 68, text: 'Problem solver' },
{ id: 69, text: 'Productive' },
{ id: 70, text: 'Professional' },
{ id: 71, text: 'Prompt' },
{ id: 72, text: 'Punctual' },
{ id: 73, text: 'Qualified' },
{ id: 74, text: 'Quantified' },
{ id: 75, text: 'Quick learner' },
{ id: 76, text: 'Reliable' },
{ id: 77, text: 'Resourceful' },
{ id: 78, text: 'Respectable' },
{ id: 79, text: 'Respectful' },
{ id: 80, text: 'Responsive' },
{ id: 81, text: 'Security Mindset' },
{ id: 82, text: 'Self-Aware' },
{ id: 83, text: 'Decisive' },
{ id: 84, text: 'Enthusiastic' },
{ id: 85, text: 'Fair' },
{ id: 86, text: 'Selfless' },
{ id: 87, text: 'Specialized' },
{ id: 88, text: 'Strategic' },
{ id: 89, text: 'Streamlined' },
{ id: 90, text: 'Tactical' },
{ id: 91, text: 'Task Oriented' },
{ id: 92, text: 'Team Player' },
{ id: 93, text: 'Transformative' },
{ id: 94, text: 'Troubleshooter' },
{ id: 95, text: 'Unifying' },
{ id: 96, text: 'Visionary' },
{ id: 97, text: 'Well Spoken' },
{ id: 98, text: 'Well-written' }
]

export const SKILLS = [
  { id: 1, text: '.NET' },
{ id: 2, text: 'AI' },
{ id: 3, text: 'ASP.NET' },
{ id: 4, text: 'AWS' },
{ id: 5, text: 'Accounting Management' },
{ id: 6, text: 'Acquisition Valuation' },
{ id: 7, text: 'Advertising Management' },
{ id: 8, text: 'Advertising Strategy and Management' },
{ id: 9, text: 'Agile' },
{ id: 10, text: 'Algorithms' },
{ id: 11, text: 'Analytics' },
{ id: 12, text: 'Analyzing Business Requirements' },
{ id: 13, text: 'Android' },
{ id: 14, text: 'AngularJS' },
{ id: 15, text: 'App Design' },
{ id: 16, text: 'App Development' },
{ id: 17, text: 'Asset Management' },
{ id: 18, text: 'Audit Compliance' },
{ id: 19, text: 'Audit Regulation Awareness' },
{ id: 20, text: 'Azure' },
{ id: 21, text: 'B2B Marketing' },
{ id: 22, text: 'Backend Engineering' },
{ id: 23, text: 'Bash' },
{ id: 24, text: 'Behavioral Economics' },
{ id: 25, text: 'Benchmarking' },
{ id: 26, text: 'Bootstrap' },
{ id: 27, text: 'Brand Management' },
{ id: 28, text: 'Breakthrough Thinking' },
{ id: 29, text: 'Budget Control' },
{ id: 30, text: 'Business & Industry Knowledge' },
{ id: 31, text: 'Business Analysis' },
{ id: 32, text: 'Business Law' },
{ id: 33, text: 'Business Models' },
{ id: 34, text: 'Business Negotiations' },
{ id: 35, text: 'C' },
{ id: 36, text: 'C#' },
{ id: 37, text: 'C++' },
{ id: 38, text: 'CSS' },
{ id: 39, text: 'Change Impact Analysis' },
{ id: 40, text: 'Channels Management' },
{ id: 41, text: 'Charisma' },
{ id: 42, text: 'Chef' },
{ id: 43, text: 'Cloud' },
{ id: 44, text: 'Coaching' },
{ id: 45, text: 'Coding' },
{ id: 46, text: 'Command Line' },
{ id: 47, text: 'Communication' },
{ id: 48, text: 'Communications to Customers' },
{ id: 49, text: 'Communications to Investors' },
{ id: 50, text: 'Communications to Stakeholders' },
{ id: 51, text: 'Competitive Analysis' },
{ id: 52, text: 'Competitive Strategy' },
{ id: 53, text: 'Compliance' },
{ id: 54, text: 'Computer Science' },
{ id: 55, text: 'Continuous Improvement' },
{ id: 56, text: 'Continuous Integration' },
{ id: 57, text: 'Contract Law' },
{ id: 58, text: 'Contract Management' },
{ id: 59, text: 'Corporate Financial Management' },
{ id: 60, text: 'Corporate Governance' },
{ id: 61, text: 'Corporate Innovation' },
{ id: 62, text: 'Corporate Restructuring' },
{ id: 63, text: 'Corporate Social Responsibility' },
{ id: 64, text: 'Cost Management' },
{ id: 65, text: 'Cost/Benefit Analysis' },
{ id: 66, text: 'Counterparty Risk Management' },
{ id: 67, text: 'Creative Questioning' },
{ id: 68, text: 'Crisis Management' },
{ id: 69, text: 'Cross-Cultural Management' },
{ id: 70, text: 'Cryptography' },
{ id: 71, text: 'Data Analytics' },
{ id: 72, text: 'Data Science' },
{ id: 73, text: 'Data-driven decisions' },
{ id: 74, text: 'Database Design' },
{ id: 75, text: 'Dealing with Ambiguity' },
{ id: 76, text: 'Decisions Making' },
{ id: 77, text: 'Delegation' },
{ id: 78, text: 'Design' },
{ id: 79, text: 'Developing Business Plans' },
{ id: 80, text: 'Developing Requirements' },
{ id: 81, text: 'Development' },
{ id: 82, text: 'Diplomacy' },
{ id: 83, text: 'Dispute Resolution' },
{ id: 84, text: 'Dividend Policy' },
{ id: 85, text: 'Django' },
{ id: 86, text: 'Docker' },
{ id: 87, text: 'Economics' },
{ id: 88, text: 'Engineering' },
{ id: 89, text: 'Entrepreneurship' },
{ id: 90, text: 'Ethereum' },
{ id: 91, text: 'Expense Management' },
{ id: 92, text: 'Fair Competition' },
{ id: 93, text: 'Familiar with UI Toolkits and Frameworks' },
{ id: 94, text: 'Finance' },
{ id: 95, text: 'Financial Audit' },
{ id: 96, text: 'Financial Forecasting' },
{ id: 97, text: 'Financial Governance' },
{ id: 98, text: 'Financial Management' },
{ id: 99, text: 'Financial Management in a Dynamic Regulatory Environment' },
{ id: 100, text: 'Financial Modeling' },
{ id: 101, text: 'Financing' },
{ id: 102, text: 'Finding Order in Chaos' },
{ id: 103, text: 'Forecasting' },
{ id: 104, text: 'Frontend Engineering' },
{ id: 105, text: 'Full Stack Engineering' },
{ id: 106, text: 'Fundraising' },
{ id: 107, text: 'Game Theory' },
{ id: 108, text: 'Gap Analysis' },
{ id: 109, text: 'Gap Identification' },
{ id: 110, text: 'Git' },
{ id: 111, text: 'Go' },
{ id: 112, text: 'Graph Databases' },
{ id: 113, text: 'HR Management' },
{ id: 114, text: 'HTML' },
{ id: 115, text: 'Hadoop' },
{ id: 116, text: 'Hiring' },
{ id: 117, text: 'Human Resources' },
{ id: 118, text: 'ICO Marketing' },
{ id: 119, text: 'Influencing' },
{ id: 120, text: 'Influencing Skills' },
{ id: 121, text: 'Information Analysis' },
{ id: 122, text: 'Innovation' },
{ id: 123, text: 'Intellectual Property Law' },
{ id: 124, text: 'International Business' },
{ id: 125, text: 'International Marketing' },
{ id: 126, text: 'Interviewing' },
{ id: 127, text: 'Invision' },
{ id: 128, text: 'Java' },
{ id: 129, text: 'Javascript' },
{ id: 130, text: 'Kaizen' },
{ id: 131, text: 'Knowledge' },
{ id: 132, text: 'Knowledge Management' },
{ id: 133, text: 'Leadership' },
{ id: 134, text: 'Leading Change' },
{ id: 135, text: 'Liability Risks' },
{ id: 136, text: 'Liability Valuation' },
{ id: 137, text: 'Linux/Unix' },
{ id: 138, text: 'Logistics' },
{ id: 139, text: 'Long-Term Financial Management' },
{ id: 140, text: 'M&A Economics' },
{ id: 141, text: 'M&A Finance' },
{ id: 142, text: 'M&A Law' },
{ id: 143, text: 'ML' },
{ id: 144, text: 'Machine Learning' },
{ id: 145, text: 'Managing Budgets' },
{ id: 146, text: 'Managing Change' },
{ id: 147, text: 'Managing Difficult People' },
{ id: 148, text: 'Managing Incentives' },
{ id: 149, text: 'Managing Risk' },
{ id: 150, text: 'Managing Teams' },
{ id: 151, text: 'Managing Top Talent' },
{ id: 152, text: 'Managing Uncertainty & Ambiguity' },
{ id: 153, text: 'MapReduce' },
{ id: 154, text: 'Market Knowledge' },
{ id: 155, text: 'Market Research' },
{ id: 156, text: 'Marketing' },
{ id: 157, text: 'Mechanism Design' },
{ id: 158, text: 'Mentoring' },
{ id: 159, text: 'Mobile Development' },
{ id: 160, text: 'Multi-channel Communications' },
{ id: 161, text: 'Multinational Marketing Strategy' },
{ id: 162, text: 'NLP' },
{ id: 163, text: 'Natural Language Processing' },
{ id: 164, text: 'Negotiating' },
{ id: 165, text: 'NoSQL' },
{ id: 166, text: 'Node.js' },
{ id: 167, text: 'Node.js Experience' },
{ id: 168, text: 'NumPy' },
{ id: 169, text: 'Objective-C' },
{ id: 170, text: 'Operational Analysis' },
{ id: 171, text: 'Operations Management' },
{ id: 172, text: 'PHP' },
{ id: 173, text: 'PR' },
{ id: 174, text: 'Perl' },
{ id: 175, text: 'Photoshop' },
{ id: 176, text: 'Planning' },
{ id: 177, text: 'Political Savvy' },
{ id: 178, text: 'Politics' },
{ id: 179, text: 'Previous Experience Working Within an Agile Scrum Team' },
{ id: 180, text: 'Price Strategy' },
{ id: 181, text: 'Prioritization' },
{ id: 182, text: 'Problem Solving' },
{ id: 183, text: 'Product Development' },
{ id: 184, text: 'Program Management' },
{ id: 185, text: 'Project Management' },
{ id: 186, text: 'Prototyping' },
{ id: 187, text: 'Providing Feedback' },
{ id: 188, text: 'Public Relations' },
{ id: 189, text: 'Public Speaking' },
{ id: 190, text: 'Puppet' },
{ id: 191, text: 'QA' },
{ id: 192, text: 'Quality Assurance' },
{ id: 193, text: 'Raising Capital' },
{ id: 194, text: 'Rapid Prototyping' },
{ id: 195, text: 'ReactJS' },
{ id: 196, text: 'ReactNative' },
{ id: 197, text: 'Recruiting' },
{ id: 198, text: 'Redux' },
{ id: 199, text: 'Regulatory Compliance' },
{ id: 200, text: 'Reputation Management' },
{ id: 201, text: 'Resource Allocation' },
{ id: 202, text: 'Resource Management' },
{ id: 203, text: 'Resource Planning' },
{ id: 204, text: 'Responsive Design' },
{ id: 205, text: 'Revenue Management' },
{ id: 206, text: 'Risk Assessments' },
{ id: 207, text: 'Risk Management' },
{ id: 208, text: 'Ruby' },
{ id: 209, text: 'Ruby on Rails' },
{ id: 210, text: 'SQL' },
{ id: 211, text: 'Sales Force Management' },
{ id: 212, text: 'Sales Management' },
{ id: 213, text: 'Sales Strategy' },
{ id: 214, text: 'Sales Tactics' },
{ id: 215, text: 'Salesforce' },
{ id: 216, text: 'Sass' },
{ id: 217, text: 'Scala' },
{ id: 218, text: 'Scalability' },
{ id: 219, text: 'Scheduling' },
{ id: 220, text: 'Scrum' },
{ id: 221, text: 'Selenium' },
{ id: 222, text: 'Shell' },
{ id: 223, text: 'Sketch' },
{ id: 224, text: 'Smart Contract Development' },
{ id: 225, text: 'Software' },
{ id: 226, text: 'Software Architecture' },
{ id: 227, text: 'Solidity' },
{ id: 228, text: 'Statistics' },
{ id: 229, text: 'Strategic Analysis' },
{ id: 230, text: 'Supervision' },
{ id: 231, text: 'Supply Chain Management' },
{ id: 232, text: 'Sustainability' },
{ id: 233, text: 'Sustainability and Corporate Social Responsibility' },
{ id: 234, text: 'Swift' },
{ id: 235, text: 'Task Planning' },
{ id: 236, text: 'Tax Strategy' },
{ id: 237, text: 'Team Building' },
{ id: 238, text: 'TensorFlow' },
{ id: 239, text: 'Testing' },
{ id: 240, text: 'Theano' },
{ id: 241, text: 'Tokenomics' },
{ id: 242, text: 'Tools' },
{ id: 243, text: 'Training' },
{ id: 244, text: 'UI Design' },
{ id: 245, text: 'UX Design' },
{ id: 246, text: 'Unit Testing' },
{ id: 247, text: 'Vagrant' },
{ id: 248, text: 'Venture Capital' },
{ id: 249, text: 'Web' },
{ id: 250, text: 'Web Design' },
{ id: 251, text: 'Web Development' },
{ id: 252, text: 'WebHooks' },
{ id: 253, text: 'WebRTC' },
{ id: 254, text: 'Writing Whitepapers' },
{ id: 255, text: 'jQuery' }
  ]

export const JOB_LOCATION = [
  { index: 1, slug: 'local'},
  { index: 2, slug: 'remote'}
]
