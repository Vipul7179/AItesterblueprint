const { useState, useEffect, useMemo, useRef } = React;

/* ==========================================================================
   CUSTOM FUTURISTIC AI LOGO COMPONENT
   Unique Quantum Neural Nexus Silhouette — Electric Blue, Violet & Fuchsia
   ========================================================================== */

const AILogo = ({ size = 42, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`ai-brand-logo ${className}`}
  >
    <defs>
      <linearGradient id="aiLogoGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
      <linearGradient id="aiLogoGradAccent" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <radialGradient id="aiLogoCoreGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#c7d2fe" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
      </radialGradient>
      <filter id="aiLogoDropGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#818cf8" floodOpacity="0.75" />
      </filter>
    </defs>
    
    {/* Outer Isometric Hexagonal Nexus Frame */}
    <path 
      d="M24 3L41 12.8V35.2L24 45L7 35.2V12.8L24 3Z" 
      stroke="url(#aiLogoGradPrimary)" 
      strokeWidth="2.4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="logo-outer-frame"
    />
    
    {/* Inner Prismatic Facet */}
    <path 
      d="M24 11L35 17.5V30.5L24 37L13 30.5V17.5L24 11Z" 
      fill="url(#aiLogoGradAccent)" 
      fillOpacity="0.25" 
      stroke="url(#aiLogoGradAccent)" 
      strokeWidth="1.8" 
      strokeLinejoin="round"
      className="logo-inner-core"
    />
    
    {/* Synaptic Geometric Connections */}
    <line x1="24" y1="3" x2="24" y2="11" stroke="url(#aiLogoGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="41" y1="12.8" x2="35" y2="17.5" stroke="url(#aiLogoGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="41" y1="35.2" x2="35" y2="30.5" stroke="url(#aiLogoGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="45" x2="24" y2="37" stroke="url(#aiLogoGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="35.2" x2="13" y2="30.5" stroke="url(#aiLogoGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="12.8" x2="13" y2="17.5" stroke="url(#aiLogoGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
    
    {/* Central High-Energy Spark Core */}
    <path 
      d="M24 17L25.8 22.2L31 24L25.8 25.8L24 31L22.2 25.8L17 24L22.2 22.2L24 17Z" 
      fill="url(#aiLogoCoreGlow)" 
      filter="url(#aiLogoDropGlow)"
      className="logo-central-spark"
    />
    
    {/* Vertex Synaptic Nodes */}
    <circle cx="24" cy="3" r="2.2" fill="#38bdf8" />
    <circle cx="41" cy="12.8" r="2.2" fill="#818cf8" />
    <circle cx="41" cy="35.2" r="2.2" fill="#c084fc" />
    <circle cx="24" cy="45" r="2.2" fill="#f43f5e" />
    <circle cx="7" cy="35.2" r="2.2" fill="#8b5cf6" />
    <circle cx="7" cy="12.8" r="2.2" fill="#38bdf8" />
    <circle cx="24" cy="24" r="2" fill="#ffffff" />
  </svg>
);

/* ==========================================================================
   INLINE SVG ICONS (Crisp, High-Performance, Zero-Dependency)
   ========================================================================== */

const Icons = {
  Workflow: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1"/>
      <rect x="15" y="3" width="6" height="6" rx="1"/>
      <rect x="9" y="15" width="6" height="6" rx="1"/>
      <path d="M6 9v3a3 3 0 0 0 3 3h3"/>
      <path d="M18 9v3a3 3 0 0 1-3 3"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Copy: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
  Download: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  FileText: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Code: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Cpu: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/>
      <line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/>
      <line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/>
      <line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/>
      <line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  Key: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 2-2 2m-1.5 1.5L16 7l-1.5-1.5M7.5 14.5 4 18v2h2v-2l1.5-1.5"/>
      <circle cx="15.5" cy="8.5" r="4.5"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  ),
  GitHub: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  Portfolio: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  )
};

/* ==========================================================================
   ANIMATED MILKY WAY CANVAS COMPONENT
   Real-Time Twinkling Starfield, Cosmic Dust & Reduced-Motion Detection
   ========================================================================== */

function GalaxyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars clustered along deep space and diagonal Milky Way corridor
    const STAR_COUNT = 190;
    const stars = [];
    const colors = ['#ffffff', '#c7d2fe', '#818cf8', '#38bdf8', '#fbcfe8', '#fef3c7'];

    for (let i = 0; i < STAR_COUNT; i++) {
      // 45% of stars concentrated along the diagonal Milky Way band
      const inGalaxyBand = Math.random() < 0.45;
      let x, y;
      if (inGalaxyBand) {
        const progress = Math.random() * (canvas.width + 500) - 250;
        const spread = (Math.random() - 0.5) * 380;
        x = progress;
        y = progress * 0.62 + spread;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      }

      stars.push({
        x,
        y,
        radius: Math.random() * 1.5 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.65 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        phase: Math.random() * Math.PI * 2
      });
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha = prefersReducedMotion 
          ? star.baseAlpha 
          : Math.max(0.1, Math.min(1, star.baseAlpha + Math.sin(time * star.twinkleSpeed * 45 + star.phase) * 0.38));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle atmospheric glow halo for prominent stars
        if (star.radius > 1.25) {
          ctx.globalAlpha = alpha * 0.28;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="galaxy-stars-canvas" />;
}

/* ==========================================================================
   MAIN REACT APPLICATION COMPONENT
   ========================================================================== */

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [issueKey, setIssueKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0); // 0 = idle, 1 = Jira Fetch, 2 = AI Generation
  const [error, setError] = useState(null);
  const [jiraIssue, setJiraIssue] = useState(null);
  const [testPlan, setTestPlan] = useState(null);
  const [config, setConfig] = useState(null);
  const [connStatus, setConnStatus] = useState(null);
  const [testingConn, setTestingConn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [planViewMode, setPlanViewMode] = useState('formatted'); // 'formatted' | 'raw'

  // Load configuration from server on mount
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Config fetch failed:', err));
  }, []);

  // Safe markdown parser
  const parsedMarkdownHtml = useMemo(() => {
    if (!testPlan) return '';
    try {
      if (window.marked && window.DOMPurify) {
        const rawHtml = window.marked.parse(testPlan, { gfm: true, breaks: true });
        return window.DOMPurify.sanitize(rawHtml);
      }
      return testPlan;
    } catch (e) {
      console.warn('Markdown parsing fallback:', e);
      return testPlan;
    }
  }, [testPlan]);

  // Test Jira Connection handler
  const handleTestConnection = async () => {
    setTestingConn(true);
    setConnStatus(null);
    try {
      const res = await fetch('/api/test-connection');
      const data = await res.json();
      setConnStatus(data);
    } catch (err) {
      setConnStatus({ success: false, message: err.message });
    } finally {
      setTestingConn(false);
    }
  };

  // Generate Test Plan handler with multi-stage progress
  const handleGenerate = async (targetKey = issueKey) => {
    const key = (targetKey || '').trim();
    if (!key) {
      setError('Please enter a valid Jira Issue ID (e.g., KAN-1)');
      return;
    }

    setLoading(true);
    setLoadingStage(1); // Stage 1: Jira Cloud API
    setError(null);
    setTestPlan(null);

    try {
      // Step 1: Fetch issue from Jira Cloud REST API
      const issueRes = await fetch('/api/jira/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueKey: key })
      });

      const issueData = await issueRes.json();
      if (!issueRes.ok) {
        throw new Error(issueData.error || 'Failed to retrieve Jira issue.');
      }

      setJiraIssue(issueData.issue);

      // Step 2: Generate Test Plan with AI Engine
      setLoadingStage(2); // Stage 2: AI Plan Generation
      const planRes = await fetch('/api/testplan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue: issueData.issue })
      });

      const planData = await planRes.json();
      if (!planRes.ok) {
        throw new Error(planData.error || 'Failed to generate test plan.');
      }

      setTestPlan(planData.testPlan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingStage(0);
    }
  };

  // Clipboard copy action
  const copyToClipboard = () => {
    if (!testPlan) return;
    navigator.clipboard.writeText(testPlan).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Markdown file download action
  const downloadMarkdown = () => {
    if (!testPlan) return;
    const blob = new Blob([testPlan], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TestPlan_${jiraIssue?.key || 'Plan'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      {/* Immersive Animated Milky Way Galaxy Background */}
      <div className="background-canvas">
        <GalaxyCanvas />

        {/* Diagonal Milky Way Core Galactic Dust Band */}
        <div className="milky-way-band"></div>

        {/* Glowing Atmospheric Nebula Clouds */}
        <div className="nebula-cloud nebula-violet"></div>
        <div className="nebula-cloud nebula-cyan"></div>
        <div className="nebula-cloud nebula-indigo"></div>

        {/* Periodic Cosmic Shooting Stars */}
        <div className="shooting-star-streak streak-1"></div>
        <div className="shooting-star-streak streak-2"></div>
        <div className="shooting-star-streak streak-3"></div>

        {/* Grid and Vignette Layers */}
        <div className="grid-overlay"></div>
        <div className="space-vignette"></div>
      </div>

      {/* Modern SaaS Navigation Header */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="brand-wrapper" onClick={() => setActiveTab('generator')} title="Test Plan Generator">
            <div className="brand-icon-container">
              <AILogo size={38} />
            </div>
            <div className="brand-details">
              <h1>
                Test Plan Generator
                <span className="header-status-pill">
                  <span className="pulse-beacon">
                    <span className="pulse-dot"></span>
                    <span className="pulse-ring"></span>
                  </span>
                  AI Online
                </span>
              </h1>
              <p>Intelligent QA Test Planning Agent</p>
            </div>
          </div>
        </div>

        <div className="nav-tabs">
          <button
            className={`nav-btn ${activeTab === 'generator' ? 'active' : ''}`}
            onClick={() => setActiveTab('generator')}
          >
            <Icons.Layers />
            <span>Generator</span>
          </button>
          <button
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Icons.Settings />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'generator' ? (
          <div>
            {/* Animated Hero Section */}
            <section className="hero-section">
              <div className="hero-pill-badge">
                <Icons.Sparkles />
                <span>Enterprise QA Automation Agent</span>
              </div>
              <h2 className="hero-title">
                Plan Smarter. <span className="gradient-text">Test Better.</span>
              </h2>
              <p className="hero-subtitle">
                Transform Jira requirements into comprehensive, intelligent QA test plans with the power of AI.
              </p>
              <div className="hero-badges-row">
                <span className="feature-tag tag-float-1">⚡ Groq Llama 3.3 70B</span>
                <span className="feature-tag tag-float-2">🎯 RICE-POT Template</span>
                <span className="feature-tag tag-float-3">🔒 Atlassian REST v3</span>
                <span className="feature-tag tag-float-4">🛡️ Human Review Gate</span>
              </div>
            </section>

            {/* Jira Issue Generator Centerpiece Card */}
            <div className="glass-card glass-card-elevated" style={{ marginBottom: '1.75rem' }}>
              <div className="card-header-styled">
                <div className="card-title-group">
                  <h3>
                    <Icons.Sparkles />
                    Generate Your Test Plan
                  </h3>
                  <p>
                    Retrieve requirements directly from your Jira Cloud workspace and generate a structured enterprise test plan.
                  </p>
                </div>
              </div>

              <div className="generator-input-wrapper">
                <div className="search-input-group">
                  <div className="input-icon-slot">
                    <Icons.Search />
                  </div>
                  <input
                    type="text"
                    className="search-input-field"
                    placeholder="Enter Jira Issue Key (e.g. KAN-1, VWO-101, AUTH-42)..."
                    value={issueKey}
                    onChange={(e) => setIssueKey(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
                    disabled={loading}
                    aria-label="Jira Issue Key"
                  />
                  <button
                    className="btn-generate"
                    onClick={() => handleGenerate()}
                    disabled={loading || !issueKey.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-dual"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Workflow />
                        <span>Generate Plan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Sample Chips */}
                <div className="quick-samples-bar">
                  <span className="quick-samples-label">Quick samples:</span>
                  {['KAN-1', 'VWO-101', 'AUTH-42'].map(sample => (
                    <button
                      key={sample}
                      type="button"
                      className="sample-chip"
                      onClick={() => {
                        setIssueKey(sample);
                        handleGenerate(sample);
                      }}
                      disabled={loading}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Stage Loading Experience */}
              {loading && (
                <div className="loading-container">
                  <div className="loading-steps-row">
                    <div className={`loading-step-item ${loadingStage >= 1 ? (loadingStage > 1 ? 'completed' : 'active') : ''}`}>
                      <div className="step-indicator">
                        {loadingStage > 1 ? <Icons.Check /> : '1'}
                      </div>
                      <span>Connecting to Jira & retrieving issue</span>
                    </div>
                    <div className={`loading-step-item ${loadingStage >= 2 ? 'active' : ''}`}>
                      <div className="step-indicator">2</div>
                      <span>Analyzing requirements & generating test plan</span>
                    </div>
                  </div>
                  <div className="loading-progress-track">
                    <div 
                      className="loading-progress-bar" 
                      style={{ width: loadingStage === 1 ? '50%' : '90%' }}
                    ></div>
                  </div>
                  <div className="loading-status-text">
                    <span className="spinner-dual" style={{ width: '14px', height: '14px' }}></span>
                    <span>
                      {loadingStage === 1 
                        ? 'Authenticating with Jira Cloud REST v3...' 
                        : 'Applying RICE-POT template with Groq Llama 3.3 70B...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="alert-box alert-error">
                <Icons.AlertTriangle />
                <div>
                  <strong>Generation Error: </strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Jira Issue Metadata Preview Card */}
            {jiraIssue && (
              <div className="glass-card issue-preview-card" style={{ marginBottom: '1.75rem' }}>
                <div className="issue-badges-row">
                  <span className="badge-tag badge-key">{jiraIssue.key}</span>
                  <span className="badge-tag badge-type">{jiraIssue.issueType || 'Task'}</span>
                  <span className="badge-tag badge-status">{jiraIssue.status || 'Active'}</span>
                  {jiraIssue.priority && (
                    <span className="badge-tag badge-priority">{jiraIssue.priority}</span>
                  )}
                  {jiraIssue.url && (
                    <a 
                      href={jiraIssue.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="feature-tag"
                      style={{ marginLeft: 'auto', textDecoration: 'none' }}
                    >
                      <span>Open in Jira</span>
                      <Icons.ExternalLink />
                    </a>
                  )}
                </div>
                <h3 className="issue-summary-title">{jiraIssue.summary}</h3>
                {jiraIssue.description && (
                  <div className="issue-description-box">
                    <strong>Description:</strong> {jiraIssue.description}
                  </div>
                )}
              </div>
            )}

            {/* Generated Test Plan Display */}
            {testPlan && (
              <div className="glass-card plan-output-card" style={{ animation: 'cardReveal 0.45s ease-out' }}>
                <div className="card-header-styled">
                  <div className="card-title-group">
                    <h3>
                      <Icons.FileText />
                      Generated Test Plan
                    </h3>
                    <p>Standard RICE-POT / QA Review Template — 8 Structured Sections</p>
                  </div>
                  <div className="plan-header-actions">
                    <button
                      className={`btn-action ${planViewMode === 'formatted' ? 'active-mode' : ''}`}
                      onClick={() => setPlanViewMode('formatted')}
                      title="Rich Formatted View"
                    >
                      <Icons.FileText />
                      <span>Formatted</span>
                    </button>
                    <button
                      className={`btn-action ${planViewMode === 'raw' ? 'active-mode' : ''}`}
                      onClick={() => setPlanViewMode('raw')}
                      title="Raw Markdown View"
                    >
                      <Icons.Code />
                      <span>Raw Markdown</span>
                    </button>
                    <button className="btn-action" onClick={copyToClipboard}>
                      {copied ? (
                        <>
                          <Icons.Check />
                          <span style={{ color: '#34d399' }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Icons.Copy />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button className="btn-action btn-action-primary" onClick={downloadMarkdown}>
                      <Icons.Download />
                      <span>Download .md</span>
                    </button>
                  </div>
                </div>

                {/* Plan Content Presentation */}
                {planViewMode === 'formatted' ? (
                  <div className="plan-display-container">
                    <div 
                      className="formatted-markdown"
                      dangerouslySetInnerHTML={{ __html: parsedMarkdownHtml }}
                    />
                  </div>
                ) : (
                  <div className="raw-markdown-view">
                    {testPlan}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ==========================================================================
             SETTINGS TAB (Personal Jira Email Protected & Hidden)
             ========================================================================== */
          <div className="glass-card settings-view-card">
            <div className="card-header-styled">
              <div className="card-title-group">
                <h2>
                  <Icons.Settings />
                  System Configuration & Integrations
                </h2>
                <p>Environment parameters configured securely in parent .env file</p>
              </div>
              <button
                className="btn-generate"
                onClick={handleTestConnection}
                disabled={testingConn}
              >
                {testingConn ? (
                  <>
                    <span className="spinner-dual"></span>
                    <span>Testing Connection...</span>
                  </>
                ) : (
                  <>
                    <Icons.Refresh />
                    <span>Test Jira Connection</span>
                  </>
                )}
              </button>
            </div>

            {/* Connection Test Result Feedback (Email completely hidden from banner) */}
            {connStatus && (
              <div className={`alert-box ${connStatus.success ? 'alert-success' : 'alert-error'}`}>
                {connStatus.success ? <Icons.Check /> : <Icons.AlertTriangle />}
                <div>
                  <strong>{connStatus.success ? 'Authentication Verified: ' : 'Connection Failed: '}</strong>
                  <span>
                    {connStatus.success
                      ? `Authenticated as ${connStatus.displayName || 'Authorized Account'} with Jira Cloud REST API v3.`
                      : connStatus.message}
                  </span>
                </div>
              </div>
            )}

            {/* Settings Overview Cards (Email Card Fully Removed) */}
            <div className="settings-grid-layout">
              <div className="setting-card">
                <div className="setting-card-header">
                  <span className="setting-label-text">Jira Workspace URL</span>
                  <Icons.Globe />
                </div>
                <div className="setting-card-value">
                  {config?.jiraUrl || 'https://vpsvipulsingh100.atlassian.net'}
                </div>
                <div className="setting-card-desc">Atlassian Cloud Instance endpoint</div>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <span className="setting-label-text">Jira API Token</span>
                  <Icons.Key />
                </div>
                <div className="setting-card-value">
                  {config?.hasJiraToken ? (
                    <span className="status-badge-active">
                      <Icons.Check />
                      Configured & Protected
                    </span>
                  ) : (
                    <span style={{ color: '#f87171' }}>Missing in .env</span>
                  )}
                </div>
                <div className="setting-card-desc">Loaded on backend, never exposed to client</div>
              </div>

              <div className="setting-card">
                <div className="setting-card-header">
                  <span className="setting-label-text">AI Generation Engine</span>
                  <Icons.Cpu />
                </div>
                <div className="setting-card-value" style={{ color: '#a5b4fc' }}>
                  {config?.aiProvider || 'Groq Llama 3.3 70B'}
                </div>
                <div className="setting-card-desc">Deterministic QA fallback engine ready</div>
              </div>
            </div>

            {/* Zero-Leak Security Guarantee Card */}
            <div className="security-banner">
              <div className="security-icon-badge">
                <Icons.Shield />
              </div>
              <div className="security-text">
                <h4>Parent Environment Security & Credential Isolation</h4>
                <p>
                  API tokens and credentials reside strictly in the parent <code>.env</code> file. 
                  Zero sensitive authentication material is sent to or stored in client browser storage or DOM tree.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================================================
          DEVELOPER BRANDING FOOTER (Vipul Singh)
          Displayed seamlessly across Generator & Settings pages
          ========================================================================== */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-developer">
            <span className="dev-credit-label">Developed by</span>
            <span className="dev-credit-name">Vipul Singh</span>
          </div>

          <div className="footer-links">
            <a 
              href="https://www.linkedin.com/in/vipul-singh-46792a1a4/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link-pill"
              aria-label="Vipul Singh on LinkedIn"
            >
              <Icons.LinkedIn />
              <span>LinkedIn</span>
            </a>

            <a 
              href="https://github.com/Vipulprof" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link-pill"
              aria-label="Vipul Singh on GitHub"
            >
              <Icons.GitHub />
              <span>GitHub</span>
            </a>

            <a 
              href="https://vipulqa.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link-pill"
              aria-label="Vipul Singh Portfolio Website"
            >
              <Icons.Portfolio />
              <span>Portfolio</span>
            </a>
          </div>

          <div className="footer-meta">
            <span>Intelligent Test Planning AI Agent • Enterprise QA Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Mount the React Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
