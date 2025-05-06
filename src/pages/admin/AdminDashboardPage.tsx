import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Settings } from 'lucide-react';
import "./adminstyle.css"

const AdminDashboardPage = () => {
  const { events, submissions, isAdmin, currentAdmin } = useApp();

  // Redirect functionality would be handled in a useEffect

  const activeEvents = events.filter(event => event.status === 'active');
  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const completedEvents = events.filter(event => event.status === 'completed');
  
  const pendingSubmissions = submissions.filter(sub => sub.status === 'pending');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold"><b>Welcome - {currentAdmin.name}</b></h1>
          {currentAdmin && (
            <p className="text-muted-foreground"><b>Status <i className="online">Online</i></b></p>
          )}
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/admin/events/new">Create New Event</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Active Events</h2>
          {activeEvents.length === 0 ? (
            <p className="text-muted-foreground">No active events currently.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground">No upcoming events scheduled.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Completed Events</h2>
          {completedEvents.length === 0 ? (
            <p className="text-muted-foreground">No completed events yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="submissions" className="space-y-4 mt-4">
          <h2 className="text-xl font-semibold">Pending Submissions</h2>
          {pendingSubmissions.length === 0 ? (
            <p className="text-muted-foreground">No pending submissions.</p>
          ) : (
            <div className="space-y-4">
              {pendingSubmissions.map(submission => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface EventCardProps {
  event: any;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/admin/events/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface SubmissionCardProps {
  submission: any;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{submission.projectName}</CardTitle>
        <CardDescription>Team: {submission.teamName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Submitted At: {new Date(submission.submittedAt).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/admin/submissions/${submission.id}`}>View Submission</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminDashboardPage;
