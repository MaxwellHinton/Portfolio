"use client";

import { Noto_Sans } from "next/font/google";
import { Quicksand } from "next/font/google";
import { useEffect } from "react";

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
  return (
    <>
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
          <h1 className={`home-section-header ${noto.className} home-h1`}>Hi there, I'm Maxwell</h1>
          <p className={`${quicksand.className} home-section-paragraph`}>
            A recent Computer Science graduate with a passion for working on full-stack applications.
          </p>
        </section>

        <div className="spacer spacer-1"></div>

        {/* About Section */}
        <div className="full-width-background" style={{ backgroundColor: '#4ba9f6' }}>
          <section id="about" className="section">
            <h1 className={`about-section-header ${noto.className} about-h1`}>About Me</h1>
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
          <h1 className={`section-header ${noto.className}`}>Projects</h1>
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
          <h1 className={`contact-section-header ${noto.className} about-h1`}>Get In Touch</h1>
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
