// =============================================================================
// WORKSPACE OS — Curated Toolkit Directory
// Complete 6 Categories & 24 Tools with Official Brand Logos & Metadata
// =============================================================================

export const toolkitCategories = [
  { id: 'ALL', label: 'All' },
  {
    id: 'DATA',
    number: '01',
    title: 'DATA & OFFICE',
    label: 'Data & Office',
    desc: 'Organizing information, analyzing data and creating professional documents.',
    badge: 'TURNING DATA INTO CLARITY',
    footerLabel: 'VIEW RELATED WORK',
    footerUrl: 'https://www.microsoft.com/microsoft-365'
  },
  {
    id: 'AI',
    number: '02',
    title: 'AI & PRODUCTIVITY',
    label: 'AI & Productivity',
    desc: 'Exploring intelligent tools to ideate, learn and work more effectively.',
    badge: 'IDEAS ASSISTED BY AI',
    footerLabel: 'VIEW AI PROJECTS',
    footerUrl: 'https://openai.com'
  },
  {
    id: 'DEV',
    number: '03',
    title: 'DEVELOPMENT & WEB',
    label: 'Development & Web',
    desc: 'Building and customizing digital experiences.',
    badge: 'IDEAS INTO INTERFACES',
    footerLabel: 'VIEW PORTFOLIO SOURCE',
    footerUrl: 'https://github.com/nandiniitpath/Nandini'
  },
  {
    id: 'CYBER',
    number: '04',
    title: 'CYBERSECURITY & SECURITY TOOLS',
    label: 'Cybersecurity & Security Tools',
    desc: 'Learning security fundamentals and exploring modern security tools.',
    badge: 'LEARN PRACTICE STAY AWARE',
    footerLabel: 'VIEW SECURITY PROJECTS',
    footerUrl: 'https://www.microsoft.com/security'
  },
  {
    id: 'RESEARCH',
    number: '05',
    title: 'RESEARCH & LEARNING',
    label: 'Research & Learning',
    desc: 'Using digital resources to explore, learn and stay updated.',
    badge: 'CURIOSITY KEEPS ME MOVING',
    footerLabel: 'EXPLORE MY LEARNING JOURNEY',
    footerUrl: 'https://www.google.com'
  },
  {
    id: 'OTHER',
    number: '06',
    title: 'OTHER TOOLS I USE',
    label: 'Other Tools I Use',
    desc: 'Everyday tools that support my work and personal productivity.',
    badge: 'SMALL TOOLS BIG DIFFERENCE',
    footerLabel: 'ALWAYS EXPLORING',
    footerUrl: 'https://www.notion.so'
  }
];

export const generalTools = [
  // ─────────────────────────────────────────────────────────────
  // 01 — DATA & OFFICE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'tool-excel',
    name: 'Microsoft Excel',
    category: 'DATA',
    categoryNumber: '01',
    categoryLabel: 'Data & Office',
    description: 'Data cleaning, formulas, pivot tables, and analytical dashboards.',
    features: ['Data Cleaning', 'Formulas', 'Pivot Tables', 'Dashboards'],
    icon: 'excel.svg',
    url: 'https://www.microsoft.com/en-us/microsoft-365/excel'
  },
  {
    id: 'tool-word',
    name: 'Microsoft Word',
    category: 'DATA',
    categoryNumber: '01',
    categoryLabel: 'Data & Office',
    description: 'Professional documentation, formatting, reports, and editing.',
    features: ['Documents', 'Formatting', 'Reports', 'Proofreading'],
    icon: 'word.svg',
    url: 'https://www.microsoft.com/en-us/microsoft-365/word'
  },
  {
    id: 'tool-powerpoint',
    name: 'Microsoft PowerPoint',
    category: 'DATA',
    categoryNumber: '01',
    categoryLabel: 'Data & Office',
    description: 'High-impact presentation slide design and visual storytelling.',
    features: ['Presentations', 'Slide Design', 'Visual Layouts', 'Professional Content'],
    icon: 'powerpoint.svg',
    url: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint'
  },

  // ─────────────────────────────────────────────────────────────
  // 02 — AI & PRODUCTIVITY
  // ─────────────────────────────────────────────────────────────
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT',
    category: 'AI',
    categoryNumber: '02',
    categoryLabel: 'AI & Productivity',
    description: 'Ideation, writing assistance, problem solving, and learning.',
    features: ['Ideation', 'Writing Assistance', 'Problem Solving', 'Learning'],
    icon: 'chatgpt.svg',
    url: 'https://chatgpt.com'
  },
  {
    id: 'tool-gemini',
    name: 'Google Gemini',
    category: 'AI',
    categoryNumber: '02',
    categoryLabel: 'AI & Productivity',
    description: 'Multimodal research, productivity, information synthesis, and workflow support.',
    features: ['Research', 'Productivity', 'Information Synthesis', 'Workflow Support'],
    icon: 'gemini.svg',
    url: 'https://gemini.google.com'
  },
  {
    id: 'tool-copilot',
    name: 'Microsoft Copilot',
    category: 'AI',
    categoryNumber: '02',
    categoryLabel: 'AI & Productivity',
    description: 'AI assistance, security exploration, productivity tools, and research.',
    features: ['AI Assistance', 'Security Exploration', 'Productivity Tools', 'Learning & Research'],
    icon: 'copilot.svg',
    url: 'https://copilot.microsoft.com'
  },
  {
    id: 'tool-antigravity',
    name: 'Antigravity',
    category: 'AI',
    categoryNumber: '02',
    categoryLabel: 'AI & Productivity',
    description: 'AI-assisted development, workflow exploration, building, and experimentation.',
    features: ['AI-Assisted Development', 'Workflow Exploration', 'Building & Experimentation'],
    icon: 'antigravity.svg',
    url: 'https://antigravity.google'
  },
  {
    id: 'tool-claude',
    name: 'Claude',
    category: 'AI',
    categoryNumber: '02',
    categoryLabel: 'AI & Productivity',
    description: 'Writing assistance, reasoning, problem solving, and learning support.',
    features: ['Writing Assistance', 'Reasoning & Problem Solving', 'Research & Exploration', 'Learning Support'],
    icon: 'claude.svg',
    url: 'https://claude.ai'
  },
  {
    id: 'tool-merlin',
    name: 'Merlin AI',
    category: 'AI',
    categoryNumber: '02',
    categoryLabel: 'AI & Productivity',
    description: 'AI-assisted research, content support, productivity, and information exploration.',
    features: ['AI-Assisted Research', 'Content Support', 'Productivity', 'Information Exploration'],
    icon: 'merlin.png',
    url: 'https://getmerlin.in'
  },

  // ─────────────────────────────────────────────────────────────
  // 03 — DEVELOPMENT & WEB
  // ─────────────────────────────────────────────────────────────
  {
    id: 'tool-html5',
    name: 'HTML5',
    category: 'DEV',
    categoryNumber: '03',
    categoryLabel: 'Development & Web',
    description: 'Modern structural web markup, semantics, and standards.',
    features: ['Structure', 'Web Pages', 'Semantic Markup'],
    icon: 'html5.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  {
    id: 'tool-css3',
    name: 'CSS3',
    category: 'DEV',
    categoryNumber: '03',
    categoryLabel: 'Development & Web',
    description: 'Responsive design styling, layout engines, and visual layouts.',
    features: ['Styling', 'Responsive Design', 'Visual Layouts'],
    icon: 'css3.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  {
    id: 'tool-javascript',
    name: 'JavaScript',
    category: 'DEV',
    categoryNumber: '03',
    categoryLabel: 'Development & Web',
    description: 'Client-side interactivity, dynamic elements, and user experience.',
    features: ['Interactivity', 'Dynamic Elements', 'User Experience'],
    icon: 'javascript.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    id: 'tool-git',
    name: 'Git',
    category: 'DEV',
    categoryNumber: '03',
    categoryLabel: 'Development & Web',
    description: 'Distributed version control and local repository management.',
    features: ['Version Control', 'Repository Management'],
    icon: 'git.svg',
    url: 'https://git-scm.com'
  },
  {
    id: 'tool-github',
    name: 'GitHub',
    category: 'DEV',
    categoryNumber: '03',
    categoryLabel: 'Development & Web',
    description: 'Cloud repository hosting, GitHub Pages, and project deployment.',
    features: ['GitHub Pages', 'Project Deployment'],
    icon: 'github.svg',
    url: 'https://github.com'
  },

  // ─────────────────────────────────────────────────────────────
  // 04 — CYBERSECURITY & SECURITY TOOLS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'tool-mssecurity',
    name: 'Microsoft Security',
    category: 'CYBER',
    categoryNumber: '04',
    categoryLabel: 'Cybersecurity & Security Tools',
    description: 'Enterprise defense, security concepts, and AI-assisted protection.',
    features: ['Security Concepts', 'AI-Assisted Security', 'Exploration', 'Learning Resources'],
    icon: 'microsoft-security.svg',
    url: 'https://www.microsoft.com/security'
  },
  {
    id: 'tool-seclearn',
    name: 'Security Learning Platforms',
    category: 'CYBER',
    categoryNumber: '04',
    categoryLabel: 'Cybersecurity & Security Tools',
    description: 'Interactive threat awareness, terminology modules, and self-paced study.',
    features: ['Threat Awareness', 'Security Terminology', 'Learning Modules', 'Self-Paced Learning'],
    icon: 'security-learning.svg',
    url: 'https://tryhackme.com'
  },
  {
    id: 'tool-cyberfund',
    name: 'Cybersecurity Fundamentals',
    category: 'CYBER',
    categoryNumber: '04',
    categoryLabel: 'Cybersecurity & Security Tools',
    description: 'Core information security principles, threat awareness, and safe practices.',
    features: ['Information Security', 'Awareness', 'Safe Practices', 'Ongoing Learning'],
    icon: 'cybersecurity-fundamentals.svg',
    url: 'https://cisa.gov'
  },

  // ─────────────────────────────────────────────────────────────
  // 05 — RESEARCH & LEARNING
  // ─────────────────────────────────────────────────────────────
  {
    id: 'tool-google',
    name: 'Google',
    category: 'RESEARCH',
    categoryNumber: '05',
    categoryLabel: 'Research & Learning',
    description: 'Deep research, academic references, and information gathering.',
    features: ['Research', 'Information Gathering', 'Academic & Tech'],
    icon: 'google.svg',
    url: 'https://google.com'
  },
  {
    id: 'tool-youtube',
    name: 'YouTube',
    category: 'RESEARCH',
    categoryNumber: '05',
    categoryLabel: 'Research & Learning',
    description: 'Technical video tutorials, skill development, and visual walkthroughs.',
    features: ['Tutorials', 'Skill Development', 'Visual Learning', 'How-To Guides'],
    icon: 'youtube.svg',
    url: 'https://youtube.com'
  },
  {
    id: 'tool-linkedin',
    name: 'LinkedIn',
    category: 'RESEARCH',
    categoryNumber: '05',
    categoryLabel: 'Research & Learning',
    description: 'Industry insights, professional development, learning paths, and networking.',
    features: ['Learning Paths', 'Industry Insights', 'Professional Development', 'Networking'],
    icon: 'linkedin.svg',
    url: 'https://linkedin.com'
  },

  // ─────────────────────────────────────────────────────────────
  // 06 — OTHER TOOLS I USE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'tool-notion',
    name: 'Notion',
    category: 'OTHER',
    categoryNumber: '06',
    categoryLabel: 'Other Tools I Use',
    description: 'Structured knowledge base, notes, planning, and idea management.',
    features: ['Notes', 'Planning', 'Organization', 'Idea Management'],
    icon: 'notion.svg',
    url: 'https://notion.so'
  },
  {
    id: 'tool-gmail',
    name: 'Gmail',
    category: 'OTHER',
    categoryNumber: '06',
    categoryLabel: 'Other Tools I Use',
    description: 'Daily workflow communication, threads, and organized correspondence.',
    features: ['Communication', 'Organization', 'Productivity', 'Daily Workflow'],
    icon: 'gmail.svg',
    url: 'https://mail.google.com'
  },
  {
    id: 'tool-chrome',
    name: 'Google Chrome',
    category: 'OTHER',
    categoryNumber: '06',
    categoryLabel: 'Other Tools I Use',
    description: 'Fast web browsing, DevTools debugging, extensions, and research.',
    features: ['Research', 'Web Development', 'Extensions', 'Productivity'],
    icon: 'chrome.svg',
    url: 'https://google.com/chrome'
  },
  {
    id: 'tool-andmore',
    name: 'And More',
    category: 'OTHER',
    categoryNumber: '06',
    categoryLabel: 'Other Tools I Use',
    description: 'Continuously exploring emerging software, platforms, and AI tools.',
    features: ['Exploring new tools', 'Continuous growth', 'Adaptive mindset'],
    icon: 'and-more.svg',
    url: 'https://github.com/nandiniitpath'
  }
];

export default generalTools;
