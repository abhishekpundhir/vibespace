
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { format } from 'date-fns';
import { Separator } from '../../components/ui/separator';
import { ExternalLink, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema for the feedback form
const feedbackSchema = z.object({
  feedback: z
    .string()
    .min(10, { message: 'Feedback should be at least 10 characters' })
    .max(500, { message: 'Feedback should not exceed 500 characters' }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const AdminSubmissionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSubmissionById, getEventById, isAdmin, updateSubmissionStatus, sendFeedbackEmail } = useApp();
  const [dialogAction, setDialogAction] = useState<'approved' | 'rejected'>('approved');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResendingFeedback, setIsResendingFeedback] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: '',
    },
  });
  
  // Use useEffect to check admin status after component mount
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);
  
  const submission = getSubmissionById(id || '');
  
  if (!submission) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Submission Not Found</h1>
        <p className="mb-8">The submission you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }
  
  const event = getEventById(submission.eventId);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
  };

  const handleOpenDialog = (action: 'approved' | 'rejected') => {
    form.reset({ feedback: '' });
    setDialogAction(action);
    setIsDialogOpen(true);
  };

  const handleSubmitFeedback = (values: FeedbackFormValues) => {
    updateSubmissionStatus(submission.id, dialogAction, values.feedback);
    setIsDialogOpen(false);
  };

  const getStatusBadge = () => {
    switch (submission.status) {
      case 'approved':
        return <div className="flex items-center gap-2 text-green-500"><CheckCircle size={16} /> Approved</div>;
      case 'rejected':
        return <div className="flex items-center gap-2 text-red-500"><XCircle size={16} /> Rejected</div>;
      default:
        return <div className="flex items-center gap-2 text-amber-500"><AlertCircle size={16} /> Pending Review</div>;
    }
  };

  const handleResendFeedback = () => {
    if (!submission.contactEmail || !submission.feedback) return;
    
    setIsResendingFeedback(true);
    
    const subject = `Your project "${submission.projectName}" feedback`;
    const message = `
Dear ${submission.teamName} Team,

Your project "${submission.projectName}" has been ${submission.status}.

Feedback from reviewer (${submission.reviewedBy || "Admin"}):
${submission.feedback}

Thank you for your participation!
VibeSpace Team
    `;

    sendFeedbackEmail(submission.contactEmail, subject, message)
      .then(() => {
        setIsResendingFeedback(false);
      })
      .catch(error => {
        console.error("Error resending feedback:", error);
        setIsResendingFeedback(false);
      });
  };
  
  return (
    <div className="container mx-auto max-w-4xl py-8 animate-fade-in">
      <Button 
        onClick={() => navigate(`/admin/events/${submission.eventId}`)} 
        variant="outline" 
        className="mb-6 vibespace-button-secondary"
      >
        &larr; Back to Event
      </Button>
      
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">{submission.projectName}</h1>
          <p className="text-vibespace-light-purple">by Team: {submission.teamName}</p>
          {event && (
            <div className="mt-2">
              <p className="text-muted-foreground">
                Submitted for: <span className="text-vibespace-light-text">{event.title}</span> on {formatDate(submission.submittedAt)}
              </p>
            </div>
          )}
          {submission.contactEmail && (
            <p className="text-muted-foreground mt-1">
              Contact: <span className="text-vibespace-light-text">{submission.contactEmail}</span>
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge()}
        </div>
      </div>
      
      {submission.status === 'pending' && (
        <div className="mb-6 flex justify-end space-x-4">
          <Button 
            variant="outline" 
            className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50"
            onClick={() => handleOpenDialog('rejected')}
          >
            <XCircle className="mr-2 h-4 w-4" /> Reject Submission
          </Button>
          <Button 
            variant="outline" 
            className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/50"
            onClick={() => handleOpenDialog('approved')}
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Approve Submission
          </Button>
        </div>
      )}
      
      {(submission.status === 'approved' || submission.status === 'rejected') && submission.feedback && (
        <Card className={`mb-6 border ${submission.status === 'approved' ? 'border-green-500/30' : 'border-red-500/30'}`}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className={submission.status === 'approved' ? 'text-green-500' : 'text-red-500'}>
              {submission.status === 'approved' ? 'Approval Feedback' : 'Rejection Feedback'}
            </CardTitle>
            {submission.contactEmail && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-vibespace-light-purple"
                onClick={handleResendFeedback}
                disabled={isResendingFeedback}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isResendingFeedback ? 'Sending...' : 'Resend Feedback'}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{submission.feedback}</p>
            {submission.reviewedAt && (
              <p className="text-sm text-muted-foreground mt-4">
                Reviewed by {submission.reviewedBy} on {formatDate(submission.reviewedAt)}
              </p>
            )}
          </CardContent>
        </Card>
      )}
      
      {submission.imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={submission.imageUrl} 
            alt={submission.projectName}
            className="w-full h-auto max-h-96 object-contain bg-vibespace-card-bg"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="vibespace-card">
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">
                {submission.description}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {submission.techStack.map((tech, index) => (
                      <span key={index} className="bg-vibespace-purple/20 text-vibespace-light-purple px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Project Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a 
                      href={submission.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-2 text-vibespace-light-purple hover:underline"
                    >
                      <span>Repository</span>
                      <ExternalLink size={14} />
                    </a>
                    
                    {submission.liveUrl && (
                      <a 
                        href={submission.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-2 text-vibespace-light-purple hover:underline"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="vibespace-card">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submission.members.map((member, index) => (
                  <div key={index} className="py-2 border-b border-vibespace-border last:border-0">
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-vibespace-light-purple">{member.role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={dialogAction === 'approved' ? 'text-green-500' : 'text-red-500'}>
              {dialogAction === 'approved' ? 'Approve Submission' : 'Reject Submission'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitFeedback)} className="space-y-6">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    {submission.contactEmail && (
                      <p className="text-sm text-muted-foreground mb-2">
                        This feedback will be sent to the team's email: {submission.contactEmail}
                      </p>
                    )}
                    <FormControl>
                      <Textarea 
                        placeholder="Provide feedback on this submission..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className={dialogAction === 'approved' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'}
                >
                  {dialogAction === 'approved' ? 'Approve' : 'Reject'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubmissionDetailPage;
