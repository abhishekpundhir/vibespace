
import { useState, useEffect } from 'react';
import { toast } from './use-toast';

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  message: string;
  sentAt: string;
}

export const useNotifications = () => {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(() => {
    try {
      const savedLogs = localStorage.getItem('vibespace-email-logs');
      return savedLogs ? JSON.parse(savedLogs) : [];
    } catch (error) {
      console.error('Error loading email logs from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vibespace-email-logs', JSON.stringify(emailLogs));
    } catch (error) {
      console.error('Error saving email logs to localStorage:', error);
    }
  }, [emailLogs]);

  const sendFeedbackEmail = async (email: string, subject: string, message: string): Promise<boolean> => {
    // In a real application, this would connect to a backend service
    console.log(`Sending email to: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    
    // Log the email for persistence
    const newEmailLog: EmailLog = {
      id: Date.now().toString(),
      to: email,
      subject,
      message,
      sentAt: new Date().toISOString()
    };
    
    setEmailLogs(prev => [...prev, newEmailLog]);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Feedback Email Sent",
          description: `Feedback has been sent to ${email}`
        });
        resolve(true);
      }, 1000);
    });
  };

  const getEmailLogs = () => {
    return emailLogs;
  };

  return {
    sendFeedbackEmail,
    getEmailLogs
  };
};
