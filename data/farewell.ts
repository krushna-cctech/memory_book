import { Farewell } from "../types/farewell";

export const farewell: Farewell = {
  id: "demo",

  teammate: {
    id: "teammate-001",
    name: "Riyaelza Pappachen",
    role: "Senior Software Engineer",
    department: "Engineering",
    avatar: "/avatars/placeholder-avatar.png",
    joiningYear: 2022,
    leavingYear: 2026,
    shortIntro: "Four years of work, laughter, chaos and memories."
  },

  title: "A Memory Book",
  subtitle: "A few pages from our journey together.",
  accent: "purple",

  chapters: [
    {
      id: "beginning",
      number: 1,
      title: "How It All Began",
      shortTitle: "Beginning",
    },
    {
      id: "journey",
      number: 2,
      title: "The Journey",
      shortTitle: "Journey",
    },
    {
      id: "memories",
      number: 3,
      title: "The Memories",
      shortTitle: "Memories",
    },
    {
      id: "people",
      number: 4,
      title: "The People",
      shortTitle: "People",
    },
    {
      id: "inside-jokes",
      number: 5,
      title: "Things Only We Understand",
      shortTitle: "Inside Jokes",
    },
    {
      id: "goodbye",
      number: 6,
      title: "Until We Meet Again",
      shortTitle: "Goodbye",
    },
  ],

  beginning: {
    date: "August 15, 2022",
    story: "It was a sunny Tuesday when Riyaelza walked into our office. Armed with a mug of coffee and a notebook, she navigated the onboarding chaos with absolute grace. Within 48 hours, she had set up her local development environment, resolved a blocking git merge conflict that had baffled three senior developers, and made her very first commit. From that first commit, we knew she wasn't just joining our team—she was about to define how we build code.",
    image: "/avatars/placeholder-avatar.png",
    caption: "Riyaelza on Day One: Coffee in hand, ready to merge."
  },

  timeline: [
    {
      id: "m-1",
      date: "October 2022",
      title: "The Great Onboarding",
      description: "Successfully mastered our massive legacy codebase and rewrote the broken authentication flow on her third week.",
      icon: "Code"
    },
    {
      id: "m-2",
      date: "June 2023",
      title: "Promoted to Tech Lead",
      description: "Spearheaded the migrations to Next.js App Router and Tailwind, boosting app load performance by over 45%.",
      icon: "Zap"
    },
    {
      id: "m-3",
      date: "November 2024",
      title: "The Midnight Outage Hero",
      description: "Fixed a critical payment database deadlock at 3:15 AM while calmly singing karaoke in the Slack huddle.",
      icon: "Award"
    },
    {
      id: "m-4",
      date: "January 2026",
      title: "Mentorship Champion",
      description: "Successfully mentored four junior developers, creating a legacy of clean code, detailed pull requests, and git sanity.",
      icon: "Flame"
    }
  ],

  memories: [
    {
      id: "mem-1",
      title: "3:00 AM Firefighting",
      description: "When the server crashed on Black Friday, Riyaelza stayed on the call, typing code while eating cold pizza and sharing memes.",
      category: "Chaos",
      image: "/memories/Image (1).jpg"
    },
    {
      id: "mem-2",
      title: "The Tea-Break Debates",
      description: "Argued passionately for 45 minutes about whether tabs or spaces are superior. (Spoiler: she forced tabs onto the main repo).",
      category: "Debates"
    },
    {
      id: "mem-3",
      title: "UI Overhaul Wins",
      description: "Designed and built the new dark mode toggle in a single afternoon because 'the white background was burning my retinas'.",
      category: "Wins",
      video: "/memories/MicrosoftTeams-video.mp4"
    },
    {
      id: "mem-4",
      title: "Coffee Machine Takeover",
      description: "Configured a Slack bot to notify the engineering team whenever fresh espresso was brewed. Productivity surged by 200%.",
      category: "Daily Life",
      image: "/memories/Image (2).jpg"
    },
    {
      id: "mem-5",
      title: "Team Outing",
      description: "A wonderful day spent with the team sharing laughs and making memories.",
      category: "Team",
      image: "/memories/Image (3).jpg"
    },
    {
      id: "mem-6",
      title: "Office Fun",
      description: "Capturing the little moments of joy and focus in the workplace.",
      category: "Daily Life",
      image: "/memories/Image (4).jpg"
    },
    {
      id: "mem-7",
      title: "Collaborative Coding",
      description: "Working together to solve complex architectural challenges and design systems.",
      category: "Wins",
      image: "/memories/Image (5).jpg"
    },
    {
      id: "mem-8",
      title: "Group Photo",
      description: "The entire group gathered together to celebrate milestones and farewells.",
      category: "Team",
      image: "/memories/img.jpg"
    },
    {
      id: "mem-9",
      title: "Shared Moments",
      description: "Moments of laughter and support shared during project launches.",
      category: "Shared",
      image: "/memories/shared image.jpg"
    },
    {
      id: "mem-10",
      title: "Celebrating Milestones",
      description: "Marking another successful quarter and raising a toast to teamwork.",
      category: "Wins",
      image: "/memories/shared image (1).jpg"
    },
    {
      id: "mem-11",
      title: "Late Night Syncs",
      description: "Late-night standups and sync calls where we got everything lined up.",
      category: "Daily Life",
      image: "/memories/shared image (2).jpg"
    },
    {
      id: "mem-12",
      title: "Lunch Breaks",
      description: "Enjoying good food and conversations during our afternoon breaks.",
      category: "Daily Life",
      image: "/memories/shared image (3).jpg"
    },
    {
      id: "mem-13",
      title: "Final Farewell",
      description: "Saying goodbye to a stellar team member and wishing her the best.",
      category: "Farewell",
      image: "/memories/shared image (4).jpg"
    }
  ],

  messages: [
    {
      id: "msg-1",
      sender: "Sarah Jenkins",
      role: "Product Manager",
      message: "Riyaelza, you've been the absolute anchor of our team! Your ability to translate my vague feature requests into flawless technical structures was like magic. We'll miss your laughter, your brilliant solutions, and your absolute refusal to write bad code. Best of luck in your next chapter!",
      avatar: "SJ",
      color: "yellow"
    },
    {
      id: "msg-2",
      sender: "Dave K.",
      role: "Senior Dev",
      message: "Who is going to review my pull requests with 47 comments now?! Seriously, thank you for making me a better engineer. You pushed us to maintain high standards and made it fun every single day. The team won't be the same without you. Stay in touch!",
      avatar: "DK",
      color: "blue"
    },
    {
      id: "msg-3",
      sender: "Sam Chen",
      role: "Frontend Engineer",
      message: "Thank you for being such an inspiring mentor. Your patience during my first week, guiding me through git issues and CSS configurations, meant everything. I'll miss our daily syncs, tea chats, and debugging huddles. You're going to crush it!",
      avatar: "SC",
      color: "pink"
    },
    {
      id: "msg-4",
      sender: "Alex Rivers",
      role: "VP of Engineering",
      message: "A true leader leads by example. Riyaelza, your impact on our engineering culture and architectural standards is permanent. Thank you for four years of dedication, brilliance, and team spirit.",
      avatar: "AR",
      color: "green"
    }
  ],

  jokes: [
    {
      id: "j-1",
      joke: "git commit -m 'fixing Riyaelza's typo before she sees it'",
      context: "Found in a hidden project commit log from June 2023."
    },
    {
      id: "j-2",
      joke: "“It works fine in my console, maybe your browser is just vintage.”",
      context: "Riyaelza's favorite response to a bug report during staging tests."
    },
    {
      id: "j-3",
      joke: "The Great 'Tabs vs Spaces' Lockout",
      context: "When someone changed the prettier settings, she locked the main branch deployment for 6 hours until it was reverted."
    },
    {
      id: "j-4",
      joke: "“No, I am not writing a script for that. It only takes me 3 seconds to click it 400 times.”",
      context: "Overheard during an onboarding test sequence."
    }
  ],

  letter: {
    salutation: "Dearest Riyaelza,",
    paragraphs: [
      "It is hard to put into words how much you mean to this team. Over the last four years, you have been our go-to engineer, our problem solver, our mentor, and most importantly, our friend. You brought light, humor, and unparalleled focus to every project we tackled.",
      "Whether it was resolving midnight server crises, refactoring legacy pages, or simply sharing a laugh over coffee, you made work feel like a journey we were all lucky to share. You leave behind a codebase that is clean, an engineering culture that is strong, and a team that is deeply grateful.",
      "As you step into this next adventure, remember that you are the main character of this story. We know you will continue to build amazing things, solve impossible problems, and inspire everyone around you, just like you did here."
    ],
    valediction: "With love and gratitude, your teammates,",
    signatures: [
      "Pradnya",
      "Smitha",
      "Sagar",
      "Chetan",
      "Nikita",
      "Siddhu",
      "Shreya",
      "Ritik",
      "Subodh",
      "Abhay",
      "Pritee",
      "Priyanka",
      "Aniket",
      "Ritul",
      "Harish",
      "Lalit",
      "Ajay",
      "Ganesh",
      "Krushna"
    ]
  }
};
