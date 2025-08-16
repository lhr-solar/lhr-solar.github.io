import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const adjectives = ['Excellence', 'Innovation', 'Precision', 'Speed', 'Sustainability', 'Performance'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % adjectives.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [adjectives.length]);

    return (
        <div className="app">
            {/* Navigation Header */}
            <header className="nav-header">
                <div className="nav-container">
                    <div className="logo">
                        <img src="/logo.webp" alt="Longhorn Racing Solar Logo" className="logo-img" />
                        <span className="logo-text">Longhorn Racing Solar</span>
                    </div>
                    <nav className="nav-menu">
                        <a href="#" className="nav-link">Dashboard</a>
                        <a href="#" className="nav-link">Tools</a>
                        <a href="#" className="nav-link">Projects</a>
                        <a href="#" className="nav-link">Documentation</a>
                        <a href="#" className="nav-link">Team</a>
                    </nav>
                </div>
            </header>

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
                    <source src="/daybreak.webm" type="video/webm" />
                    {/* Fallback for browsers that don't support WebM */}
                    <source src="/daybreak.mp4" type="video/mp4" />
                    {/* Fallback content */}
                    <div className="video-fallback">Video not supported</div>
                </video>
                <div className="video-overlay"></div>
            </div>

            {/* Main Content */}
            <main className="main-content">
                <div className="hero-section">
                    <h1 className="hero-title">
                        <span className="fixed-word">Engineering </span>
                        <span className="animated-word-container">
              <AnimatePresence mode="wait">
                <motion.span
                    key={adjectives[currentWordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
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
                        <button className="cta-button primary">⚡ Dashboard</button>
                        <button className="cta-button secondary">📂 Quick Links</button>
                    </div>
                </div>

                {/* Quick-Access Panel */}
                <div className="quick-access">
                    <h2>Quick Access</h2>
                    <div className="quick-links">
                        <a href="#" className="quick-card">GitHub</a>
                        <a href="#" className="quick-card">Slack</a>
                        <a href="#" className="quick-card">Confluence</a>
                        <a href="#" className="quick-card">Sharepoint</a>
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
