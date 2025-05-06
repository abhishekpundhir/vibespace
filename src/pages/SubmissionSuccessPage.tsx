
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';

const SubmissionSuccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById } = useApp();
  const event = getEventById(id || '');
  
  if (!event) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="container mx-auto max-w-xl py-12 animate-fade-in">
      <Card className="vibespace-card">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-white">Submission Successful!</h1>
          <p className="text-vibespace-light-text mb-6">
            Your project has been successfully submitted to <span className="text-vibespace-light-purple">{event.title}</span>.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate(`/events/${event.id}`)} 
              className="w-full vibespace-button-primary"
            >
              Return to Event
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="w-full vibespace-button-secondary"
            >
              Explore More Events
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubmissionSuccessPage;
