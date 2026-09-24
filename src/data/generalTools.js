// =============================================================================
// WORKSPACE OS — Curated Toolkit Directory
// General tools, platforms, and resources available to all workspace users
// =============================================================================

export const toolkitCategories = [
  { id: 'ALL', label: 'All' },
  { id: 'DATA', label: 'Data & Office' },
  { id: 'AI', label: 'AI & Productivity' },
  { id: 'DEV', label: 'Development & Web' },
  { id: 'CYBER', label: 'Cybersecurity' },
  { id: 'RESEARCH', label: 'Research & Learning' }
];

export const generalTools = [
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT',
    category: 'AI',
    categoryLabel: 'AI & Productivity',
    description: 'Ideation, writing assistance, reasoning, and technical problem solving.',
    url: 'https://chatgpt.com',
    icon: 'chatgpt'
  },
  {
    id: 'tool-gemini',
    name: 'Gemini',
    category: 'AI',
    categoryLabel: 'AI & Productivity',
    description: 'Multimodal AI research, information synthesis, and creative brainstorming.',
    url: 'https://gemini.google.com',
    icon: 'gemini'
  },
  {
    id: 'tool-notion',
    name: 'Notion',
    category: 'AI',
    categoryLabel: 'Productivity',
    description: 'Connected workspace for notes, wiki documentation, and knowledge management.',
    url: 'https://notion.so',
    icon: 'notion'
  },
  {
    id: 'tool-vscode',
    name: 'VS Code',
    category: 'DEV',
    categoryLabel: 'Development',
    description: 'Extensible code editor with integrated debugging and ecosystem extensions.',
    url: 'https://code.visualstudio.com',
    icon: 'vscode'
  },
  {
    id: 'tool-gdrive',
    name: 'Google Drive',
    category: 'DATA',
    categoryLabel: 'Data & Office',
    description: 'Secure cloud file storage, document sharing, and workspace synchronization.',
    url: 'https://drive.google.com',
    icon: 'drive'
  },
  {
    id: 'tool-github',
    name: 'GitHub',
    category: 'DEV',
    categoryLabel: 'Development',
    description: 'Git repository hosting, open-source collaboration, and CI/CD pipelines.',
    url: 'https://github.com',
    icon: 'github'
  },
  {
    id: 'tool-figma',
    name: 'Figma',
    category: 'DEV',
    categoryLabel: 'Design & Prototyping',
    description: 'Collaborative cloud interface design, wireframing, and component systems.',
    url: 'https://figma.com',
    icon: 'figma'
  },
  {
    id: 'tool-kali',
    name: 'Kali Linux',
    category: 'CYBER',
    categoryLabel: 'Cybersecurity',
    description: 'Specialized OS environment for penetration testing and vulnerability auditing.',
    url: 'https://kali.org',
    icon: 'kali'
  },
  {
    id: 'tool-gsheets',
    name: 'Google Sheets',
    category: 'DATA',
    categoryLabel: 'Data & Office',
    description: 'Collaborative online spreadsheets with data formulas, pivots, and charts.',
    url: 'https://sheets.google.com',
    icon: 'sheets'
  },
  {
    id: 'tool-wireshark',
    name: 'Wireshark',
    category: 'CYBER',
    categoryLabel: 'Cybersecurity',
    description: 'Open-source network protocol analyzer for packet capture and inspection.',
    url: 'https://wireshark.org',
    icon: 'wireshark'
  },
  {
    id: 'tool-linear',
    name: 'Linear',
    category: 'AI',
    categoryLabel: 'Productivity',
    description: 'Streamlined issue tracking, product roadmapping, and agile cycle management.',
    url: 'https://linear.app',
    icon: 'linear'
  },
  {
    id: 'tool-scholar',
    name: 'Google Scholar',
    category: 'RESEARCH',
    categoryLabel: 'Research & Learning',
    description: 'Academic search engine indexing scholarly literature, journals, and papers.',
    url: 'https://scholar.google.com',
    icon: 'scholar'
  }
];

export default generalTools;
