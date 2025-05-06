
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Layouts
import AppLayout from "./components/AppLayout";

// Public pages
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import SubmitProjectPage from "./pages/SubmitProjectPage";
import SubmissionSuccessPage from "./pages/SubmissionSuccessPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminEventFormPage from "./pages/admin/AdminEventFormPage";
import AdminEventDetailPage from "./pages/admin/AdminEventDetailPage";
import AdminSubmissionDetailPage from "./pages/admin/AdminSubmissionDetailPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/events/:id/submit" element={<SubmitProjectPage />} />
              <Route path="/events/:id/success" element={<SubmissionSuccessPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/events/new" element={<AdminEventFormPage />} />
              <Route path="/admin/events/edit/:id" element={<AdminEventFormPage />} />
              <Route path="/admin/events/:id" element={<AdminEventDetailPage />} />
              <Route path="/admin/submissions/:id" element={<AdminSubmissionDetailPage />} />
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
