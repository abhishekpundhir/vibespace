
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Key } from 'lucide-react';

const formSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required",
  }),
  newUsername: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  newPassword: z.string().min(6, {
    message: "New password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(1, {
    message: "Please confirm your new password",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const AdminSettingsPage = () => {
  const { updateAdminCredentials, isAdmin, currentAdmin } = useApp();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = updateAdminCredentials(
      values.currentPassword,
      values.newUsername,
      values.newPassword
    );
    
    if (success) {
      setSuccess(true);
      form.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Settings</h1>
      
      {success && (
        <Alert className="mb-6 bg-green-50 border-green-500">
          <Key className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your admin credentials have been updated successfully.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="vibespace-card">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">Update Login Information</h2>
            <p className="text-vibespace-light-text">
              {currentAdmin ? `Current user: ${currentAdmin.name}` : 'Update your admin credentials'}
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter new username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full vibespace-button-primary">
                Update Credentials
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
