import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import HeaderDropdown from './components/HeaderDropdown';
import './App.css';

function App() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const adjectives = ['Excellence', 'Innovation', 'Precision', 'Speed', 'Performance'];
    const [isOpen, setIsOpen] = useState(false);
    const [linktreeLinks, setLinktreeLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(true);
    const [errorLinks, setErrorLinks] = useState(null);

    const documentationItems = [
        { label: 'Embedded-Sharepoint', href: 'https://lhr-solar.github.io/Embedded-Sharepoint/' },
        { label: 'KiCAD-Sharepoint', href: 'https://lhr-solar.github.io/KiCAD-Sharepoint/' },
        { label: 'Harness-Docs', href: 'https://lhr-solar.github.io/Harness-Docs/' }
    ];

    async function getLinktreeLinks() {
        const url = `https://lhrsolar-links.netlify.app/.netlify/functions/get-links`;

        return JSON.parse(await fetch(url).then(res => res.text()))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % adjectives.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [adjectives.length]);

    useEffect(() => {
        const fetchStartTime = Date.now();

        getLinktreeLinks('lhrsolar')
            .then(links => {
                const elapsedTime = Date.now() - fetchStartTime;
                const remainingTime = 750 - elapsedTime;

                if (remainingTime > 0) {
                    setTimeout(() => {
                        setLinktreeLinks(links);
                        setLoadingLinks(false);
                    }, remainingTime);
                } else {
                    setLinktreeLinks(links);
                    setLoadingLinks(false);
                }
            })
            .catch(err => {
                console.error("Failed to fetch Linktree links:", err);
                setErrorLinks(err.message);
                setLoadingLinks(false);
            });
    }, []);

    return (
        <div className="app">
            {/* Background Video */}
            <div className="video-background">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="background-video"
                    onError={(e) => console.error('Video failed to load:', e)}
                    onLoadStart={() => console.log('Video started loading')}
                    onCanPlay={() => console.log('Video can play')}
                >
                    <source src="/assets/daybreak.webm" type="video/webm"/>
                    {/* Fallback for browsers that don't support WebM */}
                    <source src="/assets/daybreak.mp4" type="video/mp4"/>
                    {/* Fallback content */}
                    <div className="video-fallback">Video not supported</div>
                </video>
                <div className="video-overlay"></div>
            </div>

            {/* Navigation Header */}
            <header className="nav-header">
                <div className="nav-container">
                    {/* Logo */}
                    <div className="logo">
                        <img
                            src="/assets/logos/logo-transparent.webp"
                            alt="Longhorn Racing Solar Logo"
                            className="logo-img"
                        />
                        <span className="logo-text">Longhorn Racing Solar</span>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className={`hamburger ${isOpen ? "open" : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Navigation Links */}
                    <nav className={`nav-menu ${isOpen ? "active" : ""}`}>
                        <a href="#" className="nav-link">Tools</a>
                        <a href="#" className="nav-link">Projects</a>
                        <HeaderDropdown title="Documentation" items={documentationItems} />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div className="hero-section">
                    <h1 className="hero-title">
                        <span className="fixed-word">Engineering </span>
                        <span className="animated-word-container">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={adjectives[currentWordIndex]}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.5}}
                                className="animated-word"
                            >
                                {adjectives[currentWordIndex]}
                            </motion.span>
                        </AnimatePresence>
                        </span>
                    </h1>
                    <p className="hero-subtitle">
                        Internal tools & resources hub for Longhorn Racing Solar
                    </p>
                    <div className="hero-actions">
                        {loadingLinks && <div className="loading-bar"></div>}
                        {errorLinks && <p className="error-message">Failed to load links. Please try again later.</p>}
                    </div>
                </div>

                {/* Team Links */}
                {!loadingLinks && !errorLinks && linktreeLinks.length > 0 && (
                    <div className="team-links">
                        <h2>Team Links</h2>
                        <div className="linktree-grid">
                            {linktreeLinks.map(link => (
                                <a key={link.url} className="quick-card tooltip" target={'_blank'} href={link.url} rel="noopener noreferrer" data-tooltip={link.title}>
                                    <span className="quick-card-title">{link.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick-Access Panel */}
                <div className="quick-access">
                    <h2>Quick Access</h2>
                    <div className="quick-links">
                        <a href="https://github.com/lhr-solar" className="quick-card">
                            <img src="/assets/github.png" alt="GitHub" className="quick-card-logo" />
                            GitHub
                        </a>
                        <a href="https://cloud.wikis.utexas.edu/wiki/spaces/LHRSOLAR/overview" className="quick-card">
                            <img src="/assets/confluence.png" alt="Confluence" className="quick-card-logo" />
                            Confluence
                        </a>
                        <a href="https://utexas.sharepoint.com/sites/ENGR-LonghornRacing/LHR%20Solar" className="quick-card">
                            <img src="/assets/sharepoint.png" alt="Sharepoint" className="quick-card-logo" />
                            Sharepoint
                        </a>
                        <a href="https://app.clickup.com/9011033583/home" className="quick-card">
                            <img src="/assets/clickup.png" alt="ClickUp" className="quick-card-logo" />
                            ClickUp
                        </a>
                        <a href="https://pdm.getbild.com/" className="quick-card">
                            <img src="/assets/bild.png" alt="Bild PDM" className="quick-card-logo" />
                            Bild PDM
                        </a>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="floating-stats">
                    <div className="stat-card">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Years Racing</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">100+</div>
                        <div className="stat-label">Team Members</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">3000+</div>
                        <div className="stat-label">Miles Raced</div>
                    </div>
                </div>
            </main>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-arrow"></div>
            </div>
        </div>
    );
}

export default App;
