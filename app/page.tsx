'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  // Ref for tracking animated elements
  const animatedElementsRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Add shadow to navigation on scroll
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 20) {
          (nav as HTMLElement).style.boxShadow = 'var(--shadow-md)';
          (nav as HTMLElement).style.paddingTop = 'var(--space-xs)';
          (nav as HTMLElement).style.paddingBottom = 'var(--space-xs)';
        } else {
          (nav as HTMLElement).style.boxShadow = 'none';
          (nav as HTMLElement).style.paddingTop = 'var(--space-md)';
          (nav as HTMLElement).style.paddingBottom = 'var(--space-md)';
        }
      }
      
      // Check for elements to animate
      checkVisibility();
    };

    // Set up intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing after element is visible
          observer.unobserve(entry.target);
          animatedElementsRef.current.delete(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });

    // Function to check and animate visible elements
    const checkVisibility = () => {
      document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => {
        if (!animatedElementsRef.current.has(el)) {
          observer.observe(el);
          animatedElementsRef.current.add(el);
        }
      });
    };

    // Add decorative elements
    const addDotPattern = () => {
      const patterns = [
        { top: '15%', left: '5%' },
        { top: '60%', right: '5%' },
        { bottom: '10%', left: '8%' }
      ];
      
      patterns.forEach(pos => {
        const dotPattern = document.createElement('div');
        dotPattern.className = 'dot-pattern';
        
        // Safer way to set styles
        if ('top' in pos) dotPattern.style.top = pos.top as string;
        if ('left' in pos) dotPattern.style.left = pos.left as string;
        if ('right' in pos) dotPattern.style.right = pos.right as string;
        if ('bottom' in pos) dotPattern.style.bottom = pos.bottom as string;
        
        document.body.appendChild(dotPattern);
      });
    };

    // Initial setup
    window.addEventListener('scroll', handleScroll);
    checkVisibility();
    handleScroll(); // Initial call to set nav state
    addDotPattern();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      document.querySelectorAll('.dot-pattern').forEach(el => el.remove());
    };
  }, []);

  return (
    <main>
      <nav>
        <div className="logo">Trueplace</div>
        <div className="nav-links">
          <a href="#platforms">Platforms</a>
          <a href="#about">About</a>
          <a href="#results">Results</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header>
        <div className="container">
          <div className="hero">
            <h1 className="fade-in-up">Revolutionizing Interview Preparation</h1>
            <p className="subtitle fade-in-up">Trueplace creates specialized AI-powered interview preparation platforms tailored to different industries.</p>
            
            {/* Add YC badge in the hero section */}
            <div className="yc-badge fade-in-up">
              <div className="yc-logo-large">
                <svg 
                  viewBox="0 0 100 100" 
                  width="48" 
                  height="48" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="#FF6600" />
                  <text 
                    x="50" 
                    y="70" 
                    fontFamily="Arial, sans-serif" 
                    fontSize="70" 
                    fontWeight="bold" 
                    fill="white" 
                    textAnchor="middle"
                  >
                    Y
                  </text>
                </svg>
              </div>
              <span>Backed by <strong>Y Combinator</strong></span>
            </div>
          </div>
        </div>
      </header>

      <section id="platforms">
        <div className="container">
          <div className="section-intro">
            <h2 className="fade-in-up">Our Platforms</h2>
            <p className="fade-in-up">Specialized interview preparation solutions for different career paths.</p>
          </div>
          
          <div className="platforms-grid">
            <div className="platform-card fade-in-up">
              <div className="platform-icon medical">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3>MedInterview</h3>
              <p>AI-powered interview preparation specifically designed for medical school candidates.</p>
              <a href="#" className="learn-more">
                Visit Platform
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
            
            <div className="platform-card fade-in-up">
              <div className="platform-icon finance">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3>FinancePrep</h3>
              <p>Advanced interview simulation for investment banking and finance industry candidates.</p>
              <a href="#" className="learn-more">
                Visit Platform
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
            
            <div className="platform-card fade-in-up">
              <div className="platform-icon tech">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M9 21V9"></path>
                </svg>
              </div>
              <h3>TechInterview</h3>
              <p>Technical and behavioral interview preparation for software engineering and product roles.</p>
              <a href="#" className="learn-more">
                Coming Soon
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content fade-in-up">
              <h2>About Trueplace</h2>
              <p className="emphasis">We build specialized AI interview preparation platforms that help candidates excel in their specific industry.</p>
              <p>Founded in 2022, Trueplace is the parent company for a family of industry-specific AI interview preparation platforms. We combine advanced artificial intelligence with deep industry knowledge to create hyper-targeted preparation experiences.</p>
              <p>Our mission is to democratize access to exceptional interview preparation, helping candidates present their best selves in high-stakes interviews across all major professional fields.</p>
            </div>
            <div className="about-image fade-in-up">
              <div className="image-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="results">
        <div className="container">
          <div className="results-section-intro">
            <h2 className="fade-in-up">Our Impact</h2>
            <p className="fade-in-up">Across all our platforms, we've helped thousands of candidates achieve their career goals.</p>
          </div>
          
          <div className="results-grid">
            <div className="result-card fade-in-up">
              <div className="result-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Candidates Prepared</h3>
              <p className="result-stat">50K+</p>
              <p>Professionals across various industries have prepared for interviews using our platforms.</p>
            </div>
            
            <div className="result-card fade-in-up featured">
              <div className="result-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20V10"></path>
                  <path d="M18 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              </div>
              <h3>Success Rate</h3>
              <p className="result-stat">87<span className="percentage">%</span></p>
              <p>Our users report significantly higher interview success rates after using our platforms for preparation.</p>
            </div>
            
            <div className="result-card fade-in-up">
              <div className="result-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.8 11.3 2 22l10.7-3.79"></path>
                  <path d="M4 3h.01"></path>
                  <path d="M22 8h.01"></path>
                  <path d="M15 2h.01"></path>
                  <path d="M22 20h.01"></path>
                  <path d="m22 2-17 12"></path>
                </svg>
              </div>
              <h3>Industries Covered</h3>
              <p className="result-stat">12</p>
              <p>Specialized platforms serving candidates across a dozen different professional fields and counting.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="contact-content">
            <h2 className="fade-in-up">Get In Touch</h2>
            <p className="fade-in-up">Interested in learning more about our platforms or partnering with us?</p>
            <div className="contact-details fade-in-up">
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <p>contact@trueplace.ai</p>
              </div>
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p>123 Innovation Way, San Francisco, CA 94107</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Trueplace</h4>
              <p>The parent company for specialized AI interview preparation platforms.</p>
            </div>
            <div className="footer-section">
              <h4>Explore</h4>
              <a href="#platforms">Platforms</a>
              <a href="#about">About</a>
              <a href="#results">Results</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section">
              <h4>Our Platforms</h4>
              <a href="#">MedInterview</a>
              <a href="#">FinancePrep</a>
              <a href="#">TechInterview</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Trueplace, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 