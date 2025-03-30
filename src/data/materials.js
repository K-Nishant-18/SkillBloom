export const materials = [
  {
    id: 1,
    title: "Introduction to Calculus",
    category: "Mathematics",
    description: "Master fundamental calculus concepts with practical examples and real-world applications.",
    tags: ["calculus", "math", "derivatives", "integration"],
    instructor: {
      name: "Dr. Sarah Johnson",
      bio: "Professor of Mathematics with 15 years teaching experience",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    duration: "6 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.8,
    students: 1245,
    lastUpdated: "2023-05-15",
    lessons: [
      { 
        id: 1,
        title: "Limits and Continuity", 
        duration: "45 min", 
        videoUrl: "https://example.com/video1",
        description: "Understanding the fundamental concept of limits in calculus",
        preview: true
      },
      { 
        id: 2,
        title: "Derivatives", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video2",
        description: "Learn how to calculate derivatives and their rules"
      },
      { 
        id: 3,
        title: "Applications of Derivatives", 
        duration: "1.5 hours", 
        videoUrl: "https://example.com/video3",
        description: "Practical uses of derivatives in optimization problems"
      },
      { 
        id: 4,
        title: "Integration Basics", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video4",
        description: "Introduction to integral calculus and antiderivatives"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Calculus Cheat Sheet", 
        type: "PDF", 
        url: "#",
        size: "2.4 MB"
      },
      { 
        id: 2,
        title: "Practice Problems Set", 
        type: "Worksheet", 
        url: "#",
        size: "1.1 MB"
      },
      { 
        id: 3,
        title: "Lecture Slides", 
        type: "PPT", 
        url: "#",
        size: "5.7 MB"
      }
    ],
    relatedCourses: [
      {
        id: 2,
        title: "Advanced Calculus",
        instructor: "Dr. Michael Chen",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 3,
        title: "Linear Algebra",
        instructor: "Prof. Emily Wilson",
        duration: "5 weeks",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 2,
    title: "Organic Chemistry Fundamentals",
    category: "Chemistry",
    description: "Comprehensive study of carbon compounds and their reactions in biological systems.",
    tags: ["chemistry", "organic", "science", "lab"],
    instructor: {
      name: "Dr. Michael Chen",
      bio: "Organic chemistry researcher with publications in top journals",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    duration: "8 weeks",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.6,
    students: 876,
    lastUpdated: "2023-04-10",
    lessons: [
      { 
        id: 1,
        title: "Hydrocarbon Structures", 
        duration: "50 min", 
        videoUrl: "https://example.com/video5",
        description: "Understanding alkanes, alkenes, and alkynes",
        preview: true
      },
      { 
        id: 2,
        title: "Functional Groups", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video6",
        description: "Identification and properties of key functional groups"
      },
      { 
        id: 3,
        title: "Stereochemistry", 
        duration: "1.2 hours", 
        videoUrl: "https://example.com/video7",
        description: "Molecular spatial arrangements and chirality"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Functional Groups Chart", 
        type: "PDF", 
        url: "#",
        size: "3.2 MB"
      },
      { 
        id: 2,
        title: "Lab Safety Manual", 
        type: "PDF", 
        url: "#",
        size: "4.5 MB"
      }
    ],
    relatedCourses: [
      {
        id: 4,
        title: "Biochemistry Essentials",
        instructor: "Dr. Lisa Park",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 3,
    title: "Programming with Python",
    category: "Computer Science",
    description: "Learn programming fundamentals using Python with hands-on projects.",
    tags: ["programming", "python", "coding", "CS"],
    instructor: {
      name: "Prof. Alan Turing",
      bio: "Computer science pioneer with industry experience",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    duration: "5 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.9,
    students: 2150,
    lastUpdated: "2023-06-20",
    lessons: [
      { 
        id: 1,
        title: "Python Basics", 
        duration: "40 min", 
        videoUrl: "https://example.com/video8",
        description: "Variables, data types and basic operations",
        preview: true
      },
      { 
        id: 2,
        title: "Control Structures", 
        duration: "55 min", 
        videoUrl: "https://example.com/video9",
        description: "Conditionals and loops in Python"
      },
      { 
        id: 3,
        title: "Functions and Modules", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video10",
        description: "Creating reusable code with functions"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Python Syntax Cheat Sheet", 
        type: "PDF", 
        url: "#",
        size: "1.8 MB"
      },
      { 
        id: 2,
        title: "Coding Exercises", 
        type: "Worksheet", 
        url: "#",
        size: "2.1 MB"
      }
    ],
    relatedCourses: [
      {
        id: 5,
        title: "Data Structures in Python",
        instructor: "Prof. Grace Hopper",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 4,
    title: "Principles of Microeconomics",
    category: "Economics",
    description: "Understand individual and firm decision-making in market economies.",
    tags: ["economics", "micro", "business", "markets"],
    instructor: {
      name: "Prof. Lisa Park",
      bio: "Economist with policy advisory experience",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    duration: "7 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.5,
    students: 932,
    lastUpdated: "2023-03-15",
    lessons: [
      { 
        id: 1,
        title: "Supply and Demand", 
        duration: "50 min", 
        videoUrl: "https://example.com/video11",
        description: "Fundamental market forces",
        preview: true
      },
      { 
        id: 2,
        title: "Market Structures", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video12",
        description: "Perfect competition to monopoly"
      },
      { 
        id: 3,
        title: "Consumer Choice", 
        duration: "45 min", 
        videoUrl: "https://example.com/video13",
        description: "Utility maximization theory"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Key Terms Glossary", 
        type: "PDF", 
        url: "#",
        size: "1.5 MB"
      },
      { 
        id: 2,
        title: "Case Studies", 
        type: "PDF", 
        url: "#",
        size: "3.8 MB"
      }
    ],
    relatedCourses: [
      {
        id: 6,
        title: "Macroeconomics",
        instructor: "Prof. John Keynes",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 5,
    title: "20th Century World History",
    category: "History",
    description: "Explore major global events from 1900 to 2000 that shaped our modern world.",
    tags: ["history", "world", "modern", "politics"],
    instructor: {
      name: "Dr. James Wilson",
      bio: "Historian specializing in modern global affairs",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    duration: "10 weeks",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.7,
    students: 654,
    lastUpdated: "2023-02-28",
    lessons: [
      { 
        id: 1,
        title: "World Wars", 
        duration: "1.5 hours", 
        videoUrl: "https://example.com/video14",
        description: "Causes and consequences of both world wars",
        preview: true
      },
      { 
        id: 2,
        title: "Cold War Era", 
        duration: "1.2 hours", 
        videoUrl: "https://example.com/video15",
        description: "Geopolitical tensions post-WWII"
      },
      { 
        id: 3,
        title: "Decolonization", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video16",
        description: "End of colonial empires"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Timeline Infographic", 
        type: "PDF", 
        url: "#",
        size: "5.2 MB"
      },
      { 
        id: 2,
        title: "Primary Sources", 
        type: "PDF", 
        url: "#",
        size: "7.1 MB"
      }
    ],
    relatedCourses: [
      {
        id: 7,
        title: "Modern European History",
        instructor: "Dr. Emma Thompson",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 6,
    title: "Introduction to Psychology",
    category: "Psychology",
    description: "Explore the scientific study of behavior and mental processes.",
    tags: ["psychology", "mind", "behavior", "science"],
    instructor: {
      name: "Dr. Emily Watson",
      bio: "Clinical psychologist and researcher",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    duration: "6 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.8,
    students: 1432,
    lastUpdated: "2023-05-10",
    lessons: [
      { 
        id: 1,
        title: "History of Psychology", 
        duration: "45 min", 
        videoUrl: "https://example.com/video17",
        description: "Major schools of thought",
        preview: true
      },
      { 
        id: 2,
        title: "Cognitive Processes", 
        duration: "50 min", 
        videoUrl: "https://example.com/video18",
        description: "Memory, attention and problem solving"
      },
      { 
        id: 3,
        title: "Social Psychology", 
        duration: "55 min", 
        videoUrl: "https://example.com/video19",
        description: "How people influence each other"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Key Theories Summary", 
        type: "PDF", 
        url: "#",
        size: "2.9 MB"
      },
      { 
        id: 2,
        title: "Experiment Examples", 
        type: "PDF", 
        url: "#",
        size: "3.5 MB"
      }
    ],
    relatedCourses: [
      {
        id: 8,
        title: "Abnormal Psychology",
        instructor: "Dr. Carl Rogers",
        duration: "7 weeks",
        thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 7,
    title: "Cell Biology",
    category: "Biology",
    description: "Study the fundamental unit of life - the cell and its components.",
    tags: ["biology", "cells", "science", "microscopy"],
    instructor: {
      name: "Dr. Robert Brown",
      bio: "Cell biologist with research in molecular mechanisms",
      avatar: "https://randomuser.me/api/portraits/men/60.jpg"
    },
    duration: "8 weeks",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.6,
    students: 789,
    lastUpdated: "2023-04-05",
    lessons: [
      { 
        id: 1,
        title: "Cell Structure", 
        duration: "50 min", 
        videoUrl: "https://example.com/video20",
        description: "Organelles and their functions",
        preview: true
      },
      { 
        id: 2,
        title: "Cell Division", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video21",
        description: "Mitosis and meiosis processes"
      },
      { 
        id: 3,
        title: "Cellular Respiration", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video22",
        description: "ATP production in cells"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Cell Organelles Chart", 
        type: "PDF", 
        url: "#",
        size: "4.2 MB"
      },
      { 
        id: 2,
        title: "Microscopy Techniques", 
        type: "PDF", 
        url: "#",
        size: "3.7 MB"
      }
    ],
    relatedCourses: [
      {
        id: 9,
        title: "Genetics Fundamentals",
        instructor: "Dr. Rosalind Franklin",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1559383165-3e0aca327ff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 8,
    title: "Creative Writing Workshop",
    category: "Literature",
    description: "Develop your writing skills across fiction, poetry and creative non-fiction.",
    tags: ["writing", "creative", "literature", "arts"],
    instructor: {
      name: "Prof. Angela Carter",
      bio: "Published author and writing coach",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg"
    },
    duration: "6 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.9,
    students: 567,
    lastUpdated: "2023-03-22",
    lessons: [
      { 
        id: 1,
        title: "Character Development", 
        duration: "45 min", 
        videoUrl: "https://example.com/video23",
        description: "Creating believable characters",
        preview: true
      },
      { 
        id: 2,
        title: "Plot Structure", 
        duration: "50 min", 
        videoUrl: "https://example.com/video24",
        description: "Building narrative arcs"
      },
      { 
        id: 3,
        title: "Show vs Tell", 
        duration: "40 min", 
        videoUrl: "https://example.com/video25",
        description: "Effective descriptive techniques"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Writing Prompts", 
        type: "PDF", 
        url: "#",
        size: "1.2 MB"
      },
      { 
        id: 2,
        title: "Editing Checklist", 
        type: "PDF", 
        url: "#",
        size: "0.8 MB"
      }
    ],
    relatedCourses: [
      {
        id: 10,
        title: "Journalism Fundamentals",
        instructor: "Prof. Walter Cronkite",
        duration: "5 weeks",
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 9,
    title: "Financial Accounting",
    category: "Business",
    description: "Learn the language of business through fundamental accounting principles.",
    tags: ["accounting", "finance", "business", "commerce"],
    instructor: {
      name: "Prof. David Miller",
      bio: "CPA with 20 years corporate accounting experience",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg"
    },
    duration: "7 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.4,
    students: 1024,
    lastUpdated: "2023-01-18",
    lessons: [
      { 
        id: 1,
        title: "Accounting Equation", 
        duration: "40 min", 
        videoUrl: "https://example.com/video26",
        description: "Assets = Liabilities + Equity",
        preview: true
      },
      { 
        id: 2,
        title: "Financial Statements", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video27",
        description: "Balance sheets and income statements"
      },
      { 
        id: 3,
        title: "Debits and Credits", 
        duration: "50 min", 
        videoUrl: "https://example.com/video28",
        description: "Double-entry accounting system"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Accounting Terms Glossary", 
        type: "PDF", 
        url: "#",
        size: "2.1 MB"
      },
      { 
        id: 2,
        title: "Practice Problems", 
        type: "Worksheet", 
        url: "#",
        size: "1.8 MB"
      }
    ],
    relatedCourses: [
      {
        id: 11,
        title: "Managerial Accounting",
        instructor: "Prof. Susan Williams",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 10,
    title: "Physics: Mechanics",
    category: "Physics",
    description: "Study motion, forces, and energy in physical systems from Newton to Einstein.",
    tags: ["physics", "mechanics", "science", "engineering"],
    instructor: {
      name: "Dr. Neil Roberts",
      bio: "Theoretical physicist and educator",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    duration: "8 weeks",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.7,
    students: 876,
    lastUpdated: "2023-02-14",
    lessons: [
      { 
        id: 1,
        title: "Newton's Laws", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video29",
        description: "Classical mechanics fundamentals",
        preview: true
      },
      { 
        id: 2,
        title: "Work and Energy", 
        duration: "55 min", 
        videoUrl: "https://example.com/video30",
        description: "Conservation principles"
      },
      { 
        id: 3,
        title: "Rotational Motion", 
        duration: "1.2 hours", 
        videoUrl: "https://example.com/video31",
        description: "Torque and angular momentum"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Formula Sheet", 
        type: "PDF", 
        url: "#",
        size: "3.0 MB"
      },
      { 
        id: 2,
        title: "Lab Manual", 
        type: "PDF", 
        url: "#",
        size: "4.5 MB"
      }
    ],
    relatedCourses: [
      {
        id: 12,
        title: "Electromagnetism",
        instructor: "Dr. James Maxwell",
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 11,
    title: "Introduction to Sociology",
    category: "Social Sciences",
    description: "Examine human society, social relationships, and cultural phenomena scientifically.",
    tags: ["sociology", "culture", "society", "research"],
    instructor: {
      name: "Dr. Maria Garcia",
      bio: "Sociologist specializing in urban communities",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    duration: "5 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.5,
    students: 765,
    lastUpdated: "2023-04-30",
    lessons: [
      { 
        id: 1,
        title: "Social Institutions", 
        duration: "45 min", 
        videoUrl: "https://example.com/video32",
        description: "Family, education, religion and more",
        preview: true
      },
      { 
        id: 2,
        title: "Social Stratification", 
        duration: "50 min", 
        videoUrl: "https://example.com/video33",
        description: "Class, status and power in society"
      },
      { 
        id: 3,
        title: "Cultural Norms", 
        duration: "40 min", 
        videoUrl: "https://example.com/video34",
        description: "How societies establish behavioral standards"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Key Thinkers Summary", 
        type: "PDF", 
        url: "#",
        size: "2.3 MB"
      },
      { 
        id: 2,
        title: "Case Studies", 
        type: "PDF", 
        url: "#",
        size: "3.6 MB"
      }
    ],
    relatedCourses: [
      {
        id: 1,
        title: "Cultural Anthropology",
        instructor: "Dr. Margaret Mead",
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  },
  {
    id: 12,
    title: "Environmental Science",
    category: "Science",
    description: "Understand ecological systems, environmental issues, and sustainability solutions.",
    tags: ["environment", "ecology", "science", "sustainability"],
    instructor: {
      name: "Dr. Rachel Green",
      bio: "Environmental scientist and policy advisor",
      avatar: "https://randomuser.me/api/portraits/women/40.jpg"
    },
    duration: "6 weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.8,
    students: 987,
    lastUpdated: "2023-05-25",
    lessons: [
      { 
        id: 1,
        title: "Ecosystems", 
        duration: "50 min", 
        videoUrl: "https://example.com/video35",
        description: "Biotic and abiotic interactions",
        preview: true
      },
      { 
        id: 2,
        title: "Climate Change", 
        duration: "1 hour", 
        videoUrl: "https://example.com/video36",
        description: "Causes and impacts of global warming"
      },
      { 
        id: 3,
        title: "Sustainability", 
        duration: "55 min", 
        videoUrl: "https://example.com/video37",
        description: "Sustainable development practices"
      }
    ],
    resources: [
      { 
        id: 1,
        title: "Environmental Policies Guide", 
        type: "PDF", 
        url: "#",
        size: "4.0 MB"
      },
      { 
        id: 2,
        title: "Field Study Techniques", 
        type: "PDF", 
        url: "#",
        size: "3.2 MB"
      }
    ],
    relatedCourses: [
      {
        id: 2,
        title: "Conservation Biology",
        instructor: "Dr. Jane Goodall",
        duration: "7 weeks",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  }
];