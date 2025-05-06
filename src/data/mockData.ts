
import { Event, Submission, Admin } from "../types";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Vibe Coding Hackthon 2025",
    description: "A 48-hour hackathon focused on building innovative web applications with modern technologies.",
    rules: "- Build a complete web application within 48 hours\n- Use any framework or library\n- Teams must have 1-4 members\n- All code must be original or properly attributed",
    prerequisites: "Basic knowledge of AI API , Genrative AI , AI Tools web development, Git, and a GitHub account  ",
    startDate: "2025-06-15T09:00:00Z",
    endDate: "2025-06-17T09:00:00Z",
    location: "Online",
    maxTeamSize: 4,
    createdAt: "2025-05-01T10:30:00Z",
    createdBy: "Dr Vineet Mishra",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prizes: [
      { place: "1st Place", description: "Cash Prize", value: "₹1000" },
      { place: "2nd Place", description: "Cash Prize", value: "₹500" },
      { place: "3rd Place", description: "Cash Prize", value: "₹250" }
    ],
    categories: ["Web Development", "Mobile", "AI/ML"]
  },
  {
    id: "2",
    title: "AI Assistant Hackathon",
    description: "Create an AI-powered assistant that solves a real-world problem using machine learning and natural language processing.",
    rules: "- Must use at least one AI/ML model\n- Provide a user-friendly interface\n- Teams of 1-4 members\n- Submit source code and a 3-minute demo video",
    prerequisites: "Familiarity with Python, JavaScript, and basic ML concepts.",
    startDate: "2025-07-10T09:00:00Z",
    endDate: "2025-07-12T18:00:00Z",
    location: "Online",
    maxTeamSize: 4,
    createdAt: "2025-05-15T14:20:00Z",
    createdBy: "Miss Manisha",
    status: "upcoming",
    imageUrl: "https://images.unsplash.com/photo-1692772819238-7c3fd60917cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prizes: [
      { place: "1st Place", description: "Cash Prize", value: "₹1500" },
      { place: "2nd Place", description: "Cash Prize", value: "₹750" }
    ], 
    categories: ["AI", "Machine Learning", "NLP"]
  },
  {
    id: "3",
    title: "Major Project Submission",
    description: "You Have to Submited Your Major Project and prapare a Detailed Presentation About Your Projec.",
    rules: "- Project Should Be Functional./n- PPT is Must/n- Code of Project should be clean and mannerd.",
    prerequisites: "- Development Skills./n- PPT/n- Understanding of Project",
    startDate: "2025-05-20T09:00:00Z",
    endDate: "2025-05-22T17:00:00Z",
    location: "Online",
    maxTeamSize: 3,
    createdAt: "2025-04-10T11:15:00Z",
    createdBy: "Mr Vineet Mishra",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1698919585695-546e4a31fc8f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prizes: [
      { place: "1st Place", description: "Cash Prize", value: "₹1000" }
    ],
    categories: ["Major Project", "UX/UI" , "Development"]
  },
  {
    id: "4",
    title: "Bug Hunting",
    description: "Design and develop a System Using Tailwing UI and Backend and other Team mates well hunt the bugs in the system",
    rules: "- Website must be native or hybrid mobile application\n- AI use is Banned\n- VS Code \n- Code must be well-documented",
    prerequisites: "VS Code  development frameworks (Node, React, Java).",
    startDate: "2025-06-20T09:00:00Z",
    endDate: "2025-06-22T17:00:00Z",
    location: "Online",
    maxTeamSize: 4,
    createdAt: "2025-04-10T11:15:00Z",
    createdBy: "Miss Manisha",
    status: "completed",
    imageUrl: "https://images.unsplash.com/photo-1596949469909-5217f8b68f23?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prizes: [
      { place: "1st Place", description: "Cash Prize", value: "₹1000" }
    ],
    categories: ["Mobile Development", "UX/UI"]
  },
  {
    id: "5",
    title: "AI Agent Development",
    description: "Design and develop a AI Agent that helps user to automate there task make her work smooth and save there time.",
    rules: "- Website must be native or hybrid mobile application\n- AI Models Has Allowed to use\n- VS Code \n- Code must be well-documented",
    prerequisites: "VS Code  development frameworks (Node, React, python).",
    startDate: "2025-06-20T09:00:00Z",
    endDate: "2025-06-22T17:00:00Z",
    location: "Online , At APGI Campus Artoni",
    maxTeamSize: 4,
    createdAt: "2025-04-10T11:15:00Z",
    createdBy: "Miss Himanshi",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prizes: [
      { place: "1st Place", description: "Cash Prize", value: "₹1000" }
    ],
    categories: ["AI Agent Development", "UX/UI" , "Python"]
  },
  {
    id: "6",
    title: "AI for Social Good Hackathon",
    description: "Leverage artificial intelligence to solve pressing social challenges. Participants will design projects focused on education, healthcare, environment, or accessibility. Innovation, real-world impact, and scalability will be key judging criteria.",
    rules: "- Website must be native or hybrid mobile application\n- AI Models Has Allowed to use\n- VS Code \n- Code must be well-documented",
    prerequisites: "VS Code  development frameworks (Node, React, python).",
    startDate: "2025-06-20T09:00:00Z",
    endDate: "2025-06-22T17:00:00Z",
    location: "Online",
    maxTeamSize: 4,
    createdAt: "2025-04-10T11:15:00Z",
    createdBy: "Miss Himanshi",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1636489886474-f633fec3e82b?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prizes: [
      { place: "1st Place", description: "Cash Prize", value: "₹1000" }
    ],
    categories: ["AI Agent Development", "UX/UI" , "Python"]
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: "101",
    eventId: "3",
    projectName: "VibeSpace",
    teamName: "ByteBuddies",
    members: [
      { name: "Abhishek Pundhir", role: "Backend Developer" },
      { name: "Dheeraj Varlani", role: "Frontend Developer" },
      { name: "Manas Khatri", role: "UI/UX Designer" },
    ],
    techStack: ["React", "TypeScript", "shadeCN.UI", "Tailwind"],
    repoUrl: "https://github.com/abhishekpundhir/vibespace/",
    liveUrl: "https://campusconnect-demo.netlify.app",
    description: " VibeSpace is a full-stack web application designed to streamline college hackathon participation. It allows students to join hackathons organized by faculty without requiring login, submit team-based projects with complete technical details, and enables admins to manage events, review submissions, and provide written feedback—all in one place.",
    imageUrl: "https://i.ibb.co/3ymqgqW2/Screenshot-2025-05-06-183842.png",
    submittedAt: "2025-05-21T15:42:10Z",
    status: "pending"
  },
  {
    id: "102",
    eventId: "3",
    projectName: "Gitbat",
    teamName: "CodeCrafters",
    members: [
      { name: "Devraj Chohan", role: "FrontEnd" },
      { name: "Arryan Bhatnagar", role: "Backend Engineer" },
      { name: "Kunal Uree", role: "UX Researcher" }
    ],
    techStack: ["Flutter", "Node.js", "MongoDB", "Dart"],
    repoUrl: "https://github.com/abhishekpundhir/voidcore",
    liveUrl: "https://devsapce.netlify.app/",
    description: "Made to Prvide a better version of Github",
    imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwVUl8ZW58MHx8MHx8fDA%3D",
    submittedAt: "2025-05-22T09:18:45Z",
    status: "pending"
  },
  {
    id: "103",
    eventId: "3",
    projectName: "Event Management Website",
    teamName: "codePrincess",
    members: [
      { name: "Vanshika Sharma", role: "FrontEnd" },
      { name: "Sakshi Gupta", role: "Backend Engineer" },
      { name: "Harsh Gaur", role: "UX Researcher" }
    ],
    techStack: ["HTML", "CSS", "PHP"],
    repoUrl: "https://github.com/abhishekpundhir/voidcore",
    liveUrl: "https://devsapce.netlify.app/",
    description: "This Website Made to Collect the Payment to Organise a Event ",
    imageUrl: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    submittedAt: "2025-05-22T09:18:45Z",
    status: "pending"
  },
  {
    id: "104",
    eventId: "3",
    projectName: "Bus Tracking System",
    teamName: "hackBurner",
    members: [
      { name: "Rahul Kushwah", role: "FrontEnd" },
      { name: "Mukul", role: "Backend Engineer" },
      { name: "Himanshi Arrora", role: "UX Researcher" }
    ],
    techStack: ["Java", "Kotlin"],
    repoUrl: "https://github.com/abhishekpundhir?tab=repositories",
    liveUrl: "https://devsapce.netlify.app/",
    description: "This App Track the buses to improve trip vibe.",
    imageUrl: "https://images.unsplash.com/photo-1579616043939-95d87a6e8512?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhY2tpbmd8ZW58MHx8MHx8fDA%3D",
    submittedAt: "2025-05-22T09:18:45Z",
    status: "pending"
  },
  {
    id: "105",
    eventId: "3",
    projectName: "Online Test Website",
    teamName: "debugchamp",
    members: [
      { name: "Monika Jaiswal", role: "FrontEnd" },
      { name: "Prachi Gupta", role: "Backend Engineer" },
      { name: "Princy Garg", role: "UX Researcher" }
    ],
    techStack: ["React Native", "SQL", "MongoDB", "Dart"],
    repoUrl: "https://github.com/abhishekpundhir?tab=repositories",
    liveUrl: "https://devsapce.netlify.app/",
    description: "This Website Made To Test student skills and learning and to improve there skills. ",
    imageUrl: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwdGVzdHxlbnwwfHwwfHx8MA%3D%3D",
    submittedAt: "2025-05-22T09:18:45Z",
    status: "pending"
  },
  {
    id: "106",
    eventId: "3",
    projectName: "Arogyam",
    teamName: "TechHunter",
    members: [
      { name: "Shivam Bhardwaj", role: "FrontEnd" },
      { name: "Rajat Mathur", role: "Backend Engineer" },
      { name: "Arun Rai", role: "UX Researcher" }
    ],
    techStack: ["HTML", "Javascript", "React", "NodeJS","MongoDB","Firebase"],
    repoUrl: "https://github.com/abhishekpundhir?tab=repositories",
    liveUrl: "https://devsapce.netlify.app/",
    description: "A plateform that give always track your track your health record and give guid and suggestion to make it more better.",
    imageUrl: "https://images.unsplash.com/photo-1739459365519-9d3978d884aa?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vZGVybiUyMGhlYWx0aCUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D",
    submittedAt: "2025-05-22T09:18:45Z",
    status: "pending"
  }
];

export const mockAdmins = [
  {
    id: "1",
    username: "artist",
    password: "artist@123",
    name: "Artist"
  },
  {
    id: "2",
    username: "vineet",
    password: "vineet@123",
    name: "Mr Vineet"
  },
  {
    id: "3",
    username: "jyoti",
    password: "jyoti@123",
    name: "Miss Jyoti"
  },
  {
    id: "4",
    username: "swati",
    password: "swati@123",
    name: "Miss Swati"
  },
  {
    id: "5",
    username: "himanshi",
    password: "himanshi@123",
    name: "Miss Himanshi"
  },
  {
    id: "6",
    username: "manisha",
    password: "manisha@123",
    name: "Miss Manisha"
  },
  {
    id: "7",
    username: "anchal",
    password: "anchal@123",
    name: "Miss Anchal"
  },
  {
    id: "8",
    username: "sunil",
    password: "sunil@123",
    name: "Artist"
  },
  {
    id: "9",
    username: "abhi",
    password: "abhi@123",
    name: "Abhishek"
  },
  {
    id: "10",
    username: "vanshi",
    password: "vanshi@123",
    name: "Vanshi Darling"
  },

];

