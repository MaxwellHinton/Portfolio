"use client";

import { Noto_Sans } from "next/font/google";
import { Quicksand } from "next/font/google";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';

const noto = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".social-container", {
      y: "75vh", // Start above their final position   // Start slightly more right
      duration: 3,
      ease: "power2.out"
    });

    // Animation to center when reaching contact section
    gsap.to(".social-container", {
      right: "50%",
      x: "50%", // This helps center the container
      flexDirection: "row",
      top: "7rem",
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "top center",
        scrub: 3,
        // markers true, // Uncomment to help with positioning
      }
    });

  }, []);

  return (
    <>

      <div className="social-container">
        <Link 
          href="https://linkedin.com/in/your-profile" 
          target="_blank"
          className="social-buttons linkedin-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </Link>
        <Link 
          href="https://github.com/your-username" 
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
          <h1 className={`${noto.className} home-h1`}>Hi there, I'm Maxwell</h1>
          <p className={`${quicksand.className} home-section-paragraph`}>
            A recent Computer Science graduate with a passion for working on full-stack applications.
          </p>
        </section>

        <div className="spacer spacer-1"></div>

        {/* About Section */}
        <div className="full-width-background" style={{ backgroundColor: '#4ba9f6' }}>
          <section id="about" className="section">
            <h1 className={`${noto.className} about-h1`}>About Me</h1>
            <p className={`${quicksand.className} about-section-paragraph`}>
              I'm a full-stack developer with expertise in React, Node.js, and modern
              web technologies. With a strong foundation in computer science and a
              keen eye for detail, I strive to build efficient and user-friendly
              applications.
            </p>
          </section>
        </div>

        <div className="spacer spacer-2 margin-top"></div>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h1 className={`${noto.className}`}>Projects</h1>
          <div className="project-container">
            <div className="card-wrapper">
              <div className="card-1">
                <div className="card-gradient"></div>
                <div className="card-content">
                  <h1 className={noto.className}>News Aggregation Platform</h1>
                    <p className={quicksand.className}>
                    GoodSource is a news aggregation platform that allows users to filter news by categories such as good, bad, sports, or regional news. 
                    Users can then select specific sources to retrieve articles. 
                    The platform is built using Next.js, Node.js, PostgreSQL, and TailwindCSS, with deployment on Vercel.
                    </p>
                </div>
              </div>
            </div>
            
            <div className="card-wrapper">
              <div className="middle_card">
                <div className="card-gradient"></div>
                <div className="card-content">
                  <h1 className={noto.className}>LiftLog</h1>
                    <p className={quicksand.className}>
                    LiftLog is a full-stack fitness application designed for personalized workout tracking at a home gym. 
                    It features an interactive gym map, secure JWT authentication, profile picture uploads, and a RESTful API built with NestJS. 
                    The mobile app is developed with React Native (Expo), while the promotional website uses React
                    </p>
                </div>
              </div>
            </div>
            
            <div className="card-wrapper">
              <div className="card">
                <div className="card-gradient"></div>
                <div className="card-content">
                  <h1 className={noto.className}>Racket Interpreter</h1>
                  <p className={quicksand.className}>
                  As a university project, I developed an interpreter in Racket for a small subset of the JavaScript language. 
                  It features a lexer and parser generated with the SLLgen library and supports variables, functions, loops, conditionals, and expressions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="spacer spacer-1"></div>

        {/* Contact Section */}
        <div className="full-width-background" style={{ backgroundColor: '#4ba9f6' }}>
        <section id="contact" className="section">
          <h1 className={`${noto.className} about-h1`}>Get In Touch</h1>
          <p className={`${quicksand.className} about-section-paragraph`}>
            I'm always open to new opportunities and collaborations. Feel free to
            reach out to me at maxwell@maxwell.com or connect with me on LinkedIn.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
