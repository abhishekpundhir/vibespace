
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../components/ui/carousel';
import "./nav.css"
const EventsPage = () => {
  const { events } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed' | 'all'>('all');
  
  const filteredEvents = activeTab === 'all' 
    ? events 
    : events.filter(event => event.status === activeTab);
  
  const activeEvents = events.filter(event => event.status === 'active');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };
  
  return (
    <div className="container mx-auto animate-fade-in ">
      {/* <div className=" flex flex-col md:flex-row justify-center items-center hhh md:items-center mb-8">
        <div className=""> 
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome To VibeSpace.Com</h1>
          <p className="text-vibespace-light-text">Dive Into Innovation — Explore Campus Hackathons, Showcase Your Ideas, and Let Your Code Make the Noise !</p>
        </div>
      </div> */}
    
      {activeEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">Active Events</h2>
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {activeEvents.map(event => (
                  <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className=" vibespace-card-hover h-full">
                      {event.imageUrl && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded-md text-xs font-medium text-white">
                            {event.status}
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                        <CardDescription>
                          {formatDate(event.startDate)} - {formatDate(event.endDate)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2 text-sm">{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => navigate(`/events/${event.id}`)} 
                          className="w-full vibespace-button-primary"
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-4">
                <CarouselPrevious className="relative inset-0 translate-y-0 left-0" />
                <CarouselNext className="relative inset-0 translate-y-0 right-0" />
              </div>
            </Carousel>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as any)}>
        <center>
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        </center>

        
        <TabsContent value={activeTab} className="mt-0">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">No events found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <Card key={event.id} className=" vibespace-card-hover">
                  {event.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-vibespace-purple rounded-md text-xs font-medium text-white">
                        {event.status}
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                    <CardDescription>
                      {formatDate(event.startDate)} - {formatDate(event.endDate)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm">{event.description}</p>
                    <div className="mt-4">
                      <div className="flex items-center text-xs">
                        <span className="text-muted-foreground">Team Size:</span>
                        <span className="ml-2 text-vibespace-light-text">Up to {event.maxTeamSize} members</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate(`/events/${event.id}`)} 
                      className="w-full vibespace-button-primary"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
