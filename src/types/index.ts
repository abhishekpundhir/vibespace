
export interface Event {
  id: string;
  title: string;
  description: string;
  rules: string;
  prerequisites: string; // Added this property
  startDate: string;
  endDate: string;
  location: string;
  status: 'upcoming' | 'active' | 'completed';
  maxTeamSize: number;
  prizes: Prize[];
  categories: string[];
  bannerImage?: string;
  imageUrl?: string; // Added this property
  createdAt: string;
  createdBy: string; // Added this property
}

export interface Prize {
  place: string;
  description: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email?: string;
}

export interface Submission {
  id: string;
  eventId: string;
  projectName: string;
  teamName: string;
  contactEmail?: string;
  members: TeamMember[];
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface Admin {
  id: string;
  name: string;
  username: string;
  password: string;
}
