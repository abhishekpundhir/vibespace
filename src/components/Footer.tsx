
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CircuitBoard,
  Code,
  GitBranch, 
  Linkedin,
  Briefcase
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-vibespace-card-bg border-t border-vibespace-border mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <span className="flex items-center justify-center h-14 w-14 rounded-md  p-2 shadow-lg tech-icon">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white">
                <path fill="#FFFFFF" d="M70,30 L130,30 L160,80 L100,170 L40,80 Z" />
                <path fill="#a78bfa" d="M80,40 L120,40 L140,75 L100,140 L60,75 Z" />
                <circle cx="100" cy="80" r="15" fill="#FFFFFF" />
                <rect x="85" y="105" width="30" height="10" rx="5" fill="#FFFFFF" />
                <path d="M65,85 L80,65 M135,85 L120,65" stroke="#FFFFFF" strokeWidth="4" />
              </svg>
            </span>
            <span className="ml-2 text-xl font-bold logo-text tracking-wider">
              Vibe<span className="text-vibespace-light-purple">Space</span>
            </span>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center text-sm text-vibespace-light-text md:text-right">
              &copy; {currentYear} VibeSpace. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-vibespace-border pt-8 md:flex md:items-center md:justify-center">
          <div className="flex space-x-8 justify-center md:justify-start md:order-2">
            <Link to="https://github.com/abhishekpundhir" className="text-vibespace-light-text hover:text-vibespace-light-purple flex flex-col items-center gap-1">
              <Code className="h-5 w-5" />
              <span className="text-xs">Developers</span>
            </Link>
            <Link to="https://github.com/abhishekpundhir/vibespace" className="text-vibespace-light-text hover:text-vibespace-light-purple flex flex-col items-center gap-1">
              <GitBranch className="h-5 w-5" />
              <span className="text-xs">Contribute</span>
            </Link>
            <Link to="https://www.linkedin.com/in/abhishek-pundhir-53ab162aa/" target="_blank" rel="noopener noreferrer" className="text-vibespace-light-text hover:text-vibespace-light-purple flex flex-col items-center gap-1">
              <Linkedin className="h-5 w-5" />
              <span className="text-xs">LinkedIn</span>
            </Link>
            <Link to="https://www.linkedin.com/in/abhishek-pundhir-53ab162aa/" className="text-vibespace-light-text hover:text-vibespace-light-purple flex flex-col items-center gap-1">
              <Briefcase className="h-5 w-5" />
              <span className="text-xs">Careers</span>
            </Link>
          </div>
        </div>

                <div className=" flex  pt-5 space-x-8 justify-start md:justify-start md:order-2">
          <span className="flex items-center justify-center h-14 w-14 rounded-md  p-2 shadow-lg tech-icon">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white">
                <path fill="#FFFFFF" d="M70,30 L130,30 L160,80 L100,170 L40,80 Z" />
                <path fill="#a78bfa" d="M80,40 L120,40 L140,75 L100,140 L60,75 Z" />
                <circle cx="100" cy="80" r="15" fill="#FFFFFF" />
                <rect x="85" y="105" width="30" height="10" rx="5" fill="#FFFFFF" />
                <path d="M65,85 L80,65 M135,85 L120,65" stroke="#FFFFFF" strokeWidth="4" />
              </svg>
            </span>
            <b className="flex justify-center items-center">Developed By Team VibeSpace</b>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
