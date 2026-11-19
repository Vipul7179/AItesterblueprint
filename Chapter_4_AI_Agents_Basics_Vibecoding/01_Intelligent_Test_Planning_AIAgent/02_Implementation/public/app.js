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
   INLINE SVG ICONS (Crisp, Zero-Dependency)
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
  Lock: (props) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" y1="2" x2="22" y2="22"/>
    </svg>
  ),
  Server: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
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

    const STAR_COUNT = 190;
    const stars = [];
    const colors = ['#ffffff', '#c7d2fe', '#818cf8', '#38bdf8', '#fbcfe8', '#fef3c7'];

    for (let i = 0; i < STAR_COUNT; i++) {
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
   URL ROUTING HELPERS (Native HTML5 History API — Zero External Dependencies)
   Preserves route on page refresh, direct URL load & Back/Forward buttons
   ========================================================================== */

function getRouteFromLocation() {
  try {
    const pathname = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
    const hash = (window.location.hash || '').toLowerCase().replace(/^#\/?/, '');
    
    if (pathname === '/settings' || hash === 'settings') {
      return 'settings';
    }
  } catch (e) {
    console.warn('Route parsing fallback:', e);
  }
  return 'generator';
}

/* ==========================================================================
   FORM VALIDATION HELPERS
   ========================================================================== */

function validateJiraUrl(url) {
  if (!url || !url.trim()) {
    return 'Jira Workspace URL is required.';
  }
  const trimmed = url.trim();
  try {
    const formatted = trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return 'URL must use http:// or https:// protocol.';
    }
    if (!parsed.hostname || (!parsed.hostname.includes('.') && parsed.hostname !== 'localhost')) {
      return 'Please enter a valid Jira Cloud URL (e.g. https://your-workspace.atlassian.net).';
    }
    return null;
  } catch {
    return 'Please enter a valid Jira Cloud URL (e.g. https://your-workspace.atlassian.net).';
  }
}

function validateJiraEmail(email) {
  if (!email || !email.trim()) {
    return 'Jira Account Email is required.';
  }
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g. user@company.com).';
  }
  return null;
}

function validateJiraToken(token, hasExistingToken) {
  const trimmed = (token || '').trim();
  if (!hasExistingToken && !trimmed) {
    return 'Jira API Token is required for initial configuration.';
  }
  return null;
}

/* ==========================================================================
   MAIN REACT APPLICATION COMPONENT
   ========================================================================== */

function App() {
  // Initialize route directly from browser URL (preserves route on page refresh)
  const [activeTab, setActiveTab] = useState(() => getRouteFromLocation());
  const [issueKey, setIssueKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0); // 0 = idle, 1 = Jira Fetch, 2 = AI Generation
  const [error, setError] = useState(null);
  const [jiraIssue, setJiraIssue] = useState(null);
  const [testPlan, setTestPlan] = useState(null);
  const [config, setConfig] = useState(null);
  const [copied, setCopied] = useState(false);
  const [planViewMode, setPlanViewMode] = useState('formatted'); // 'formatted' | 'raw'

  // Navigate with HTML5 pushState so URL bar, Back/Forward, and bookmarks stay in sync
  const navigateTo = (tab, replace = false) => {
    setActiveTab(tab);
    try {
      const targetPath = tab === 'settings' ? '/settings' : '/';
      if (window.location.pathname !== targetPath) {
        if (replace) {
          window.history.replaceState({ tab }, '', targetPath);
        } else {
          window.history.pushState({ tab }, '', targetPath);
        }
      }
    } catch (e) {
      // Graceful fallback for restricted environments
      window.location.hash = tab === 'settings' ? 'settings' : '';
    }
  };

  // Synchronize browser Back and Forward navigation events
  useEffect(() => {
    const handlePopState = (e) => {
      const route = (e.state && e.state.tab) || getRouteFromLocation();
      setActiveTab(route);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Ensure the initial history state entry has the current tab stored
    try {
      const currentRoute = getRouteFromLocation();
      const currentPath = currentRoute === 'settings' ? '/settings' : '/';
      if (window.location.pathname !== currentPath && !window.location.hash) {
        window.history.replaceState({ tab: currentRoute }, '', currentPath);
      } else {
        window.history.replaceState({ tab: currentRoute }, '', window.location.href);
      }
    } catch (e) {}

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title dynamically based on active route
  useEffect(() => {
    document.title = activeTab === 'settings'
      ? 'Settings — Intelligent QA AI Agent'
      : 'Test Plan Generator — Intelligent QA AI Agent';
  }, [activeTab]);

  // Settings State: Jira
  const [jiraUrl, setJiraUrl] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [showJiraToken, setShowJiraToken] = useState(false);
  const [jiraTesting, setJiraTesting] = useState(false);
  const [jiraSaving, setJiraSaving] = useState(false);
  const [jiraStatus, setJiraStatus] = useState(null);
  const [jiraFieldErrors, setJiraFieldErrors] = useState({});

  // Settings State: LLM
  const [llmProvider, setLlmProvider] = useState('groq'); // 'groq' | 'ollama'
  const [groqApiKey, setGroqApiKey] = useState('');
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [groqModel, setGroqModel] = useState('llama-3.3-70b-versatile');
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [ollamaModel, setOllamaModel] = useState('llama3');
  const [llmTesting, setLlmTesting] = useState(false);
  const [llmSaving, setLlmSaving] = useState(false);
  const [llmStatus, setLlmStatus] = useState(null);

  // Settings State: Reset
  const [resetting, setResetting] = useState(false);
  const [resetStatus, setResetStatus] = useState(null);

  // Load configuration from server on mount
  const fetchConfig = () => {
    fetch('/api/config', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        // Only populate URL and Email if user explicitly configured custom values in their session
        if (data.jira?.baseUrl) {
          setJiraUrl(data.jira.baseUrl);
        }
        if (data.jira?.email) {
          setJiraEmail(data.jira.email);
        }
        // Always keep secret fields blank on reopening settings!
        setJiraToken('');
        setGroqApiKey('');

        if (data.llm?.provider) {
          setLlmProvider(data.llm.provider);
        } else if (data.aiProvider) {
          const isOllama = data.aiProvider.toLowerCase().includes('ollama');
          setLlmProvider(isOllama ? 'ollama' : 'groq');
        }
        if (data.llm?.groqModel || data.groqModel) {
          setGroqModel(data.llm?.groqModel || data.groqModel);
        }
        if (data.llm?.ollamaUrl || data.ollamaUrl) {
          setOllamaUrl(data.llm?.ollamaUrl || data.ollamaUrl);
        }
        if (data.llm?.ollamaModel || data.ollamaModel) {
          setOllamaModel(data.llm?.ollamaModel || data.ollamaModel);
        }
      })
      .catch(err => console.error('Config fetch failed:', err));
  };

  useEffect(() => {
    fetchConfig();
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

  // Handler: Test Jira Connection
  const handleTestJira = async () => {
    const hasExistingToken = Boolean(config?.hasJiraToken || config?.jira?.hasToken);
    const typedUrl = jiraUrl.trim();
    const typedEmail = jiraEmail.trim();
    const typedToken = jiraToken.trim();

    // If user typed in fields, validate before testing
    if (typedUrl || typedEmail || typedToken) {
      const urlErr = validateJiraUrl(typedUrl);
      const emailErr = validateJiraEmail(typedEmail);
      const tokenErr = validateJiraToken(typedToken, hasExistingToken);

      const errors = {};
      if (urlErr) errors.url = urlErr;
      if (emailErr) errors.email = emailErr;
      if (tokenErr) errors.token = tokenErr;

      setJiraFieldErrors(errors);
      if (Object.keys(errors).length > 0) {
        setJiraStatus({
          success: false,
          message: Object.values(errors)[0]
        });
        return;
      }
    }

    setJiraTesting(true);
    setJiraStatus(null);
    try {
      let cleanUrl = typedUrl;
      if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = `https://${cleanUrl}`;
      }

      const payload = {};
      if (cleanUrl) payload.baseUrl = cleanUrl;
      if (typedEmail) payload.email = typedEmail;
      if (typedToken) payload.token = typedToken;

      const res = await fetch('/api/test-connection/jira', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setJiraStatus({
          success: true,
          message: data.message || 'Successfully connected to Jira Cloud REST v3. Workspace is authorized and healthy.'
        });
      } else {
        setJiraStatus({
          success: false,
          message: data.message || data.error || 'Connection failed. Please verify credentials.'
        });
        if (data.fieldErrors) {
          setJiraFieldErrors(data.fieldErrors);
        }
      }
    } catch (err) {
      setJiraStatus({ success: false, message: `Connection test error: ${err.message}` });
    } finally {
      setJiraTesting(false);
    }
  };

  // Handler: Save Jira Settings to Encrypted Session Cookie
  const handleSaveJira = async () => {
    const hasExistingToken = Boolean(config?.hasJiraToken || config?.jira?.hasToken);
    const urlErr = validateJiraUrl(jiraUrl);
    const emailErr = validateJiraEmail(jiraEmail);
    const tokenErr = validateJiraToken(jiraToken, hasExistingToken);

    const errors = {};
    if (urlErr) errors.url = urlErr;
    if (emailErr) errors.email = emailErr;
    if (tokenErr) errors.token = tokenErr;

    setJiraFieldErrors(errors);
    setJiraStatus(null);

    // Stop execution immediately if validation fails
    if (Object.keys(errors).length > 0) {
      return;
    }

    let cleanUrl = jiraUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    setJiraSaving(true);
    try {
      const res = await fetch('/api/settings/jira', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          baseUrl: cleanUrl,
          email: jiraEmail.trim(),
          token: jiraToken.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setJiraStatus({ 
          success: true, 
          message: 'Jira configuration securely saved and encrypted for your active session.' 
        });
        setJiraToken(''); // Clear plain text token from memory
        setJiraFieldErrors({});
        fetchConfig();
      } else {
        setJiraStatus({
          success: false,
          message: data.error || (data.errors ? Object.values(data.errors).join(', ') : 'Failed to save Jira settings.')
        });
        if (data.fieldErrors) {
          setJiraFieldErrors(data.fieldErrors);
        }
      }
    } catch (err) {
      setJiraStatus({ success: false, message: `Save error: ${err.message}` });
    } finally {
      setJiraSaving(false);
    }
  };

  // Handler: Test LLM Connection
  const handleTestLlm = async () => {
    setLlmTesting(true);
    setLlmStatus(null);
    try {
      const payload = {
        provider: llmProvider,
        groqApiKey: groqApiKey.trim(),
        groqModel: groqModel.trim(),
        ollamaUrl: ollamaUrl.trim(),
        ollamaModel: ollamaModel.trim()
      };
      const res = await fetch('/api/test-connection/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setLlmStatus(data);
    } catch (err) {
      setLlmStatus({ success: false, message: err.message });
    } finally {
      setLlmTesting(false);
    }
  };

  // Handler: Save LLM Settings to Encrypted Session Cookie
  const handleSaveLlm = async () => {
    setLlmSaving(true);
    setLlmStatus(null);
    try {
      const payload = {
        provider: llmProvider,
        groqApiKey: groqApiKey.trim(),
        groqModel: groqModel.trim(),
        ollamaUrl: ollamaUrl.trim(),
        ollamaModel: ollamaModel.trim()
      };
      const res = await fetch('/api/settings/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setLlmStatus({ 
          success: true, 
          message: `AI provider (${llmProvider.toUpperCase()}) settings securely saved for your active session.` 
        });
        setGroqApiKey(''); // Clear plain text API key from memory
        fetchConfig();
      } else {
        setLlmStatus({ success: false, message: data.error || 'Failed to save LLM settings.' });
      }
    } catch (err) {
      setLlmStatus({ success: false, message: err.message });
    } finally {
      setLlmSaving(false);
    }
  };

  // Handler: Reset Settings to System Defaults
  const handleResetSettings = async () => {
    if (!window.confirm('Reset all custom settings and restore system defaults?')) return;
    setResetting(true);
    setResetStatus(null);
    try {
      const res = await fetch('/api/settings/reset', {
        method: 'POST',
        credentials: 'same-origin'
      });
      const data = await res.json();
      if (data.success) {
        setResetStatus({ success: true, message: 'Custom credentials cleared. Reverted to defaults.' });
        setJiraUrl('');
        setJiraEmail('');
        setJiraToken('');
        setGroqApiKey('');
        setJiraStatus(null);
        setJiraFieldErrors({});
        setLlmStatus(null);
        fetchConfig();
      }
    } catch (err) {
      setResetStatus({ success: false, message: err.message });
    } finally {
      setResetting(false);
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
        credentials: 'same-origin',
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
        credentials: 'same-origin',
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
          <div className="brand-wrapper" onClick={() => navigateTo('generator')} title="Test Plan Generator">
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
            onClick={() => navigateTo('generator')}
          >
            <Icons.Layers />
            <span>Generator</span>
          </button>
          <button
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => navigateTo('settings')}
          >
            <Icons.Settings />
            <span>Settings</span>
            {config?.isCustomSession && <span className="custom-session-dot" title="Custom Session Active"></span>}
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
                <span className="feature-tag tag-float-1">
                  ⚡ {config?.aiProvider ? config.aiProvider : 'Groq Llama 3.3 70B'}
                </span>
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
                        : `Applying RICE-POT template with ${config?.aiProvider || 'Groq AI'}...`}
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
                  <span className="badge-tag badge-source" style={{ marginLeft: 'auto' }}>
                    <Icons.Lock style={{ width: '12px', height: '12px' }} />
                    <span>Protected Requirement</span>
                  </span>
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
             SETTINGS TAB — WORKSPACE SETTINGS & USER-CONFIGURABLE INTEGRATIONS
             Per-User Encrypted Isolation with Zero-Secret-Leak Security
             ========================================================================== */
          <div className="settings-page-wrapper">
            {/* Settings Top Bar */}
            <div className="glass-card settings-header-card" style={{ marginBottom: '1.5rem' }}>
              <div className="settings-top-banner">
                <div className="card-title-group">
                  <h2>
                    <Icons.Settings />
                    Workspace Settings & Integrations
                  </h2>
                  <p>
                    Configure your personal Jira workspace credentials and select between high-speed Groq Cloud or local Ollama AI. Credentials are encrypted and isolated per user.
                  </p>
                </div>

                <div className="settings-session-controls">
                  <div className="session-status-badge">
                    <span className={`status-indicator-dot ${config?.isCustomSession ? 'dot-custom' : 'dot-default'}`}></span>
                    <span>
                      {config?.isCustomSession ? 'Custom Session (Encrypted)' : 'System Defaults (.env)'}
                    </span>
                  </div>

                  {config?.isCustomSession && (
                    <button
                      className="btn-reset-session"
                      onClick={handleResetSettings}
                      disabled={resetting}
                      title="Clear your custom credentials and revert to system defaults"
                    >
                      {resetting ? (
                        <span className="spinner-dual" style={{ width: '13px', height: '13px' }}></span>
                      ) : (
                        <Icons.Trash />
                      )}
                      <span>Reset Defaults</span>
                    </button>
                  )}
                </div>
              </div>

              {resetStatus && (
                <div className={`alert-box ${resetStatus.success ? 'alert-success' : 'alert-error'}`} style={{ marginTop: '1rem' }}>
                  {resetStatus.success ? <Icons.Check /> : <Icons.AlertTriangle />}
                  <div>
                    <span>{resetStatus.message}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="settings-cards-grid">
              {/* ============================================================
                  SECTION 1: JIRA WORKSPACE INTEGRATION (EDITABLE CREDENTIALS)
                  ============================================================ */}
              <div className="glass-card settings-card">
                <div className="card-header-styled">
                  <div className="card-title-group">
                    <h3>
                      <Icons.Globe />
                      Jira Cloud Integration
                    </h3>
                    <p>Connect to your Atlassian Cloud workspace via REST API v3</p>
                  </div>
                  <div className="card-badge-status">
                    {config?.jira?.connected || config?.hasJiraToken ? (
                      <span className="status-badge-active">
                        <Icons.Check />
                        {config?.jira?.status || 'Credentials Configured'}
                      </span>
                    ) : (
                      <span className="status-badge-inactive">Not Configured</span>
                    )}
                  </div>
                </div>

                <div className="settings-form-body">
                  {/* Jira Base URL Input */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="jira-url-input">
                      Jira Base URL <span className="required-star">*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <div className="input-prefix-icon"><Icons.Globe /></div>
                      <input
                        id="jira-url-input"
                        type="url"
                        className={`form-control ${jiraFieldErrors.url ? 'input-error' : ''}`}
                        placeholder="https://your-workspace.atlassian.net"
                        value={jiraUrl}
                        onChange={(e) => {
                          setJiraUrl(e.target.value);
                          if (jiraFieldErrors.url) setJiraFieldErrors(prev => ({ ...prev, url: null }));
                        }}
                        disabled={jiraSaving || jiraTesting}
                      />
                    </div>
                    {jiraFieldErrors.url ? (
                      <div className="field-error-msg">
                        <Icons.AlertTriangle />
                        <span>{jiraFieldErrors.url}</span>
                      </div>
                    ) : (
                      <span className="form-hint">Enter your team's Atlassian Cloud root URL (e.g. https://your-workspace.atlassian.net)</span>
                    )}
                  </div>

                  {/* Jira Account Email Input */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="jira-email-input">
                      Jira Email <span className="required-star">*</span>
                    </label>
                    <div className="form-input-wrapper">
                      <div className="input-prefix-icon">@</div>
                      <input
                        id="jira-email-input"
                        type="email"
                        className={`form-control ${jiraFieldErrors.email ? 'input-error' : ''}`}
                        placeholder="user@company.com"
                        value={jiraEmail}
                        onChange={(e) => {
                          setJiraEmail(e.target.value);
                          if (jiraFieldErrors.email) setJiraFieldErrors(prev => ({ ...prev, email: null }));
                        }}
                        disabled={jiraSaving || jiraTesting}
                      />
                    </div>
                    {jiraFieldErrors.email ? (
                      <div className="field-error-msg">
                        <Icons.AlertTriangle />
                        <span>{jiraFieldErrors.email}</span>
                      </div>
                    ) : (
                      <span className="form-hint">Email address associated with your Atlassian API token</span>
                    )}
                  </div>

                  {/* Jira API Token Input (Masked with Eye reveal) */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="jira-token-input">
                      Jira API Token {!(config?.jira?.hasToken || config?.hasJiraToken) && <span className="required-star">*</span>}
                    </label>
                    <div className="form-input-wrapper">
                      <div className="input-prefix-icon"><Icons.Key /></div>
                      <input
                        id="jira-token-input"
                        type={showJiraToken ? "text" : "password"}
                        className={`form-control ${jiraFieldErrors.token ? 'input-error' : ''}`}
                        placeholder={(config?.jira?.hasToken || config?.hasJiraToken) 
                          ? '•••••••••••••••• (Credentials Configured - Leave blank to retain)' 
                          : 'Enter Jira API Token'}
                        value={jiraToken}
                        onChange={(e) => {
                          setJiraToken(e.target.value);
                          if (jiraFieldErrors.token) setJiraFieldErrors(prev => ({ ...prev, token: null }));
                        }}
                        autoComplete="new-password"
                        disabled={jiraSaving || jiraTesting}
                      />
                      <button
                        type="button"
                        className="btn-input-icon"
                        onClick={() => setShowJiraToken(!showJiraToken)}
                        title={showJiraToken ? "Hide token" : "Show token"}
                        aria-label="Toggle token visibility"
                        disabled={jiraSaving || jiraTesting}
                      >
                        {showJiraToken ? <Icons.EyeOff /> : <Icons.Eye />}
                      </button>
                    </div>
                    {jiraFieldErrors.token ? (
                      <div className="field-error-msg">
                        <Icons.AlertTriangle />
                        <span>{jiraFieldErrors.token}</span>
                      </div>
                    ) : (
                      <span className="form-hint">
                        {(config?.jira?.hasToken || config?.hasJiraToken)
                          ? 'Credentials configured. Leave blank to retain existing token or enter a new one to replace.'
                          : <>Generate an API token from <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer" className="external-link-accent">Atlassian Security Settings <Icons.ExternalLink /></a></>}
                      </span>
                    )}
                  </div>

                  {/* Jira Feedback Banner */}
                  {jiraStatus && (
                    <div className={`alert-box ${jiraStatus.success ? 'alert-success' : 'alert-error'}`}>
                      {jiraStatus.success ? <Icons.Check /> : <Icons.AlertTriangle />}
                      <div>
                        <strong>{jiraStatus.success ? 'Success: ' : 'Error: '}</strong>
                        <span>{jiraStatus.message || (jiraStatus.success ? 'Connected successfully' : 'Connection failed')}</span>
                      </div>
                    </div>
                  )}

                  {/* Jira Action Buttons */}
                  <div className="form-actions-row">
                    <button
                      type="button"
                      className="btn-action-secondary"
                      onClick={handleTestJira}
                      disabled={jiraTesting || jiraSaving}
                    >
                      {jiraTesting ? (
                        <>
                          <span className="spinner-dual"></span>
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <Icons.Refresh />
                          <span>Test Jira Connection</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-action-primary"
                      onClick={handleSaveJira}
                      disabled={jiraSaving || jiraTesting}
                    >
                      {jiraSaving ? (
                        <>
                          <span className="spinner-dual"></span>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Icons.Check />
                          <span>Save Credentials</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  SECTION 2: AI GENERATION PROVIDER (EDITABLE CONFIGURATION)
                  ============================================================ */}
              <div className="glass-card settings-card">
                <div className="card-header-styled">
                  <div className="card-title-group">
                    <h3>
                      <Icons.Cpu />
                      AI Provider Configuration
                    </h3>
                    <p>Select provider and configure credentials for test plan synthesis</p>
                  </div>
                  <div className="card-badge-status">
                    <span className="status-badge-engine">
                      <span className="badge-icon">{llmProvider === 'groq' ? '⚡' : '🦙'}</span>
                      <span className="badge-text">{llmProvider === 'groq' ? 'Groq Cloud' : 'Ollama Local'}</span>
                    </span>
                  </div>
                </div>

                <div className="settings-form-body">
                  {/* Provider Selection Segmented Control */}
                  <div className="provider-selector-wrap">
                    <label className="form-label">Active Provider</label>
                    <div className="segmented-toggle">
                      <button
                        type="button"
                        className={`toggle-option ${llmProvider === 'groq' ? 'selected' : ''}`}
                        onClick={() => { setLlmProvider('groq'); setLlmStatus(null); }}
                      >
                        <Icons.Sparkles />
                        <div className="toggle-labels">
                          <span className="toggle-primary">Groq Cloud AI</span>
                          <span className="toggle-secondary">Llama 3.3 70B • High Speed</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`toggle-option ${llmProvider === 'ollama' ? 'selected' : ''}`}
                        onClick={() => { setLlmProvider('ollama'); setLlmStatus(null); }}
                      >
                        <Icons.Server />
                        <div className="toggle-labels">
                          <span className="toggle-primary">Ollama (Local / Self-Hosted)</span>
                          <span className="toggle-secondary">Private • Zero Cloud Egress</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* GROQ CONFIGURATION FIELDS */}
                  {llmProvider === 'groq' ? (
                    <div className="provider-fields-group">
                      <div className="form-group">
                        <label className="form-label" htmlFor="groq-key-input">
                          Groq API Key (Masked)
                        </label>
                        <div className="form-input-wrapper">
                          <div className="input-prefix-icon"><Icons.Key /></div>
                          <input
                            id="groq-key-input"
                            type={showGroqKey ? "text" : "password"}
                            className="form-control"
                            placeholder={(config?.llm?.hasGroqKey || config?.hasGroqKey) 
                              ? '•••••••••••••••• (API Key Configured - Leave blank to retain)' 
                              : 'Enter Groq API Key (gsk_...)'}
                            value={groqApiKey}
                            onChange={(e) => setGroqApiKey(e.target.value)}
                            autoComplete="new-password"
                            disabled={llmSaving || llmTesting}
                          />
                          <button
                            type="button"
                            className="btn-input-icon"
                            onClick={() => setShowGroqKey(!showGroqKey)}
                            title={showGroqKey ? "Hide key" : "Show key"}
                            aria-label="Toggle Groq key visibility"
                            disabled={llmSaving || llmTesting}
                          >
                            {showGroqKey ? <Icons.EyeOff /> : <Icons.Eye />}
                          </button>
                        </div>
                        <span className="form-hint">
                          {(config?.llm?.hasGroqKey || config?.hasGroqKey)
                            ? 'API Key is configured. Leave blank to retain existing key or enter a new one to replace.'
                            : <>Get a free API key at <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="external-link-accent">console.groq.com <Icons.ExternalLink /></a></>}
                        </span>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="groq-model-select">
                          Groq Model Name
                        </label>
                        <select
                          id="groq-model-select"
                          className="form-control form-select"
                          value={groqModel}
                          onChange={(e) => setGroqModel(e.target.value)}
                          disabled={llmSaving || llmTesting}
                        >
                          <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended • 128k context)</option>
                          <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Ultra-fast • 128k context)</option>
                          <option value="mixtral-8x7b-32768">mixtral-8x7b-32768 (MoE • 32k context)</option>
                          <option value="gemma2-9b-it">gemma2-9b-it (Google Gemma 2 9B)</option>
                        </select>
                        <span className="form-hint">Selected model for RICE-POT test plan synthesis</span>
                      </div>
                    </div>
                  ) : (
                    /* OLLAMA CONFIGURATION FIELDS */
                    <div className="provider-fields-group">
                      <div className="form-group">
                        <label className="form-label" htmlFor="ollama-url-input">
                          Ollama Server Base URL
                        </label>
                        <div className="form-input-wrapper">
                          <div className="input-prefix-icon"><Icons.Server /></div>
                          <input
                            id="ollama-url-input"
                            type="url"
                            className="form-control"
                            placeholder="http://localhost:11434"
                            value={ollamaUrl}
                            onChange={(e) => setOllamaUrl(e.target.value)}
                            disabled={llmSaving || llmTesting}
                          />
                        </div>
                        <span className="form-hint">Default local daemon URL is <code>http://localhost:11434</code></span>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="ollama-model-input">
                          Ollama Model Name
                        </label>
                        <div className="form-input-wrapper">
                          <div className="input-prefix-icon"><Icons.Cpu /></div>
                          <input
                            id="ollama-model-input"
                            type="text"
                            className="form-control"
                            placeholder="llama3, mistral, qwen2.5-coder, deepseek-r1"
                            value={ollamaModel}
                            onChange={(e) => setOllamaModel(e.target.value)}
                            disabled={llmSaving || llmTesting}
                          />
                        </div>
                        <span className="form-hint">Model must already be downloaded via <code>ollama pull &lt;model&gt;</code></span>
                      </div>
                    </div>
                  )}

                  {/* LLM Feedback Banner */}
                  {llmStatus && (
                    <div className={`alert-box ${llmStatus.success ? 'alert-success' : 'alert-error'}`}>
                      {llmStatus.success ? <Icons.Check /> : <Icons.AlertTriangle />}
                      <div>
                        <strong>{llmStatus.success ? 'Verified: ' : 'Test Failed: '}</strong>
                        <span>
                          {llmStatus.message}
                          {llmStatus.latencyMs && ` (${llmStatus.latencyMs}ms)`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* LLM Action Buttons */}
                  <div className="form-actions-row">
                    <button
                      type="button"
                      className="btn-action-secondary"
                      onClick={handleTestLlm}
                      disabled={llmTesting || llmSaving}
                    >
                      {llmTesting ? (
                        <>
                          <span className="spinner-dual"></span>
                          <span>Testing LLM...</span>
                        </>
                      ) : (
                        <>
                          <Icons.Refresh />
                          <span>Test AI Connection</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-action-primary"
                      onClick={handleSaveLlm}
                      disabled={llmSaving || llmTesting}
                    >
                      {llmSaving ? (
                        <>
                          <span className="spinner-dual"></span>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Icons.Check />
                          <span>Save Configuration</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Zero-Leak Security Architecture Banner */}
            <div className="glass-card security-banner-card" style={{ marginTop: '1.5rem' }}>
              <div className="security-icon-badge">
                <Icons.Shield />
              </div>
              <div className="security-banner-content">
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#f8fafc', fontWeight: 600 }}>Stateless AES-256-GCM Session Encryption & Cross-User Isolation</h4>
                <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Credentials you enter are encrypted and stored exclusively in your own browser's <code>HttpOnly</code>, <code>SameSite=Strict</code> session cookie. 
                  Secrets are never stored in localStorage, never exposed in API responses or public settings, and kept completely isolated per user.
                </p>
                <div className="security-features-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <span className="badge-source"><Icons.Check /> Zero Client Egress</span>
                  <span className="badge-source"><Icons.Check /> Per-User Session Isolation</span>
                  <span className="badge-source"><Icons.Check /> Secret Tokens Kept Blank on Reopen</span>
                  <span className="badge-source"><Icons.Check /> AES-256-GCM Encrypted Vault</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================================================
          DEVELOPER BRANDING FOOTER (Vipul Singh)
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
