"use client";

import { Noto_Sans } from "next/font/google";
import { Quicksand } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';
import Lenis from "lenis";
import SplitType from "split-type";
import anime from "animejs";

const noto = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// GSAP animation for section headers
const animateSectionHeader = (selector) => {
  const header = document.querySelector(selector);
  if (!header) return;
  
  // Create a new SplitType instance to split the header text into characters
  const headerText = new SplitType(header, { types: 'chars' });
  
  // Reset any previous animations
  gsap.set(headerText.chars, { 
    x: -50, 
    opacity: 0 
  });
  
  // Animate each character
  gsap.to(headerText.chars, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.05,
    ease: "power3.out"
  });
};

// Observer hook for other section headers (GSAP)
const useSectionHeaderAnimations = () => {
  useEffect(() => {
    const headerSelectors = [
      '#home-heading',
      '#about-heading',
      '#contact-heading'
    ];
    
    // Create observers for each header
    const observers = [];
    
    headerSelectors.forEach((selector) => {
      const header = document.querySelector(selector);
      if (!header) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateSectionHeader(selector);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(header);
      observers.push(observer);
    });
    
    // Cleanup function
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
};

  // Project header animation
  const animateProjectHeader = () => {

    var textWrapper = document.querySelector('.ml1 .letters');

    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
      .add({
        targets: '.ml1 .letter',
        scale: [0.3,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        delay: (el, i) => 70 * (i+1)
      }).add({
        targets: '.ml1 .line',
        scaleX: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
      });
  };

const useProjectHeaderAnimation = () => {
  useEffect (() => {
    const projectSection = document.querySelector('.ml1');
    if(!projectSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            animateProjectHeader();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(projectSection);

    return () => {
      observer.disconnect();
    };
  }, []);
};

export default function Home() { 

  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const form = formRef.current;
    console.log("form: ", form)
    const formData = new FormData(form);
    
    setIsSubmitting(true);
    
    try {
      // Send data to Formspree
      const response = await fetch("https://formspree.io/f/xjkyvaae", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        // Clear form fields
        emailInputRef.current.value = "";
        messageInputRef.current.value = "";
        
        // Show thumbs up animation
        setShowThumbsUp(true);
        
        // Hide thumbs up after 3 seconds
        setTimeout(() => {
          setShowThumbsUp(false);
        }, 3000);
      } else {
        console.log("Form submission failed");
        console.log(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useProjectHeaderAnimation();
  useSectionHeaderAnimations();

  // Register GSAP plugins

  useEffect(() => {

      gsap.registerPlugin(ScrollTrigger);

      // split types for paragraph animation
      const splitTypes = document.querySelectorAll('.animated-paragraph')

      splitTypes.forEach((char, i) => {

        const bg = char.dataset.bgColor;
        const fg = char.dataset.fgColor;

        const text = new SplitType(char, { types: 'chars'})
        // can use words

        gsap.fromTo(text.chars,
          {
            color: bg,
          },
          {
            color: fg,
            duration: 0.3,
            stagger: 0.02,
            scrollTrigger: {
              trigger: char,
              start: 'top 80%',
              end: 'top 20%',
              scrub: false,
              markers: false,
            }
          }
        )

      });      
    
      const lenis = new Lenis();
    
      lenis.on('scroll', (e) => {
      });
    
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
    
      requestAnimationFrame(raf)

  }, []);

  // Progress bar animation
  useEffect(() => {
    const scrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      const progressBar = document.querySelector('.progress-bar');

      if(progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', scrollProgress);
    return () => window.removeEventListener('scroll', scrollProgress);
  }, []);

  // Social media animation
  useEffect(() => {
    gsap.to(".social-container", {
      y: "75vh",
      duration: 3,
      ease: "power2.out"
    });

    gsap.to(".social-container", {
      right: "50%",
      x: "50%",
      flexDirection: "row",
      top: "7rem",
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "top center",
        scrub: 3,
      }
    });
  }, []);
  
  return (
      <>
        <div className="social-container">
          <Link 
            href="https://www.linkedin.com/in/maxwell-hinton-3489702b7" 
            target="_blank"
            className="social-buttons linkedin-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </Link>
          <Link 
            href="https://github.com/MaxwellHinton" 
            target="_blank"
            className="social-buttons github-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </Link>
        </div>
      
        <header className="header">
          <div className="progress-bar"></div>
          <nav className="nav-container">
            <div className="nav-left">
              <ul className="nav-links">
                <li><a href="#home" className={quicksand.className}>Home</a></li>
              </ul>
            </div>
            <div className="nav-right">
              <ul className="nav-links">
                <li><a href="#about" className={quicksand.className}>About</a></li>
                <li><a href="#projects" className={quicksand.className}>Projects</a></li>
                <li><a href="#contact" className={quicksand.className}>Contact</a></li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="main-container">
          {/* Home Section */}
          <section id="home" className="section">
            <h1 id="home-heading" className={`${noto.className} home-h1`}>Hi there, I'm Maxwell</h1>
            <p data-bg-color="#383838" data-fg-color="#ffffff"id="home-paragraph" className={`${quicksand.className} home-section-paragraph animated-paragraph`}>
              A recent Computer Science graduate with a passion for learning and working on full-stack applications. 
            </p>
          </section>

          <div className="spacer spacer-1"></div>

          {/* About Section */}
          <div className="full-width-background" style={{ backgroundColor: '#4ba9f6' }}>
            <section id="about" className="section">
              <h1 id="about-heading" className={`${noto.className} about-h1`}>About Me</h1>
              <p data-bg-color="#5d5d5d" data-fg-color="#000000" id="about-paragraph" className={`${quicksand.className} about-section-paragraph animated-paragraph`}>
                I'm an aspiring full-stack developer with expertise in React, Node.js, and modern
                web technologies. With a strong foundation in computer science and a
                keen eye for detail, I strive to build efficient and user-friendly
                applications.
              </p>
            </section>
          </div>

          <div className="spacer spacer-2 margin-top"></div>

          {/* Projects Section */}
          <section id="projects" className="section">
          <h1 className={`${noto.className} ml1`}>
              <span className="text-wrapper">
                <span className="line line1"></span>
                <span className={`letters`}>Personal Projects</span>
                <span className="line line2"></span>
              </span>
            </h1>
            {/* <h1 className={`${noto.className} projects-header`}>Personal Projects</h1> */}
            <div className="project-container">
              <div className="card-wrapper">
                <div className="card-1">
                  <div className="card-gradient"></div>
                  <div className="card-content">
                    <h1 className={noto.className}>GoodSource</h1>
                      <p className={`${quicksand.className} projects-paragraph`}>
                      GoodSource is a news aggregation platform that allows users to filter news by categories such as good, bad, sports, or regional news. 
                      Users can then select specific sources to retrieve articles. 
                      The platform is built using Next.js, Node.js, PostgreSQL, and TailwindCSS, with deployment on Vercel.
                      </p>

                      <div className="project-buttons">
                        <a href="https://github.com/MaxwellHinton/GoodSource" target="_blank" rel="noopener noreferrer" className={` ${quicksand.className} project-btn github-project-btn`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                        <a href="https://good-source.vercel.app/" target="_blank" rel="noopener noreferrer" className={` ${quicksand.className} project-btn github-project-btn`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          View Live
                        </a>
                      </div>
                  </div>
                </div>
              </div>
              
              <div className="card-wrapper">
                <div className="middle_card">
                  <div className="card-gradient"></div>
                  <div className="card-content">
                    <h1 className={noto.className}>LiftLog</h1>
                      <p className={`${quicksand.className} projects-paragraph`}>
                      LiftLog is a full-stack fitness application designed for personalized workout tracking at a home gym. 
                      It features an interactive gym map, secure JWT authentication, profile picture uploads, and a RESTful API built with NestJS. 
                      The mobile app is developed with React Native (Expo), while the promotional website uses React
                      </p>

                      <div className="project-buttons">
                        <a href="https://github.com/MaxwellHinton/LiftLog" target="_blank" rel="noopener noreferrer" className={` ${quicksand.className} project-btn github-project-btn`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                        <a href="https://liftlog-app.vercel.app/" target="_blank" rel="noopener noreferrer" className={` ${quicksand.className} project-btn github-project-btn`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          View Live
                        </a>
                      </div>
                  </div>
                </div>
              </div>
              
              <div className="card-wrapper">
                <div className="card">
                  <div className="card-gradient"></div>
                  <div className="card-content">
                    <h1 className={noto.className}>Racket Interpreter</h1>
                    <p className={`${quicksand.className} projects-paragraph`}>
                    As a university project, I developed an interpreter in Racket for a small subset of the JavaScript language. 
                    It features a lexer and parser generated with the SLLgen library and supports variables, functions, conditionals, and expressions.
                    </p>

                    <div className="project-buttons">
                        <a href="https://github.com/MaxwellHinton/Racket-Interpreter" target="_blank" rel="noopener noreferrer" className={` ${quicksand.className} project-btn github-project-btn`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      </div>  
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="spacer spacer-1"></div>

          {/* Contact Section */}
          <div className="full-width-background" style={{ backgroundColor: '#4ba9f6' }}>
            <section id="contact" className="section">
              <h1 id="contact-heading" className={`${noto.className} about-h1`}>Lets get In Touch</h1>

              <div className='contact-container'>
                <p id="contact-paragraph" className={`${quicksand.className} contact-section-paragraph animated-paragraph`}>
                  <br></br>I'm always open to new opportunities, collaborations, and advice on how to grow and learn. Feel free to send me an email below,
                  or connect with me on LinkedIn.
                </p>
                <div className="form-container">
                  <form className="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="email" className={`${quicksand.className}`}>Your Email:</label>
                      <input 
                        required="" name="email" 
                        id="email" type="text" 
                        className={`${quicksand.className}`}
                        ref={emailInputRef}  
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="textarea" className={`${quicksand.className}`}>Message:</label>
                      <textarea 
                        required="" cols="50" 
                        rows="10" id="textarea" 
                        name="textarea" className={`${quicksand.className}`}
                        ref={messageInputRef}   
                      >
                      </textarea>
                    </div>
                    <div className="submit-container">
                    <button 
                      type="submit" 
                      className="custom-btn" 
                      disabled={isSubmitting}
                    >
                      <a className={`${quicksand.className} btn2`}>
                        <span className="spn2">{isSubmitting ? "Sending..." : "Submit"}</span>
                      </a>
                    </button>
                    {showThumbsUp && (
                      <div className="thumbs-up-animation">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="48" 
                          height="48" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="thumbs-up-icon"
                        >
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  </form>
                </div>

              </div>
            </section>
          </div>
        </main>
      </>
  );
};