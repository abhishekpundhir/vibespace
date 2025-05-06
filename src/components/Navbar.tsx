
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { CircuitBoard, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import "./nav.css"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, logout } = useApp();

  return (
    <nav className="bg-vibespace-card-bg border-b border-vibespace-border sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
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
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <center>  <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-vibespace-light-text hover:text-vibespace-light-purple px-3 py-2 rounded-md text-sm font-medium hhh">
              Events
              </Link>
              <Link to="/about" className="text-vibespace-light-text hover:text-vibespace-light-purple px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard" className="text-vibespace-light-text hover:text-vibespace-light-purple px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Button 
                    onClick={logout}
                    variant="outline" 
                    className="ml-4 text-vibespace-light-purple border-vibespace-light-purple"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <Link to="/admin" className="ml-4 inline-flex items-center bg-vibespace-purple hover:bg-vibespace-light-purple text-white px-4 py-2 rounded-md text-sm font-medium">
                  Admin Login
                </Link>
              )}
            </div></center>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-vibespace-card-bg text-vibespace-light-text"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-vibespace-border bg-vibespace-card-bg">
            <Link to="/" className="text-vibespace-light-text hover:text-vibespace-light-purple block px-3 py-2 rounded-md text-base font-medium">
              Events
            </Link>
            <Link to="/about" className="text-vibespace-light-text hover:text-vibespace-light-purple block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="text-vibespace-light-text hover:text-vibespace-light-purple block px-3 py-2 rounded-md text-base font-medium">
                  Dashboard
                </Link>
                <Button 
                  onClick={logout}
                  variant="outline" 
                  className="w-full justify-start mt-2 text-vibespace-light-purple border-vibespace-light-purple"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Link to="/admin" className="text-white bg-vibespace-purple hover:bg-vibespace-light-purple block px-3 py-2 rounded-md text-base font-medium">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
