import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="project-container">
      <div className="card-wrapper">
        <div className="card-1">
          <div className="card-gradient"></div>
          <div className="card-content">
            <h1 className={noto.className}>LiftLog</h1>
            <p>
            LiftLog is a full-stack fitness application designed for personalized workout tracking at a home gym. 
            It features an interactive gym map, secure JWT authentication, profile picture uploads, and a RESTful API built with NestJS. 
            The mobile app is developed with React Native (Expo), while the promotional website uses React
            </p>
          </div>
        </div>
      </div>
      
      <div className="card-wrapper">
        <div className="middle_card">
          <div className="card-gradient"></div>
          <div className="card-content">
            <h1 className={noto.className}>News Aggregation Platform</h1>
            <p>
            GoodSource is a news aggregation platform that allows users to filter news by categories such as good, bad, sports, or regional news. 
            Users can then select specific sources to retrieve articles. 
            The platform is built using Next.js, Node.js, PostgreSQL, and TailwindCSS, with deployment on Vercel.
            </p>
          </div>
        </div>
      </div>
      
      <div className="card-wrapper">
        <div className="card">
          <div className="card-gradient"></div>
          <div className="card-content">
            <h1 className={noto.className}>Racket Compiler</h1>
            <p>
            As a university project, I developed an interpreter in Racket for a small subset of the JavaScript language. 
            It features a lexer and parser generated with the SLLgen library and supports variables, functions, loops, conditionals, and expressions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
