/**
 * Dashboard content — edit this file to change copy, charts, and sections.
 *
 * Sections: add/remove/reorder objects in `sections`. Each needs a unique `id`
 * (used for sidebar scroll targets #sec-…). Keep `navLabel` short for the sidebar.
 *
 * Scorecards: optional `messageDescription` — longer text shown when hovering the
 * blue insight pill (message). Falls back to `message` if omitted.
 *
 * Layout types:
 * - scorecards     → z-score style metric cards
 * - ooc            → out-of-context detection cards
 * - context        → long context summary + example outputs (two cream cards)
 * - attentionRow   → attention-by-token chart + attention summary
 * - barChartsRow   → one or more BarChartCard-style charts in a row
 *
 * Bar chart `data[]` items may include `tooltip` — shown when hovering the bar.
 * If omitted, the UI builds a short default from `label` and `value`.
 */

export const pageCopy = {
  title: 'Score Dashboard',
  subtitle:
    'Score metrics, out-of-context detection, context evaluation, attention, layer ablations, and token uncertainty.',
}

export const modelOptions = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
]

export const sections = [
  {
    id: 'sec-scores',
    navLabel: 'Score metrics',
    heading: 'Score metrics',
    layout: 'scorecards',
    items: [
      {
        title: 'New Score',
        score: 0.12,
        zScore: -1.33,
        message: 'Lower repetition than usual',
        messageDescription:
          'Repetition is below the model’s typical band for this prompt. Often indicates more varied phrasing than similar past runs.',
        percentile: '18th',
        typicalRange: '0.10 - 0.30',
        mean: '0.20',
        stdDev: '0.06',
        minMax: '0.05 / 0.45',
      },
      {
        title: 'Engagement Score',
        score: 0.28,
        zScore: 0.56,
        message: 'Slightly above usual',
        messageDescription:
          'Engagement sits a bit higher than your historical average for comparable inputs—worth checking if the audience is more active than normal.',
        percentile: '71st',
        typicalRange: '0.12 - 0.34',
        mean: '0.22',
        stdDev: '0.05',
        minMax: '0.08 / 0.43',
      },
      {
        title: 'Retention Score',
        score: 0.09,
        zScore: -1.88,
        message: 'Lower than baseline',
        messageDescription:
          'Retention is unusually low versus the baseline cohort. Consider content fit, length, or follow-up prompts.',
        percentile: '7th',
        typicalRange: '0.11 - 0.32',
        mean: '0.21',
        stdDev: '0.06',
        minMax: '0.04 / 0.41',
      },
      {
        title: 'Novelty Score',
        score: 0.34,
        zScore: 1.2,
        message: 'Higher than usual',
        messageDescription:
          'Novelty is elevated: output differs more from typical patterns than in most past samples—may be creative or less on-template.',
        percentile: '89th',
        typicalRange: '0.13 - 0.31',
        mean: '0.21',
        stdDev: '0.05',
        minMax: '0.06 / 0.40',
      },
      {
        title: 'Complexity Score',
        score: 0.21,
        zScore: 0.13,
        message: 'Within typical range',
        messageDescription:
          'Complexity matches the expected spread—neither unusually simple nor heavy versus your reference distribution.',
        percentile: '55th',
        typicalRange: '0.10 - 0.30',
        mean: '0.20',
        stdDev: '0.06',
        minMax: '0.05 / 0.45',
      },
      {
        title: 'Pacing Score',
        score: 0.15,
        zScore: -0.67,
        message: 'Slightly below usual',
        messageDescription:
          'Pacing is a bit slower or denser than usual for this task type; readers may need more time or fewer ideas per block.',
        percentile: '26th',
        typicalRange: '0.09 - 0.28',
        mean: '0.19',
        stdDev: '0.06',
        minMax: '0.03 / 0.42',
      },
      {
        title: 'Consistency Score',
        score: 0.26,
        zScore: 0.8,
        message: 'More consistent than usual',
        messageDescription:
          'Tone and structure are tighter across segments than in most historical runs—good for brand-safe, repeatable outputs.',
        percentile: '79th',
        typicalRange: '0.12 - 0.30',
        mean: '0.20',
        stdDev: '0.05',
        minMax: '0.07 / 0.39',
      },
      {
        title: 'Clarity Score',
        score: 0.19,
        zScore: -0.08,
        message: 'Near average',
        messageDescription:
          'Clarity is close to the median—readable and direct without standing out as unusually clear or muddy.',
        percentile: '47th',
        typicalRange: '0.11 - 0.29',
        mean: '0.20',
        stdDev: '0.05',
        minMax: '0.06 / 0.38',
      },
      {
        title: 'Focus Score',
        score: 0.31,
        zScore: 1.05,
        message: 'Higher focus than usual',
        messageDescription:
          'The text stays on-task more strongly than typical—fewer tangents and topic drift versus comparable prompts.',
        percentile: '85th',
        typicalRange: '0.10 - 0.29',
        mean: '0.19',
        stdDev: '0.06',
        minMax: '0.04 / 0.41',
      },
      {
        title: 'Trend Score',
        score: 0.17,
        zScore: -0.42,
        message: 'Slightly down from usual',
        messageDescription:
          'Recent trend is modestly weaker than your usual trajectory—could be noise or a shift in input style.',
        percentile: '34th',
        typicalRange: '0.10 - 0.30',
        mean: '0.20',
        stdDev: '0.06',
        minMax: '0.05 / 0.44',
      },
      {
        title: 'Impact Score',
        score: 0.24,
        zScore: 0.41,
        message: 'Healthy impact level',
        messageDescription:
          'Impact is in a solid band—enough signal to matter without extreme outliers that need investigation.',
        percentile: '66th',
        typicalRange: '0.11 - 0.31',
        mean: '0.21',
        stdDev: '0.05',
        minMax: '0.06 / 0.40',
      },
    ],
  },

  {
    id: 'sec-ooc',
    navLabel: 'Out of context',
    heading: 'Out of context detection',
    layout: 'ooc',
    items: [
      {
        title: 'Out of Context Detection',
        status: 'Out of Distribution',
        outOfDistribution: true,
        score: 29.0,
        threshold: 46.0,
        margin: -17.0,
        footer:
          'This prompt exceeds the in distribution uncertainty threshold.',
      },
    ],
  },

  {
    id: 'sec-context',
    navLabel: 'Context & examples',
    heading: 'Context & examples',
    layout: 'context',
    longContext: {
      title: 'Long Context Summary',
      overallAccuracy: '50.0%',
      bestLength: { tokens: '128 tokens', pct: '(100.0%)' },
      worstLength: { tokens: '768 tokens', pct: '(0.0%)' },
      interpretationLabel: 'Longest Context Accuracy',
      interpretationValue: '0.0%',
    },
    exampleOutputs: {
      title: 'Example Outputs',
      length: 128,
      gold: 'ABCDE-42',
      generated: 'ABCDE-42',
      correct: 'Yes',
    },
  },

  {
    id: 'sec-attention',
    navLabel: 'Attention',
    heading: 'Attention',
    layout: 'attentionRow',
    attentionByToken: {
      title: 'Attention by Token',
      subtitle:
        'Average normalized attention assigned to each token position',
      yMax: 0.2,
      yGridTicks: [0, 0.05, 0.1, 0.15, 0.2],
      data: [
        {
          label: 'FACT',
          value: 0.04,
          tooltip:
            'Token “FACT”: normalized attention 0.04 — modest focus on this span.',
        },
        {
          label: '',
          value: 0.03,
          tooltip:
            'Unlabeled token position: attention 0.03 (placeholder in sequence).',
        },
        {
          label: ':',
          value: 0.01,
          tooltip: 'Punctuation “:”: very low attention share (0.01).',
        },
        {
          label: '',
          value: 0.045,
          tooltip: 'Unlabeled token: attention 0.045.',
        },
        {
          label: 'The',
          value: 0.14,
          tooltip:
            'Token “The”: attention 0.14 — stronger than surrounding function words.',
        },
        {
          label: '',
          value: 0.17,
          tooltip: 'Unlabeled token: attention 0.17 (notable bump).',
        },
        {
          label: 'code',
          value: 0.06,
          tooltip: 'Token “code”: attention 0.06.',
        },
        {
          label: 'is',
          value: 0.2,
          tooltip:
            'Token “is”: peak attention in this window (0.20) — focal word.',
        },
        {
          label: '',
          value: 0.03,
          tooltip: 'Unlabeled token: attention 0.03.',
        },
        {
          label: '-',
          value: 0.145,
          tooltip: 'Token “-”: attention 0.145 — mid-range salience.',
        },
        {
          label: '42',
          value: 0.055,
          tooltip: 'Token “42”: attention 0.055.',
        },
        {
          label: 'Answer',
          value: 0.045,
          tooltip: 'Token “Answer”: attention 0.045.',
        },
      ],
    },
    attentionSummary: {
      recentWindow: '5 tokens',
      recencyAttention: '0.610',
      topTokens: [
        { text: 'ABCDE', score: '0.200' },
        { text: 'code', score: '0.180' },
        { text: '42', score: '0.150' },
      ],
    },
  },

  {
    id: 'sec-layers-uncertainty',
    navLabel: 'Layers & uncertainty',
    heading: 'Layers & uncertainty',
    layout: 'barChartsRow',
    charts: [
      {
        title: 'Layer Contributions',
        subtitle: 'KL-divergence after ablating each transformer block',
        yMax: 0.8,
        yGridTicks: [0, 0.2, 0.4, 0.6, 0.8],
        accentBars: true,
        ariaLabel: 'Bar chart of KL divergence per layer L0 through L11',
        data: [
          {
            label: 'L0',
            value: 0.08,
            tooltip:
              'Layer 0 (early block): KL divergence 0.08 — ablating this block causes a small shift from the full model.',
          },
          {
            label: 'L1',
            value: 0.11,
            tooltip:
              'Layer 1: KL 0.11 — slightly more sensitivity than L0.',
          },
          {
            label: 'L2',
            value: 0.1,
            tooltip: 'Layer 2: KL 0.10 — comparable to neighboring early layers.',
          },
          {
            label: 'L3',
            value: 0.15,
            tooltip:
              'Layer 3: KL 0.15 — mid-depth layer; ablation effect is building.',
          },
          {
            label: 'L4',
            value: 0.18,
            tooltip: 'Layer 4: KL 0.18.',
          },
          {
            label: 'L5',
            value: 0.25,
            tooltip: 'Layer 5: KL 0.25 — deeper blocks start to matter more.',
          },
          {
            label: 'L6',
            value: 0.31,
            tooltip: 'Layer 6: KL 0.31.',
          },
          {
            label: 'L7',
            value: 0.61,
            tooltip:
              'Layer 7: KL 0.61 — large spike; this block strongly affects outputs when removed.',
          },
          {
            label: 'L8',
            value: 0.42,
            tooltip:
              'Layer 8: KL 0.42 — dip after L7; interaction effects between blocks.',
          },
          {
            label: 'L9',
            value: 0.72,
            tooltip:
              'Layer 9: KL 0.72 — highest contribution in this stack; critical layer.',
          },
          {
            label: 'L10',
            value: 0.55,
            tooltip: 'Layer 10: KL 0.55 — still high; late-layer refinement.',
          },
          {
            label: 'L11',
            value: 0.36,
            tooltip:
              'Layer 11 (last block): KL 0.36 — lower than L9 but still material.',
          },
        ],
      },
      {
        title: 'Token Level Uncertainty',
        subtitle: 'Negative log likelihood per token measured in bits',
        yMax: 2.6,
        yGridTicks: [0, 0.65, 1.3, 1.95, 2.6],
        accentBars: true,
        ariaLabel: 'Bar chart of negative log likelihood by token index',
        summaryStats: [
          { label: 'Mean', value: '1.120' },
          { label: 'Max', value: '2.480' },
          { label: 'Min', value: '0.310' },
          { label: 'Max Token', value: 'Japan' },
        ],
        data: [
          {
            label: '0',
            value: 0.4,
            tooltip:
              'Token index 0: NLL 0.40 bits — relatively confident prediction.',
          },
          {
            label: '1',
            value: 0.5,
            tooltip: 'Token index 1: NLL 0.50 bits.',
          },
          {
            label: '2',
            value: 0.35,
            tooltip:
              'Token index 2: NLL 0.35 bits — among the lowest uncertainty here.',
          },
          {
            label: '3',
            value: 0.9,
            tooltip: 'Token index 3: NLL 0.90 bits — elevated vs neighbors.',
          },
          {
            label: '4',
            value: 0.45,
            tooltip: 'Token index 4: NLL 0.45 bits.',
          },
          {
            label: '5',
            value: 2.48,
            tooltip:
              'Token index 5 (e.g. “Japan”): NLL 2.48 bits — max uncertainty in this sequence; model is least confident here.',
          },
          {
            label: '6',
            value: 0.6,
            tooltip: 'Token index 6: NLL 0.60 bits.',
          },
        ],
      },
    ],
  },
]

/** Sidebar links — derived from `sections` so nav stays in sync */
export const navSections = sections.map((s) => ({
  id: s.id,
  label: s.navLabel,
}))
