
export type GoalType = "sleep" | "activity" | "diet" | "stress" | "other";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  type: GoalType;
  targetDate?: Date;
  completedSteps: number;
  totalSteps: number;
  isCompleted?: boolean;
}
