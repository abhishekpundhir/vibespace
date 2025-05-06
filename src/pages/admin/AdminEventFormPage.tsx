import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Event } from '../../types';
import { format } from 'date-fns';

// Define the form schema with required fields
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  rules: z.string().min(10, {
    message: "Rules must be at least 10 characters."
  }),
  prerequisites: z.string().min(5, {
    message: "Prerequisites must be at least 5 characters."
  }),
  startDate: z.string().min(1, {
    message: "Start date is required."
  }),
  endDate: z.string().min(1, {
    message: "End date is required."
  }),
  maxTeamSize: z.coerce.number().int().min(1).max(10),
  status: z.enum(['upcoming', 'active', 'completed']),
  imageUrl: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AdminEventFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, getEventById, addEvent, updateEvent, currentAdmin } = useApp();
  const isEditMode = Boolean(id);
  const event = isEditMode ? getEventById(id || '') : null;
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      rules: '',
      prerequisites: '',
      startDate: '',
      endDate: '',
      maxTeamSize: 4,
      status: 'upcoming' as const,
      imageUrl: '',
    },
  });
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    
    if (isEditMode && event) {
      // Format dates for datetime-local input
      const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "yyyy-MM-dd'T'HH:mm");
      };
      
      form.reset({
        title: event.title,
        description: event.description,
        rules: event.rules,
        prerequisites: event.prerequisites,
        startDate: formatDateForInput(event.startDate),
        endDate: formatDateForInput(event.endDate),
        maxTeamSize: event.maxTeamSize,
        status: event.status,
        imageUrl: event.imageUrl || '',
      });
    }
  }, [isAdmin, navigate, isEditMode, event, form]);
  
  const onSubmit = (values: FormData) => {
    if (isEditMode && event) {
      updateEvent(event.id, values);
      navigate(`/admin/events/${event.id}`);
    } else {
      if (!currentAdmin) return;
      
      // Since we're using zod validation, values contains all the required fields
      // Explicitly create a properly typed event object with all required fields
      const eventData = {
        title: values.title,
        description: values.description,
        rules: values.rules,
        prerequisites: values.prerequisites,
        startDate: values.startDate,
        endDate: values.endDate,
        maxTeamSize: values.maxTeamSize,
        status: values.status,
        createdBy: currentAdmin.name,
        imageUrl: values.imageUrl,
        location: "Online", // Default value
        prizes: [{ place: "1st Place", description: "Recognition", value: "Certificate" }], // Default value
        categories: ["General"] // Default value
      };
      
      const newEvent = addEvent(eventData);
      navigate(`/admin/events/${newEvent.id}`);
    }
  };
  
  if (!isAdmin) return null;
  
  return (
    <div className="container mx-auto max-w-3xl animate-fade-in">
      <Button onClick={() => navigate('/admin/dashboard')} variant="outline" className="mb-6 vibespace-button-secondary">
        &larr; Back to Dashboard
      </Button>
      
      <Card className="vibespace-card">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6 text-white">
            {isEditMode ? 'Edit Event' : 'Create New Event'}
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Event Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Event Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the event..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Event Rules */}
              <FormField
                control={form.control}
                name="rules"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rules</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List the rules for participation..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Prerequisites */}
              <FormField
                control={form.control}
                name="prerequisites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prerequisites</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List any prerequisites for participation..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Max Team Size */}
              <FormField
                control={form.control}
                name="maxTeamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Team Size</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        max={10} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Image URL */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input value="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" {...field} />
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                      <div className="mt-2 rounded-md overflow-hidden">
                        <img 
                          src={field.value} 
                          alt="Event preview" 
                          className="max-h-40 object-cover"
                          onError={(e) => {
                            // Hide image on error
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/dashboard')}
                  className="vibespace-button-secondary"
                >
                  Cancel
                </Button>
                <Button type="submit" className="vibespace-button-primary">
                  {isEditMode ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AdminEventFormPage;
