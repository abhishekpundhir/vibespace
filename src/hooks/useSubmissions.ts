import { useState, useEffect } from 'react';
import { Submission } from '../types';
import { mockSubmissions } from '../data/mockData';
import { toast } from './use-toast';

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      // Try to get submissions from localStorage first
      const savedSubmissions = localStorage.getItem('vibespace-submissions');
      return savedSubmissions 
        ? JSON.parse(savedSubmissions) 
        : mockSubmissions.map(sub => ({ ...sub, status: 'pending' }));
    } catch (error) {
      console.error('Error loading submissions from localStorage:', error);
      return mockSubmissions.map(sub => ({ ...sub, status: 'pending' }));
    }
  });

  // Save submissions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('vibespace-submissions', JSON.stringify(submissions));
    } catch (error) {
      console.error('Error saving submissions to localStorage:', error);
    }
  }, [submissions]);

  const addSubmission = (submission: Omit<Submission, 'id' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setSubmissions([...submissions, newSubmission]);
    toast({
      title: "Submission Received",
      description: "Your project has been submitted successfully!"
    });
    return newSubmission;
  };

  const updateSubmissionStatus = (
    submissionId: string, 
    status: 'approved' | 'rejected', 
    feedback: string = '',
    reviewedBy: string = ''
  ) => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status, 
            feedback: feedback || '', 
            reviewedAt: new Date().toISOString(),
            reviewedBy
          } 
        : sub
    );
    
    setSubmissions(updatedSubmissions);
    
    const actionText = status === 'approved' ? 'approved' : 'rejected';
    toast({
      title: `Submission ${actionText}`,
      description: `The submission has been ${actionText} successfully.`
    });
    
    return submissions.find(sub => sub.id === submissionId);
  };

  const deleteSubmissionsForEvent = (eventId: string) => {
    setSubmissions(submissions.filter(sub => sub.eventId !== eventId));
  };

  const getSubmissionById = (id: string) => {
    return submissions.find(sub => sub.id === id);
  };

  const getSubmissionsByEventId = (eventId: string) => {
    return submissions.filter(sub => sub.eventId === eventId);
  };

  return {
    submissions,
    addSubmission,
    updateSubmissionStatus,
    deleteSubmissionsForEvent,
    getSubmissionById,
    getSubmissionsByEventId
  };
};
