import { useState, useEffect } from 'react';
import { mockAdmins } from '../data/mockData';
import { toast } from './use-toast';

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vibespace-isAdmin') === 'true';
    } catch (error) {
      console.error('Error reading admin status from localStorage:', error);
      return false;
    }
  });
  
  const [currentAdmin, setCurrentAdmin] = useState<{ id: string; name: string } | null>(() => {
    try {
      const savedAdmin = localStorage.getItem('vibespace-currentAdmin');
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch (error) {
      console.error('Error reading current admin from localStorage:', error);
      return null;
    }
  });
  
  const [adminData, setAdminData] = useState(() => {
    try {
      const savedAdminData = localStorage.getItem('vibespace-adminData');
      return savedAdminData ? JSON.parse(savedAdminData) : mockAdmins;
    } catch (error) {
      console.error('Error reading admin data from localStorage:', error);
      return mockAdmins;
    }
  });

  // Save admin state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vibespace-isAdmin', isAdmin.toString());
    } catch (error) {
      console.error('Error saving admin status to localStorage:', error);
    }
  }, [isAdmin]);
  
  useEffect(() => {
    try {
      localStorage.setItem('vibespace-currentAdmin', currentAdmin ? JSON.stringify(currentAdmin) : '');
    } catch (error) {
      console.error('Error saving current admin to localStorage:', error);
    }
  }, [currentAdmin]);
  
  useEffect(() => {
    try {
      localStorage.setItem('vibespace-adminData', JSON.stringify(adminData));
    } catch (error) {
      console.error('Error saving admin data to localStorage:', error);
    }
  }, [adminData]);

  const login = (username: string, password: string) => {
    const admin = adminData.find(
      a => a.username === username && a.password === password
    );
    
    if (admin) {
      setIsAdmin(true);
      setCurrentAdmin({ id: admin.id, name: admin.name });
      toast({
        title: "Login Successful",
        description: `Welcome back, ${admin.name}!`
      });
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: "Invalid username or password."
    });
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setCurrentAdmin(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  const updateAdminCredentials = (currentPassword: string, newUsername: string, newPassword: string) => {
    if (!isAdmin || !currentAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "You must be logged in as an admin to update credentials."
      });
      return false;
    }
    
    const adminIndex = adminData.findIndex(a => a.id === currentAdmin.id);
    if (adminIndex === -1) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Admin not found."
      });
      return false;
    }
    
    // Verify current password
    if (adminData[adminIndex].password !== currentPassword) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Current password is incorrect."
      });
      return false;
    }
    
    // Check if username is already taken by another admin
    const usernameExists = adminData.some(
      (a) => a.id !== currentAdmin.id && a.username === newUsername
    );
    
    if (usernameExists) {
      toast({
        variant: "destructive",
        title: "Username Taken",
        description: "This username is already in use. Please choose another."
      });
      return false;
    }
    
    // Update the admin credentials
    const updatedAdmin = {
      ...adminData[adminIndex],
      username: newUsername,
      password: newPassword
    };
    
    const newAdminData = [...adminData];
    newAdminData[adminIndex] = updatedAdmin;
    
    setAdminData(newAdminData);
    setCurrentAdmin({ id: updatedAdmin.id, name: updatedAdmin.name });
    
    toast({
      title: "Credentials Updated",
      description: "Your admin credentials have been updated successfully."
    });
    
    return true;
  };

  return {
    isAdmin,
    currentAdmin,
    login,
    logout,
    updateAdminCredentials
  };
};
