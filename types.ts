export type GradeScale = '4.0' | '5.0';

export interface GradeOption {
  label: string;
  value4: number;
  value5: number;
}

export interface Course {
  id: string;
  name: string;
  gradeLabel: string; // The selected label (e.g., 'A+')
  credits: number;
}

export interface GPACalculationResult {
  gpa: number;
  totalPoints: number;
  totalCredits: number;
  rating: string;
  colorClass: string;
}
