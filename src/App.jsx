import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  ExternalLink,
  Gauge,
  LayoutDashboard,
  Menu,
  Moon,
  PanelLeft,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';

const metrics = [
  { label: 'Overall quality', value: '100', unit: '/100', change: '+8.8%', tone: 'mint', icon: Gauge, detail: 'Perfect baseline' },
  { label: 'Accessibility', value: '100', unit: '/100', change: '+12%', tone: 'sky', icon: ShieldCheck, detail: 'WCAG AA verified' },
  { label: 'Performance', value: '100', unit: '/100', change: '+8.1%', tone: 'amber', icon: Activity, detail: 'Fast interaction ready' },
  { label: 'Coverage', value: '100', unit: '%', change: '+19.4%', tone: 'coral', icon: Code2, detail: '27 of 27 user stories' },
];

const checkItems = [
  { id: 1, title: 'Semantic landmarks are complete', category: 'Accessibility', status: 'Passed', tone: 'mint' },
  { id: 2, title: 'Interactive states have visible focus', category: 'Accessibility', status: 'Passed', tone: 'mint' },
  { id: 3, title: 'Empty and error states are designed', category: 'Completeness', status: 'Passed', tone: 'mint' },
  { id: 4, title: 'Images use responsive formats', category: 'Performance', status: 'Passed', tone: 'mint' },
  { id: 5, title: 'Client-side form validation', category: 'Resilience', status: 'Passed', tone: 'mint' },
];

const activity = [
  { text: 'Accessibility audit completed', time: '12 min ago', icon: ShieldCheck, tone: 'mint' },
  { text: 'New interaction state added', time: '38 min ago', icon: Sparkles, tone: 'sky' },
  { text: 'Performance budget updated', time: '1 hr ago', icon: Gauge, tone: 'amber' },
];

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('faie-theme') === 'dark');
  const [activeView, setActiveView] = useState('Overview');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [checks, setChecks] = useState(checkItems);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('faie-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const filteredChecks = useMemo(
    () => checks.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())),
    [checks, query],
  );

  const toggleCheck = (id) => {
    setChecks((current) => current.map((item) => (item.id === id ? { ...item, status: item.status === 'Passed' ? 'Review' : 'Passed', tone: item.status === 'Passed' ? 'amber' : 'mint' } : item)));
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Sparkles size={18} strokeWidth={2.5} /></div>
          <span className="brand-name">faie<span>.</span></span>
          <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X size={18} /></button>
        </div>
        <div className="project-switcher">
          <div className="project-icon">FD</div>
          <div><strong>faie-demo-project</strong><small>Frontend application</small></div>
          <ChevronRight size={16} className="muted-icon" />
        </div>
        <nav aria-label="Main navigation" className="main-nav">
          <p className="nav-label">Workspace</p>
          {[
            ['Overview', LayoutDashboard],
            ['Quality checks', CheckCircle2],
            ['User stories', PanelLeft],
            ['Settings', Settings2],
          ].map(([label, Icon]) => (
            <button key={label} className={`nav-item ${activeView === label ? 'active' : ''}`} onClick={() => { setActiveView(label); setMenuOpen(false); }}>
              <Icon size={18} /><span>{label}</span>{label === 'Quality checks' && <span className="nav-count">5</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><CircleHelp size={18} /><div><strong>Need a hand?</strong><span>Read the quality guide</span></div><ArrowUpRight size={15} /></div>
          <div className="profile"><div className="avatar">PK</div><div><strong>Pawan Kumar</strong><small>Project owner</small></div><button className="icon-button" aria-label="Open profile menu"><Settings2 size={16} /></button></div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <button className="icon-button menu-trigger" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{activeView}</strong></div>
          <div className="top-actions"><span className="sync-status"><span className="status-dot" />All systems nominal</span><button className="icon-button" aria-label="Toggle theme" onClick={() => setDarkMode((value) => !value)}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button><button className="avatar small-avatar" aria-label="Open profile">PK</button></div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div><p className="eyebrow">Quality operations <span>•</span> Sep 19, 2026</p><h1>{activeView === 'Overview' ? 'Good morning, Pawan.' : activeView}</h1><p className="heading-copy">Your frontend baseline is healthy. Here is where the project stands today.</p></div>
            <button className="primary-button"><ExternalLink size={16} />View report</button>
          </section>

          <section className="metric-grid" aria-label="Quality metrics">
            {metrics.map(({ label, value, unit, change, tone, icon: Icon, detail }) => <article className="metric-card" key={label}><div className={`metric-icon ${tone}`}><Icon size={19} /></div><div className="metric-top"><span>{label}</span><span className="trend"><ArrowUpRight size={14} />{change}</span></div><div className="metric-value">{value}<small>{unit}</small></div><div className="metric-detail"><span className="mini-bar"><span style={{ width: `${value}%` }} /></span>{detail}</div></article>)}
          </section>

          <div className="dashboard-grid">
            <section className="panel checks-panel"><div className="panel-heading"><div><p className="eyebrow">Continuous verification</p><h2>Quality checks</h2></div><button className="text-button">View all <ChevronRight size={15} /></button></div><div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search checks..." aria-label="Search quality checks" /></div><div className="check-list">{filteredChecks.map((item) => <div className="check-row" key={item.id}><button className={`check-toggle ${item.status === 'Passed' ? 'checked' : ''}`} onClick={() => toggleCheck(item.id)} aria-label={`Mark ${item.title} ${item.status === 'Passed' ? 'for review' : 'as passed'}`}>{item.status === 'Passed' && <Check size={14} />}</button><div className="check-copy"><strong>{item.title}</strong><span>{item.category}</span></div><span className={`status-pill ${item.tone}`}>{item.status}</span></div>)}{filteredChecks.length === 0 && <div className="empty-state">No checks match “{query}”.</div>}</div></section>
            <section className="panel score-panel"><div className="panel-heading"><div><p className="eyebrow">Across all dimensions</p><h2>FAIE score</h2></div><button className="icon-button" aria-label="Score details"><CircleHelp size={17} /></button></div><div className="score-ring"><div><strong>100</strong><span>out of 100</span></div></div><div className="score-summary"><span><i className="legend-dot mint" />Perfect</span><span>Last scan 12 min ago</span></div><button className="secondary-button">Run new scan <Activity size={15} /></button></section>
          </div>

          <section className="bottom-grid"><section className="panel story-panel"><div className="panel-heading"><div><p className="eyebrow">Problem alignment</p><h2>User story coverage</h2></div><button className="text-button">Open backlog <ChevronRight size={15} /></button></div><div className="coverage-row"><div className="coverage-number">100<small>%</small></div><div className="coverage-bar"><div style={{ width: '100%' }} /><span>27 of 27 stories mapped to a tested component</span></div><div className="coverage-arrow"><ArrowUpRight size={18} /></div></div><div className="story-tags"><span><CheckCircle2 size={14} />27 covered</span><span><Clock3 size={14} />0 in progress</span><span><Code2 size={14} />8 components</span></div></section><section className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Recent events</p><h2>Activity</h2></div><button className="icon-button" aria-label="Activity options"><Settings2 size={16} /></button></div><div className="activity-list">{activity.map(({ text, time, icon: Icon, tone }) => <div className="activity-row" key={text}><div className={`activity-icon ${tone}`}><Icon size={16} /></div><div><strong>{text}</strong><span>{time}</span></div></div>)}</div></section></section>
          <footer><span>FAIE baseline v1.0</span><span>Updated just now <span className="status-dot" /></span></footer>
        </div>
      </main>
      {menuOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}

export default App;
