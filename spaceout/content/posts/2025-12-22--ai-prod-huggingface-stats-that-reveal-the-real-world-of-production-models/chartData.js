export const growthData = [
  { date: 'Jan 2022', models: 30000, milestone: 'Pre-ChatGPT Era' },
  { date: 'Jan 2023', models: 120000, milestone: 'The Awakening' },
  { date: 'Jan 2024', models: 500000, milestone: 'Llama 2 / Mistral' },
  { date: 'Jan 2025', models: 1100000, milestone: 'Smol Models' },
  { date: 'Dec 2025', models: 2000000, milestone: 'Specialization Era' },
];

export const adoptionData = [
  { stage: 'Strategic Priority (Top 3)', percentage: 74, fill: '#8884d8' },
  { stage: 'Active Pilots (Experimentation)', percentage: 64, fill: '#83a6ed' },
  { stage: 'Scaled Production (Deployed)', percentage: 15, fill: '#8dd1e1' },
  { stage: 'Positive ROI (Measurable Value)', percentage: 23, fill: '#82ca9d' },
];

// X: Params (Log scale proxy), Y: Downloads (Log scale proxy)
export const scatterData = [
  { name: 'MiniLM-L6-v2', params: 30, downloads: 85, zone: 'Utility' }, // 0.03B = 30M
  { name: 'BERT-Base', params: 110, downloads: 68, zone: 'Utility' }, // 0.11B = 110M
  { name: 'YOLOv12-Nano', params: 3, downloads: 12, zone: 'Utility' }, // 0.003B = 3M

  { name: 'Llama-3-8B', params: 8000, downloads: 25, zone: 'Frontier' }, // 8B
  { name: 'Mistral-7B', params: 7000, downloads: 18, zone: 'Frontier' }, // 7B

  { name: 'Llama-3-70B', params: 70000, downloads: 4, zone: 'Specialized' }, // 70B

  { name: 'Falcon-180B', params: 180000, downloads: 0.5, zone: 'Stranded' }, // 180B
  { name: 'Grok-1', params: 314000, downloads: 0.1, zone: 'Stranded' }, // 314B
];

export const downloadStatsData = [
  { category: 'Encoder-Only', percentage: 45.0, fill: '#8884d8' },
  { category: 'Decoder-Only', percentage: 9.5, fill: '#ff8042' },
  { category: 'Small Models (<1B)', percentage: 92.5, fill: '#00C49F' },
  { category: 'Large Models (>1B)', percentage: 7.5, fill: '#FFBB28' },
];
