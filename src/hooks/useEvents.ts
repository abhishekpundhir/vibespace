
import { useState, useEffect } from 'react';
import { Event } from '../types';
import { mockEvents } from '../data/mockData';
import { ensureActiveEvents } from '../data/activeEvents';
import { toast } from './use-toast';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      // Try to get events from localStorage first
      const savedEvents = localStorage.getItem('vibespace-events');
      // Parse the saved events, or use mock events if none exist
      const initialEvents = savedEvents ? JSON.parse(savedEvents) : mockEvents;
      
      // Ensure we have at least 3 active events
      return ensureActiveEvents(initialEvents);
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
      return ensureActiveEvents(mockEvents);
    }
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('vibespace-events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  const addEvent = (event: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setEvents([...events, newEvent]);
    toast({
      title: "Event Created",
      description: `"${newEvent.title}" has been created successfully.`
    });
    return newEvent;
  };

  const updateEvent = (eventId: string, eventData: Partial<Event>) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, ...eventData } : event
    );
    
    setEvents(updatedEvents);
    toast({
      title: "Event Updated",
      description: "The event has been updated successfully."
    });
  };

  const deleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    setEvents(events.filter(event => event.id !== eventId));
    
    toast({
      title: "Event Deleted",
      description: eventToDelete ? `"${eventToDelete.title}" has been deleted.` : "Event has been deleted."
    });
    
    return eventId; // Return the ID for potential use by other hooks
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById
  };
};
