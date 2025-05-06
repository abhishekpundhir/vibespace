
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { format } from 'date-fns';
import { Pencil, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../../components/ui/dialog';

const AdminEventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, getSubmissionsByEventId, deleteEvent, isAdmin } = useApp();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  if (!isAdmin) {
    navigate('/admin');
    return null;
  }
  
  const event = getEventById(id || '');
  const submissions = getSubmissionsByEventId(id || '');
  
  if (!event) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
  };
  
  const handleDeleteEvent = () => {
    deleteEvent(event.id);
    navigate('/admin/dashboard');
  };
  
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return <div className="flex items-center gap-1 text-green-500"><CheckCircle size={14} /> Approved</div>;
      case 'rejected':
        return <div className="flex items-center gap-1 text-red-500"><XCircle size={14} /> Rejected</div>;
      default:
        return <div className="flex items-center gap-1 text-amber-500"><AlertCircle size={14} /> Pending</div>;
    }
  };

  const getStatusCount = (status: 'approved' | 'rejected' | 'pending') => {
    if (status === 'pending') {
      return submissions.filter(s => !s.status || s.status === 'pending').length;
    }
    return submissions.filter(s => s.status === status).length;
  };
  
  return (
    <div className="container mx-auto max-w-6xl py-8">
      <Button 
        onClick={() => navigate('/admin/dashboard')} 
        variant="outline" 
        className="mb-6 vibespace-button-secondary"
      >
        &larr; Back to Dashboard
      </Button>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">{event.title}</h1>
          <p className="text-muted-foreground">
            Created on {formatDate(event.createdAt)} by {event.createdBy}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="vibespace-button-secondary" 
            onClick={() => navigate(`/admin/events/edit/${event.id}`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Event
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="vibespace-card flex items-center justify-between p-4">
          <div>
            <p className="text-muted-foreground text-sm">Event Status</p>
            <p className="text-xl font-bold text-white capitalize">{event.status}</p>
          </div>
        </div>
        <div className="vibespace-card flex items-center justify-between p-4">
          <div>
            <p className="text-muted-foreground text-sm">Duration</p>
            <p className="text-xl font-bold text-white">
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </p>
          </div>
        </div>
        <div className="vibespace-card flex items-center justify-between p-4">
          <div>
            <p className="text-muted-foreground text-sm">Team Size</p>
            <p className="text-xl font-bold text-white">Up to {event.maxTeamSize} members</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="mt-8">
        <TabsList>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="submissions">
            Submissions ({submissions.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            <Card className="vibespace-card">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{event.description}</p>
              </CardContent>
            </Card>
            
            <Card className="vibespace-card">
              <CardHeader>
                <CardTitle>Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{event.rules}</p>
              </CardContent>
            </Card>
            
            <Card className="vibespace-card">
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{event.prerequisites}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="submissions" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-vibespace-card-bg p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold">{submissions.length}</p>
            </Card>
            <Card className="bg-green-500/10 border-green-500/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-green-500">{getStatusCount('approved')}</p>
            </Card>
            <Card className="bg-red-500/10 border-red-500/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-bold text-red-500">{getStatusCount('rejected')}</p>
            </Card>
            <Card className="bg-amber-500/10 border-amber-500/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold text-amber-500">{getStatusCount('pending')}</p>
            </Card>
          </div>
          
          {submissions.length === 0 ? (
            <Card className="vibespace-card">
              <CardHeader>
                <CardTitle>No Submissions Yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p>There are no project submissions for this event yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="vibespace-card">
              <CardHeader>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>
                  Manage all the submissions received for this event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Submitted On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.projectName}</TableCell>
                        <TableCell>{submission.teamName}</TableCell>
                        <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          <Button 
                            onClick={() => navigate(`/admin/submissions/${submission.id}`)} 
                            variant="outline" 
                            size="sm"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the event 
              "{event.title}" and all associated submissions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventDetailPage;
