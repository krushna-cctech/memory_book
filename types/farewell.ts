export interface Teammate {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatar: string;
  photo?: string;
  joiningYear?: number;
  leavingYear?: number;
  shortIntro: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
}

export interface BeginningData {
  date: string;
  story: string;
  image: string;
  caption: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string; // Key corresponding to a Lucide icon
}

export interface MemoryCard {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  category: string;
}

export interface TeammateMessage {
  id: string;
  sender: string;
  role: string;
  message?: string;
  image?: string;
  avatar: string;
  color?: "yellow" | "blue" | "pink" | "green" | "red" | "purple" | "orange" | string;
}

export interface InsideJoke {
  id: string;
  joke: string;
  context: string;
}

export interface GoodbyeLetterData {
  salutation: string;
  paragraphs: string[];
  valediction: string;
  signatures: string[];
  image?: string;
}

export interface Farewell {
  id: string;
  teammate: Teammate;
  title: string;
  subtitle: string;
  accent?: string;
  chapters: Chapter[];
  
  // Custom chapter data slots
  beginning?: BeginningData;
  timeline?: TimelineMilestone[];
  memories?: MemoryCard[];
  messages?: TeammateMessage[];
  jokes?: InsideJoke[];
  letter?: GoodbyeLetterData;
}
