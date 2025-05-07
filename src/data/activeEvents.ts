
import { Event } from '../types';

// Function to merge active events with existing events
export const ensureActiveEvents = (existingEvents: Event[]): Event[] => {
  // First, find existing active events
  const activeEvents = existingEvents.filter(event => event.status === 'active');
  
  // If we already have 3 or more active events, return the original array
  if (activeEvents.length >= 3) {
    return existingEvents;
  }
  
  // Additional active events to add if needed
  const additionalActiveEvents: Event[] = [
    {
  id: `active-event-1-${Date.now()}`, 
  title: "Web Scraping Mastery", 
  description: "Leverage Python libraries to efficiently extract data from websites and seamlessly integrate it into new frameworks using AI-driven automation.", 
  rules: "Open to designers and developers. Submissions must be compatible with iOS, Android, or cross-platform solutions. Entries should include a functional prototype and an accessibility statement.",
  prerequisites: "Proficiency in AI and a solid understanding of Python.",
  startDate: new Date(Date.now() - 86400000 * 1).toISOString(), // yesterday
  endDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
  location: "Online",
  status: "active",
  maxTeamSize: 4,
  prizes: [
    { place: "1st", description: "Excellence in Accessibility", "value": "₹4,000" },
    { place: "2nd", description: "Pioneering Innovation in Accessibility", "value": "₹2,000" },
    { place: "3rd", description: "Outstanding User Experience", "value": "₹1,000" }
  ],
  categories: ["AI", "Accessibility", "Web Scraping"],
  imageUrl: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  createdBy: "Miss Jyoti"
},
    {
      id: `active-event-2-${Date.now()}`,
      title: "Web3 Development Hackathon",
      description: "Join our Web3 Development Hackathon and build decentralized applications using blockchain technology. This hackathon focuses on creating innovative solutions for the decentralized web. Projects will be judged on originality, technical difficulty, and potential impact.",
      rules: "Teams of 1-4 people. All code must be written during the hackathon. You may use open-source libraries and frameworks.",
      prerequisites: "Basic knowledge of blockchain technology and smart contracts. Experience with Solidity or other smart contract languages is beneficial but not required.",
      startDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
      endDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
      location: "Online",
      status: 'active',
      maxTeamSize: 4,
      prizes: [
        { place: "1st", description: "Best Overall Web3 Project", value: "$5,000" },
        { place: "2nd", description: "Runner-up", value: "₹2,500" },
        { place: "3rd", description: "Third Place", value: "₹1,000" }
      ],
      categories: ["blockchain", "web3", "dapps", "smart contracts"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      createdBy: "Miss Himanshi"
    },
    {
      id: `active-event-3-${Date.now()}`,
      title: "AI Image Generation Challenge",
      description: "Create innovative applications using AI image generation models. This challenge encourages participants to build creative tools that leverage state-of-the-art image generation techniques for practical applications.",
      rules: "Individual or team participation allowed. Must use at least one AI image generation model (DALL-E, Midjourney, Stable Diffusion, etc.). Projects must respect copyright and ethical guidelines.",
      prerequisites: "Experience with AI models and API integration. Understanding of image processing basics.",
      startDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      endDate: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
      location: "Online",
      status: 'active',
      maxTeamSize: 3,
      prizes: [
        { place: "1st", description: "Most Creative Application", value: "₹3,000" },
        { place: "2nd", description: "Best Technical Implementation", value: "₹1,500" },
        { place: "Special", description: "Social Impact Award", value: "₹1,000" }
      ],
      categories: ["artificial intelligence", "image generation", "creative tools"],
      imageUrl: "https://images.unsplash.com/photo-1537141764123-3e635688d381?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
      createdBy: "Miss Anchle"
    },

    {
      id: `active-event-4-${Date.now()}`,
      title: "Mobile App Accessibility Hackathon",
      description: "Design and develop mobile applications with a focus on accessibility. ",
      rules: "Open to designers and developers. Apps must be for iOS, Android, or cross-platform. Submissions must include a working prototype and accessibility statement.",
      prerequisites: "Mobile app development experience. Understanding of WCAG accessibility guidelines recommended.",
      startDate: new Date(Date.now() - 86400000 * 1).toISOString(), // yesterday
      endDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
      location: "Online",
      status: 'active',
      maxTeamSize: 4,
      prizes: [
        { place: "1st", description: "Best Accessible App", value: "₹4,000" },
        { place: "2nd", description: "Innovation in Accessibility", value: "₹2,000" },
        { place: "3rd", description: "User Experience Award", value: "₹1,000" }
      ],
      categories: ["mobile", "accessibility", "inclusive design"],
      imageUrl: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      createdBy: "Miss Jyoti"
    }
  ];
  
  // How many more active events do we need?
  const neededEvents = Math.max(0, 3 - activeEvents.length);
  
  // Take only the number of events we need
  const eventsToAdd = additionalActiveEvents.slice(0, neededEvents);
  
  // Return the combined array
  return [...existingEvents, ...eventsToAdd];
};
