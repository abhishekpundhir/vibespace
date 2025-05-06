
import React, { createContext, useContext, ReactNode } from 'react';
import { Event, Submission } from '../types';
import { useEvents } from '../hooks/useEvents';
import { useSubmissions } from '../hooks/useSubmissions';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { toast } from '../hooks/use-toast';

interface AppContextType {
  events: Event[];
  submissions: Submission[];
  isAdmin: boolean;
  currentAdmin: { id: string; name: string } | null;
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => Event;
  updateEvent: (eventId: string, eventData: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
  updateSubmissionStatus: (submissionId: string, status: 'approved' | 'rejected', feedback?: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateAdminCredentials: (currentPassword: string, newUsername: string, newPassword: string) => boolean;
  getEventById: (id: string) => Event | undefined;
  getSubmissionsByEventId: (eventId: string) => Submission[];
  getSubmissionById: (id: string) => Submission | undefined;
  sendFeedbackEmail: (email: string, subject: string, message: string) => Promise<boolean>;
  getEmailLogs: () => { id: string; to: string; subject: string; message: string; sentAt: string }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    getEventById 
  } = useEvents();
  
  const { 
    submissions, 
    addSubmission, 
    updateSubmissionStatus: updateStatus, 
    deleteSubmissionsForEvent,
    getSubmissionById, 
    getSubmissionsByEventId 
  } = useSubmissions();
  
  const { 
    isAdmin, 
    currentAdmin, 
    login, 
    logout, 
    updateAdminCredentials 
  } = useAuth();
  
  const { 
    sendFeedbackEmail,
    getEmailLogs 
  } = useNotifications();

  // Override deleteEvent to also delete submissions
  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    deleteSubmissionsForEvent(eventId);
  };

  // Enhanced updateSubmissionStatus with admin check and email notifications
  const handleUpdateSubmissionStatus = (submissionId: string, status: 'approved' | 'rejected', feedback?: string) => {
    if (!isAdmin || !currentAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "You must be an admin to update submission status."
      });
      return;
    }
    
    const submission = getSubmissionById(submissionId);
    if (!submission) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Submission not found."
      });
      return;
    }

    // Update the submission status
    updateStatus(submissionId, status, feedback || '', currentAdmin.name);
    
    // Send email notification if contact email exists
    if (submission.contactEmail && feedback) {
      const actionText = status === 'approved' ? 'approved' : 'rejected';
      const subject = `Your project "${submission.projectName}" has been ${actionText}`;
      const message = `
Dear ${submission.teamName} Team,

Your project "${submission.projectName}" has been ${actionText}.

Feedback from reviewer (${currentAdmin.name}):
${feedback}

Thank you for your participation!
VibeSpace Team
      `;

      sendFeedbackEmail(submission.contactEmail, subject, message)
        .catch(error => {
          console.error("Error sending feedback email:", error);
          toast({
            variant: "destructive",
            title: "Email Notification Failed",
            description: "Could not send feedback notification email."
          });
        });
    }
  };

  return (
    <AppContext.Provider
      value={{
        events,
        submissions,
        isAdmin,
        currentAdmin,
        addEvent,
        updateEvent,
        deleteEvent: handleDeleteEvent,
        addSubmission,
        updateSubmissionStatus: handleUpdateSubmissionStatus,
        login,
        logout,
        updateAdminCredentials,
        getEventById,
        getSubmissionsByEventId,
        getSubmissionById,
        sendFeedbackEmail,
        getEmailLogs
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
