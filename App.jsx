import { useState } from 'react'
import './App.css'
import {
  pageCopy,
  modelOptions,
  sections,
  navSections,
} from './dashboardContent.js'

function formatFixed3(n) {
  return n.toFixed(3)
}

function OutOfContextCard({ data }) {
  const alert = data.outOfDistribution
  return (
    <article
      className={`ooc-card ${alert ? 'ooc-card--alert' : 'ooc-card--ok'}`}
    >
      <h3 className="ooc-card__title">{data.title}</h3>
      <p
        className={`ooc-card__status ${alert ? 'ooc-card__status--danger' : 'ooc-card__status--ok'}`}
      >
        {data.status}
      </p>
      <dl className="ooc-card__metrics">
        <div className="ooc-card__row">
          <dt>Score</dt>
          <dd>{formatFixed3(data.score)}</dd>
        </div>
        <div className="ooc-card__row">
          <dt>Threshold</dt>
          <dd>{formatFixed3(data.threshold)}</dd>
        </div>
        <div className="ooc-card__row">
          <dt>Margin</dt>
          <dd>{formatFixed3(data.margin)}</dd>
        </div>
      </dl>
      <p className="ooc-card__footer">{data.footer}</p>
    </article>
  )
}

function LongContextSummaryCard({ data }) {
  return (
    <article className="cream-card cream-card--wide">
      <h3 className="cream-card__title">{data.title}</h3>
      <div className="cream-card__block">
        <div className="cream-card__row">
          <span>Overall Accuracy</span>
          <strong>{data.overallAccuracy}</strong>
        </div>
        <div className="cream-card__row cream-card__row--stack">
          <span>Best Length</span>
          <div className="cream-card__value-stack">
            <strong>{data.bestLength.tokens}</strong>
            <span className="cream-card__sub">{data.bestLength.pct}</span>
          </div>
        </div>
        <div className="cream-card__row cream-card__row--stack">
          <span>Worst Length</span>
          <div className="cream-card__value-stack">
            <strong>{data.worstLength.tokens}</strong>
            <span className="cream-card__sub">{data.worstLength.pct}</span>
          </div>
        </div>
      </div>
      <div className="cream-card__divider" />
      <div className="cream-card__interpretation">
        <h4 className="cream-card__interp-title">Interpretation</h4>
        <div className="cream-card__row cream-card__row--interp">
          <span className="cream-card__interp-label">
            {data.interpretationLabel}
          </span>
          <strong>{data.interpretationValue}</strong>
        </div>
      </div>
    </article>
  )
}

function ExampleOutputsCard({ data }) {
  return (
    <article className="cream-card">
      <h3 className="cream-card__title">{data.title}</h3>
      <dl className="cream-card__kv">
        <div className="cream-card__row">
          <dt>Length</dt>
          <dd>{data.length}</dd>
        </div>
        <div className="cream-card__row">
          <dt>Gold</dt>
          <dd>{data.gold}</dd>
        </div>
        <div className="cream-card__row">
          <dt>Generated</dt>
          <dd>{data.generated}</dd>
        </div>
        <div className="cream-card__row">
          <dt>Correct</dt>
          <dd>{data.correct}</dd>
        </div>
      </dl>
      <div className="cream-card__divider cream-card__divider--foot" />
    </article>
  )
}

function barTooltip(d, i, fallbackLabel) {
  if (d.tooltip) return d.tooltip
  const lab = d.label || fallbackLabel || `token ${i + 1}`
  return `${lab}: ${d.value}`
}

function AttentionByTokenChart({
  title,
  subtitle,
  yMax,
  yGridTicks,
  data,
}) {
  const gridTicks = [...yGridTicks].sort((a, b) => a - b)
  const yLabels = [...yGridTicks].sort((a, b) => b - a)

  return (
    <article className="attention-panel attention-panel--chart">
      <h3 className="attention-panel__title">{title}</h3>
      <p className="attention-panel__subtitle">{subtitle}</p>
      <div
        className="attention-chart"
        role="img"
        aria-label={title}
      >
        <div className="attention-chart__y-axis" aria-hidden="true">
          {yLabels.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
        <div className="attention-chart__plot-wrap">
          <div className="attention-chart__plot">
            {gridTicks.map((t, i) => (
              <div
                key={`${t}-${i}`}
                className="attention-chart__grid-line"
                style={{ bottom: `${(t / yMax) * 100}%` }}
              />
            ))}
            <div className="attention-chart__bars">
              {data.map((d, i) => {
                const tip = barTooltip(d, i, `Token ${i + 1}`)
                const h = (d.value / yMax) * 100
                return (
                  <div key={i} className="attention-chart__col">
                    <div
                      className="attention-chart__bar-stack attention-chart__bar-stack--tip"
                      data-tooltip={tip}
                      tabIndex={0}
                      style={{ height: `${h}%` }}
                      aria-label={tip}
                    >
                      <div
                        className="attention-chart__bar"
                        style={{ height: '100%' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="attention-chart__x-labels">
            {data.map((d, i) => (
              <span
                key={i}
                className={
                  d.label
                    ? 'attention-chart__token'
                    : 'attention-chart__token attention-chart__token--muted'
                }
              >
                {d.label || '·'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function BarChartCard({
  title,
  subtitle,
  yMax,
  yGridTicks,
  data,
  summaryStats,
  ariaLabel,
  accentBars = false,
}) {
  const yLabels = [...yGridTicks].sort((a, b) => b - a)
  const gridTicksSorted = [...yGridTicks].sort((a, b) => a - b)

  return (
    <article className="attention-panel attention-panel--chart">
      <h3 className="attention-panel__title">{title}</h3>
      <p className="attention-panel__subtitle">{subtitle}</p>
      {summaryStats && summaryStats.length > 0 && (
        <div className="bar-chart-stats">
          {summaryStats.map((s) => (
            <div key={s.label} className="bar-chart-stats__item">
              <span className="bar-chart-stats__label">{s.label}</span>
              <span className="bar-chart-stats__value">{s.value}</span>
            </div>
          ))}
        </div>
      )}
      <div
        className="attention-chart"
        role="img"
        aria-label={ariaLabel}
      >
        <div className="attention-chart__y-axis" aria-hidden="true">
          {yLabels.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
        <div className="attention-chart__plot-wrap">
          <div className="attention-chart__plot">
            {gridTicksSorted.map((t, i) => (
              <div
                key={`${t}-${i}`}
                className="attention-chart__grid-line"
                style={{ bottom: `${(t / yMax) * 100}%` }}
              />
            ))}
            <div className="attention-chart__bars">
              {data.map((d, i) => {
                const tip =
                  d.tooltip ?? `${d.label}: ${d.value}`
                const h = (d.value / yMax) * 100
                return (
                  <div key={i} className="attention-chart__col">
                    <div
                      className="attention-chart__bar-stack attention-chart__bar-stack--tip"
                      data-tooltip={tip}
                      tabIndex={0}
                      style={{ height: `${h}%` }}
                      aria-label={tip}
                    >
                      <div
                        className={
                          accentBars
                            ? 'attention-chart__bar attention-chart__bar--accent'
                            : 'attention-chart__bar'
                        }
                        style={{ height: '100%' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="attention-chart__x-labels">
            {data.map((d, i) => (
              <span key={i} className="attention-chart__token">
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function AttentionSummaryCard({ data }) {
  return (
    <article className="attention-panel attention-panel--summary">
      <h3 className="attention-panel__title">Attention Summary</h3>
      <dl className="attention-summary__kv">
        <div className="attention-summary__row">
          <dt>Recent window</dt>
          <dd>{data.recentWindow}</dd>
        </div>
        <div className="attention-summary__row">
          <dt>Recency attention</dt>
          <dd>{data.recencyAttention}</dd>
        </div>
      </dl>
      <div className="attention-summary__divider" />
      <h4 className="attention-summary__subheading">Top attended tokens</h4>
      <div className="attention-summary__pills">
        {data.topTokens.map((t) => (
          <span key={`${t.text}-${t.score}`} className="attention-summary__pill">
            {t.text} {t.score}
          </span>
        ))}
      </div>
    </article>
  )
}

function ScoreCard({ data }) {
  return (
    <article className="scorecard">
      <h2 className="scorecard-title">{data.title}</h2>
      <p className="score-value">{data.score.toFixed(2)}</p>
      <div className="score-pills">
        <span className="pill z-pill">z = {data.zScore}</span>
        <span
          className="pill message-pill message-pill--tooltip"
          tabIndex={0}
          data-tooltip={data.messageDescription ?? data.message}
          aria-label={`Insight: ${data.messageDescription ?? data.message}`}
        >
          {data.message}
        </span>
      </div>

      <div className="metrics">
        <div className="metric-row">
          <span>Percentile</span>
          <strong>{data.percentile}</strong>
        </div>
        <div className="metric-row">
          <span>Typical range</span>
          <strong>{data.typicalRange}</strong>
        </div>
        <div className="metric-row">
          <span>Mean</span>
          <strong>{data.mean}</strong>
        </div>
        <div className="metric-row">
          <span>Std dev</span>
          <strong>{data.stdDev}</strong>
        </div>
        <div className="metric-row">
          <span>Min / Max</span>
          <strong>{data.minMax}</strong>
        </div>
      </div>
    </article>
  )
}

function renderSectionContent(section) {
  switch (section.layout) {
    case 'scorecards':
      return (
        <div className="scorecard-grid">
          {section.items.map((card) => (
            <ScoreCard key={card.title} data={card} />
          ))}
        </div>
      )
    case 'ooc':
      return (
        <div className="ooc-grid">
          {section.items.map((card, idx) => (
            <OutOfContextCard
              key={`${card.title}-${idx}`}
              data={card}
            />
          ))}
        </div>
      )
    case 'context':
      return (
        <div className="context-charts">
          <LongContextSummaryCard data={section.longContext} />
          <ExampleOutputsCard data={section.exampleOutputs} />
        </div>
      )
    case 'attentionRow':
      return (
        <div className="attention-charts-row">
          <AttentionByTokenChart {...section.attentionByToken} />
          <AttentionSummaryCard data={section.attentionSummary} />
        </div>
      )
    case 'barChartsRow':
      return (
        <div className="layer-uncertainty-row">
          {section.charts.map((chart) => (
            <BarChartCard key={chart.title} {...chart} />
          ))}
        </div>
      )
    default:
      return null
  }
}

function App() {
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value)
  const [isRunning, setIsRunning] = useState(false)

  function handleRun() {
    if (isRunning) return
    setIsRunning(true)
    window.setTimeout(() => {
      setIsRunning(false)
    }, 900)
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar" aria-label="Jump to section">
        <nav className="dashboard-nav">
          <p className="dashboard-nav__title">On this page</p>
          <ul className="dashboard-nav__list">
            {navSections.map((item) => (
              <li key={item.id}>
                <a className="dashboard-nav__link" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="dashboard dashboard--with-sidebar" id="main-content">
        <header className="dashboard-header">
          <div className="dashboard-header__row">
            <div className="dashboard-header__intro">
              <h1>{pageCopy.title}</h1>
              <p>{pageCopy.subtitle}</p>
            </div>
            <div className="dashboard-header__toolbar">
              <label className="model-field">
                <span className="model-field__label">Model</span>
                <select
                  className="model-field__select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  aria-label="Choose model"
                >
                  {modelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="run-button"
                onClick={handleRun}
                disabled={isRunning}
                aria-busy={isRunning}
              >
                {isRunning ? 'Running…' : 'Run'}
              </button>
            </div>
          </div>
        </header>

        {sections.map((section) => (
          <section
            key={section.id}
            className="dashboard-section"
            aria-labelledby={section.id}
          >
            <h2 id={section.id} className="dashboard-section__heading">
              {section.heading}
            </h2>
            {renderSectionContent(section)}
          </section>
        ))}
      </main>
    </div>
  )
}

export default App
