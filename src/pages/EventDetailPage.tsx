
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, getSubmissionsByEventId, isAdmin } = useApp();
  const [activeTab, setActiveTab] = useState('details');
  
  const event = getEventById(id || '');
  const submissions = getSubmissionsByEventId(id || '');
  
  if (!event) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Back to Events</Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy h:mm a');
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-600';
      case 'active':
        return 'bg-green-600';
      case 'completed':
        return 'bg-gray-600';
      default:
        return 'bg-vibespace-purple';
    }
  };
  
  const handleShareEvent = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Event link copied to clipboard!');
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
      <Button onClick={() => navigate('/')} variant="outline" className="mb-6 vibespace-button-secondary">
        &larr; Back to Events
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          {event.imageUrl && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="object-cover w-full h-full"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 ${getStatusBadgeClass(event.status)} rounded-full text-sm font-medium text-white`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </div>
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-2 text-white">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <span className="text-muted-foreground">Start Date:</span>
              <span className="ml-2 text-vibespace-light-text">{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">End Date:</span>
              <span className="ml-2 text-vibespace-light-text">{formatDate(event.endDate)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">Team Size:</span>
              <span className="ml-2 text-vibespace-light-text">Up to {event.maxTeamSize} members</span>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground">Created by:</span>
              <span className="ml-2 text-vibespace-light-text">{event.createdBy}</span>
            </div>
          </div>
          
          <Tabs defaultValue="details" onValueChange={setActiveTab} className="mt-8">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
              {isAdmin && <TabsTrigger value="submissions">Submissions ({submissions.length})</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <div className="vibespace-card">
                <p className="whitespace-pre-line">{event.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="mt-4">
              <div className="vibespace-card">
                <p className="whitespace-pre-line">{event.rules}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="prerequisites" className="mt-4">
              <div className="vibespace-card">
                <p className="whitespace-pre-line">{event.prerequisites}</p>
              </div>
            </TabsContent>
            
            {isAdmin && (
              <TabsContent value="submissions" className="mt-4">
                <div className="vibespace-card">
                  {submissions.length === 0 ? (
                    <p>No submissions yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {submissions.map(submission => (
                        <Card key={submission.id} className="bg-vibespace-dark-blue">
                          <CardHeader>
                            <CardTitle>{submission.projectName}</CardTitle>
                            <CardDescription>Team: {submission.teamName}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button
                              onClick={() => navigate(`/submissions/${submission.id}`)}
                              size="sm"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="vibespace-card sticky top-24">
            <h3 className="text-xl font-semibold mb-4 text-white">Join This Event</h3>
            <p className="mb-4">Ready to participate? Submit your project for this event!</p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate(`/events/${event.id}/submit`)} 
                className="w-full vibespace-button-primary"
              >
                Submit Project
              </Button>
              
              <Button 
                onClick={handleShareEvent} 
                variant="outline" 
                className="w-full vibespace-button-secondary"
              >
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
