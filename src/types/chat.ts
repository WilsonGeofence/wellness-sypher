
export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export type UserData = {
  id?: string;
  email?: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  primaryGoal: string;
  sleepGoal: number;
  activityGoal: number;
};
