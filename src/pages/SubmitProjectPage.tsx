import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Submission, TeamMember } from '../types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { X, Plus } from 'lucide-react';
import { toast } from '../components/ui/use-toast';
import { Card } from '../components/ui/card';

const SubmitProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, addSubmission } = useApp();
  const event = getEventById(id || '');
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: '', role: '', email: '' }]);
  const [techStack, setTechStack] = useState<string[]>(['']);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Form schema
  const formSchema = z.object({
    projectName: z.string().min(2, {
      message: "Project name must be at least 2 characters.",
    }),
    teamName: z.string().min(2, {
      message: "Team name must be at least 2 characters.",
    }),
    contactEmail: z.string().email({
      message: "Please enter a valid contact email for feedback.",
    }),
    repoUrl: z.string().url({
      message: "Please enter a valid URL.",
    }),
    liveUrl: z.string().url({
      message: "Please enter a valid URL.",
    }).optional().or(z.literal('')),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters."
    }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      teamName: '',
      contactEmail: '',
      repoUrl: '',
      liveUrl: '',
      description: '',
    },
  });
  
  if (!event) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Back to Events</Button>
      </div>
    );
  }
  
  const addTeamMember = () => {
    if (teamMembers.length >= event.maxTeamSize) {
      toast({
        variant: "destructive",
        title: "Team Size Limit Reached",
        description: `This event allows a maximum of ${event.maxTeamSize} team members.`,
      });
      return;
    }
    setTeamMembers([...teamMembers, { name: '', role: '', email: '' }]);
  };
  
  const removeTeamMember = (index: number) => {
    if (teamMembers.length === 1) return;
    const newMembers = [...teamMembers];
    newMembers.splice(index, 1);
    setTeamMembers(newMembers);
  };
  
  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };
  
  const addTechStackItem = () => {
    setTechStack([...techStack, '']);
  };
  
  const removeTechStackItem = (index: number) => {
    if (techStack.length === 1) return;
    const newTechStack = [...techStack];
    newTechStack.splice(index, 1);
    setTechStack(newTechStack);
  };
  
  const updateTechStackItem = (index: number, value: string) => {
    const newTechStack = [...techStack];
    newTechStack[index] = value;
    setTechStack(newTechStack);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Validate team members
    const validMembers = teamMembers.filter(member => member.name.trim() !== '' && member.role.trim() !== '');
    if (validMembers.length === 0) {
      toast({
        variant: "destructive",
        title: "Team Members Required",
        description: "Please add at least one team member with name and role.",
      });
      return;
    }
    
    // Validate tech stack
    const validTech = techStack.filter(tech => tech.trim() !== '');
    if (validTech.length === 0) {
      toast({
        variant: "destructive",
        title: "Tech Stack Required",
        description: "Please add at least one technology used in your project.",
      });
      return;
    }
    
    // Create submission
    const submission: Omit<Submission, 'id' | 'submittedAt'> = {
      eventId: event.id,
      projectName: values.projectName,
      teamName: values.teamName,
      contactEmail: values.contactEmail,
      members: validMembers,
      techStack: validTech,
      repoUrl: values.repoUrl,
      liveUrl: values.liveUrl || undefined,
      description: values.description,
      imageUrl: imagePreview || undefined,
      status: 'pending'
    };
    
    addSubmission(submission);
    navigate(`/events/${event.id}/success`);
  };
  
  return (
    <div className="container mx-auto max-w-3xl animate-fade-in">
      <Button onClick={() => navigate(`/events/${event.id}`)} variant="outline" className="mb-6 vibespace-button-secondary">
        &larr; Back to Event
      </Button>
      
      <Card className="vibespace-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2 text-white">Submit Project</h1>
          <p className="text-vibespace-light-text mb-6">
            For: <span className="font-medium text-vibespace-light-purple">{event.title}</span>
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Name */}
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Team Name */}
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Contact Email */}
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email for Feedback</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter email to receive feedback" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Team Members */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <FormLabel className="mb-0">Team Members</FormLabel>
                  <span className="text-xs text-muted-foreground">
                    {teamMembers.length}/{event.maxTeamSize} members
                  </span>
                </div>
                
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex gap-3 flex-col md:flex-row">
                    <div className="flex-1">
                      <Input 
                        placeholder="Member Name"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        placeholder="Role (e.g., Developer, Designer)"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        placeholder="Email (optional)"
                        type="email"
                        value={member.email || ''}
                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeTeamMember(index)}
                      disabled={teamMembers.length === 1}
                      className="md:mt-0 mt-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTeamMember}
                  disabled={teamMembers.length >= event.maxTeamSize}
                  className="vibespace-button-secondary mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Team Member
                </Button>
              </div>
              
              {/* Tech Stack */}
              <div className="space-y-3">
                <FormLabel>Tech Stack</FormLabel>
                
                {techStack.map((tech, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <Input 
                        placeholder="Technology (e.g., React, Node.js)"
                        value={tech}
                        onChange={(e) => updateTechStackItem(index, e.target.value)}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeTechStackItem(index)}
                      disabled={techStack.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTechStackItem}
                  className="vibespace-button-secondary mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Technology
                </Button>
              </div>
              
              {/* Repository URL */}
              <FormField
                control={form.control}
                name="repoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository URL</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., https://github.com/username/repository" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Live URL (Optional) */}
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., https://your-project.netlify.app" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Project Screenshot */}
              <div className="space-y-2">
                <FormLabel>Project Screenshot</FormLabel>
                <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Preview" className="mx-auto max-h-64 rounded-md" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="vibespace-button-secondary"
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Upload a screenshot of your project</p>
                      <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="imageUpload">
                        <Button
                          type="button"
                          variant="outline"
                          className="vibespace-button-secondary cursor-pointer"
                          asChild
                        >
                          <span>Select Image</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your project, its features, and how it works..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full vibespace-button-primary">
                Submit Project
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SubmitProjectPage;
