
import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">About VibeSpace</h1>
      
      <Card className="vibespace-card mb-8">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
              <p>
                VibeSpace is a platform designed to facilitate educational events and project submissions. 
                We aim to create a seamless experience for educators to organize events like hackathons, 
                coding competitions, and project showcases, while making it easy for students to participate and submit their work.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">How It Works</h2>
              <div className="space-y-4">
                <div className="bg-vibespace-dark-blue p-4 rounded-lg">
                  <h3 className="font-medium text-vibespace-light-purple">For Educators</h3>
                  <p className="mt-1">
                    Teachers and educators can create and manage events, set rules and requirements, 
                    and review student project submissions through our admin dashboard.
                  </p>
                </div>
                
                <div className="bg-vibespace-dark-blue p-4 rounded-lg">
                  <h3 className="font-medium text-vibespace-light-purple">For Students</h3>
                  <p className="mt-1">
                    Students can browse available events, form teams, and submit their projects 
                    with comprehensive details including team members, technologies used, and project documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="vibespace-card mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-vibespace-dark-blue p-4 rounded-lg">
              <h3 className="font-medium text-vibespace-light-purple">Event Management</h3>
              <p className="mt-1">Create, update, and manage educational events with customizable rules and requirements.</p>
            </div>
            
            <div className="bg-vibespace-dark-blue p-4 rounded-lg">
              <h3 className="font-medium text-vibespace-light-purple">Project Submissions</h3>
              <p className="mt-1">Simple submission process for students to showcase their projects and team information.</p>
            </div>
            
            <div className="bg-vibespace-dark-blue p-4 rounded-lg">
              <h3 className="font-medium text-vibespace-light-purple">Team Collaboration</h3>
              <p className="mt-1">Support for team-based submissions with detailed member roles and responsibilities.</p>
            </div>
            
            <div className="bg-vibespace-dark-blue p-4 rounded-lg">
              <h3 className="font-medium text-vibespace-light-purple">Project Showcase</h3>
              <p className="mt-1">Professional display of student projects with screenshots, descriptions, and links.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-4">Ready to Get Started?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="vibespace-button-primary">
            <Link to="/">Browse Events</Link>
          </Button>
          <Button asChild variant="outline" className="vibespace-button-secondary">
            <Link to="/admin">Admin Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
