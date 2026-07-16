export const taskFamilyAccuracy = [
  { task: 'Prop KPI (easy)', accuracy: 100 },
  { task: 'WO timeline', accuracy: 88 },
  { task: 'WO counts', accuracy: 85 },
  { task: 'Prop KPI (medium)', accuracy: 62 },
  { task: 'Portfolio agg.', accuracy: 43 },
  { task: 'Sum (add)', accuracy: 30 },
  { task: 'Fund KPI (medium)', accuracy: 24 },
  { task: 'Fund KPI (easy)', accuracy: 19 },
  { task: 'Fund KPI (hard)', accuracy: 5 },
  { task: 'Prop KPI (hard)', accuracy: 0 },
];

export const sumAccuracyByModel = [
  { model: 'GPT-5', score: 9, group: 'Reasoning' },
  { model: 'GPT-5 Mini', score: 9, group: 'Reasoning' },
  { model: 'GPT-5 Nano', score: 8, group: 'Reasoning' },
  { model: 'o3-mini', score: 7, group: 'Reasoning' },
  { model: 'o1', score: 6, group: 'Reasoning' },
  { model: 'GPT-5.2 Chat', score: 5, group: 'Non-reasoning' },
  { model: 'Claude 4.6', score: 5, group: 'Non-reasoning' },
  { model: 'Gemini 2.5 Flash', score: 5, group: 'Non-reasoning' },
  { model: 'Gemini 2.5 Pro', score: 2, group: 'Non-reasoning' },
  { model: 'GPT-5.2', score: 0, group: 'Non-reasoning' },
  { model: 'GPT-5 Chat', score: 0, group: 'Non-reasoning' },
  { model: 'GPT-4o', score: 0, group: 'Non-reasoning' },
  { model: 'GPT-4.1', score: 0, group: 'Non-reasoning' },
  { model: 'GPT-4 Turbo', score: 0, group: 'Non-reasoning' },
  { model: 'GPT-4', score: 0, group: 'Non-reasoning' },
  { model: 'GPT-3.5', score: 0, group: 'Non-reasoning' },
  { model: 'Claude 4.5', score: 0, group: 'Non-reasoning' },
  { model: 'Claude 4', score: 0, group: 'Non-reasoning' },
  { model: 'Claude Haiku', score: 0, group: 'Non-reasoning' },
].map((row) => ({ ...row, accuracy: Math.round((row.score / 9) * 100) }));

export const accuracyDecayData = [
  { config: '25', accuracy: 43 },
  { config: '50', accuracy: 43 },
  { config: '100', accuracy: 29 },
  { config: '250', accuracy: 38 },
  { config: '500', accuracy: 24 },
  { config: '250×6dig', accuracy: 38 },
  { config: '500×6dig', accuracy: 24 },
  { config: '250×7dig', accuracy: 14 },
  { config: '500×7dig', accuracy: 14 },
];

export const costPerSumData = [
  { model: 'GPT-5 Chat', cost: 0.001 },
  { model: 'GPT-4o', cost: 0.002 },
  { model: 'GPT-5 Nano', cost: 0.004 },
  { model: 'GPT-5 Mini', cost: 0.012 },
  { model: 'GPT-5.2 Chat', cost: 0.019 },
  { model: 'o3-mini', cost: 0.035 },
  { model: 'GPT-5', cost: 0.081 },
  { model: 'o1', cost: 0.431 },
];

export const costVsAccuracyData = [
  { model: 'GPT-5 Chat', cost: 0.001, score: 0, group: 'Non-reasoning' },
  { model: 'GPT-4o', cost: 0.002, score: 0, group: 'Non-reasoning' },
  { model: 'GPT-5 Nano', cost: 0.004, score: 8, group: 'Reasoning' },
  { model: 'GPT-5 Mini', cost: 0.012, score: 9, group: 'Reasoning' },
  { model: 'GPT-5.2 Chat', cost: 0.019, score: 5, group: 'Non-reasoning' },
  { model: 'o3-mini', cost: 0.035, score: 7, group: 'Reasoning' },
  { model: 'GPT-5', cost: 0.081, score: 9, group: 'Reasoning' },
  { model: 'o1', cost: 0.431, score: 6, group: 'Reasoning' },
];

export const claudeVsOpenAIData = [
  { task: 'Sum (add)', OpenAI: 32, Claude: 13 },
  { task: 'WO count', OpenAI: 88, Claude: 62 },
  { task: 'WO timeline', OpenAI: 85, Claude: 93 },
  { task: 'Prop KPI (med)', OpenAI: 68, Claude: 25 },
  { task: 'Fund KPI (med)', OpenAI: 20, Claude: 25 },
  { task: 'Overall', OpenAI: 54, Claude: 40 },
];

export const kpiTierData = [
  { tier: 'Easy', Property: 100, Fund: 19 },
  { tier: 'Medium', Property: 62, Fund: 24 },
  { tier: 'Hard', Property: 0, Fund: 5 },
];

export const keyFindings = [
  { value: '30%', label: 'of plain-addition tasks were correct', sub: '56 of 189 sum cases across 21 models' },
  { value: '0/13', label: 'non-reasoning models could add at all', sub: 'GPT-4o, 4.1, 3.5, Claude, GPT-5 Chat → 0/9 each' },
  { value: '100–700×', label: 'cost gap between right and wrong', sub: 'accuracy is bought with output tokens' },
  { value: '$0.92', label: 'peak cost of one correct addition', sub: 'o1 summing 500 seven-digit numbers' },
];
